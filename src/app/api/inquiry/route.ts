import { NextResponse, type NextRequest } from "next/server";
import { antiSpamSchema, fieldErrors, inquirySchema } from "@/lib/inquiry-schema";
import { deliverInquiry } from "@/lib/inquiry-delivery";

/**
 * POST /api/inquiry
 * 200 { ok: true, reference }           — delivered to at least one channel
 * 400 { ok: false, errors }             — validation failed
 * 429 { ok: false, code: "rate_limited" }
 * 503 { ok: false, code: "not_configured" } — no delivery channel set up yet
 * 502 { ok: false, code: "delivery_failed" }
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance limiter. Use a shared store (e.g. Upstash, Supabase) for multi-instance production.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 415 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Spam checks: honeypot must be empty and the form must have been open for at least 3 seconds.
  const spam = antiSpamSchema.safeParse(body);
  if (!spam.success || Date.now() - spam.data.startedAt < 3000) {
    // Respond like a validation failure without revealing the reason.
    return NextResponse.json({ ok: false, code: "rejected" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "invalid", errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const reference = `PK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const outcome = await deliverInquiry(parsed.data, reference);

  if (outcome.status === "delivered") {
    return NextResponse.json({ ok: true, reference });
  }
  if (outcome.status === "not_configured") {
    console.warn("[inquiry] No delivery channel configured — inquiry was NOT saved.");
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }
  console.error("[inquiry] All delivery channels failed", outcome.results);
  return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
}
