import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getPillar, type PillarId } from "@/content/services";
import type { Inquiry } from "@/lib/inquiry-schema";

/**
 * Server-only inquiry delivery. Secrets are read from non-public env vars and
 * never reach the browser. An inquiry counts as received only when at least one
 * configured channel confirms delivery.
 */

type Result = { channel: string; ok: boolean; error?: string };

export type DeliveryOutcome =
  | { status: "delivered"; channels: string[] }
  | { status: "not_configured" }
  | { status: "failed"; results: Result[] };

function format(inquiry: Inquiry, id: string) {
  const lines = [
    `Reference: ${id}`,
    `Name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Phone/WhatsApp: ${inquiry.phone ?? "—"}`,
    `Company: ${inquiry.company ?? "—"}`,
    `Category: ${getPillar(inquiry.category as PillarId).title}`,
    `Service: ${inquiry.service ?? "—"}`,
    `Inquiring about: ${inquiry.reference ?? "—"}`,
    `Budget: ${inquiry.budget}`,
    `Timeline: ${inquiry.timeline}`,
    "",
    "Project description:",
    inquiry.message,
  ];
  return lines.join("\n");
}

async function viaResend(inquiry: Inquiry, id: string): Promise<Result | null> {
  // Trim: values pasted into a dashboard often carry stray spaces or line breaks.
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  if (!key || !to || !from) return null;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: inquiry.email,
        subject: `New project inquiry — ${inquiry.fullName} (${id})`,
        text: format(inquiry, id),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return { channel: "email", ok: true };
    // Resend's error body explains the cause (e.g. invalid key, unverified sender); it never contains the key.
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    // Shape hint only (never the key itself): Resend keys start with "re_".
    const hint = res.status === 400 || res.status === 401 ? ` [key starts with re_: ${key.startsWith("re_")}, length ${key.length}]` : "";
    return { channel: "email", ok: false, error: `HTTP ${res.status} ${detail}${hint}`.trim() };
  } catch (e) {
    return { channel: "email", ok: false, error: (e as Error).message };
  }
}

async function viaWebhook(inquiry: Inquiry, id: string): Promise<Result | null> {
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.INQUIRY_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...inquiry, text: format(inquiry, id) }),
      signal: AbortSignal.timeout(10_000),
    });
    return { channel: "webhook", ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { channel: "webhook", ok: false, error: (e as Error).message };
  }
}

/** Local JSONL storage for development and self-hosted servers. Not suitable for serverless platforms. */
async function viaFile(inquiry: Inquiry, id: string): Promise<Result | null> {
  if (process.env.INQUIRY_STORE !== "file") return null;
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "inquiries.jsonl"),
      JSON.stringify({ id, receivedAt: new Date().toISOString(), ...inquiry }) + "\n",
      "utf8",
    );
    return { channel: "file", ok: true };
  } catch (e) {
    return { channel: "file", ok: false, error: (e as Error).message };
  }
}

export async function deliverInquiry(inquiry: Inquiry, id: string): Promise<DeliveryOutcome> {
  const results = (await Promise.all([viaResend(inquiry, id), viaWebhook(inquiry, id), viaFile(inquiry, id)])).filter(
    (r): r is Result => r !== null,
  );
  if (results.length === 0) return { status: "not_configured" };
  const ok = results.filter((r) => r.ok).map((r) => r.channel);
  return ok.length > 0 ? { status: "delivered", channels: ok } : { status: "failed", results };
}
