"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, X } from "lucide-react";
import { fieldErrors, inquirySchema } from "@/lib/inquiry-schema";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };
type ServiceOption = { slug: string; title: string; pillar: string };

type Props = {
  categories: Option[];
  services: ServiceOption[];
  solutions: { slug: string; title: string }[];
  budgets: readonly string[];
  timelines: readonly string[];
  fallback: { email: string | null; whatsapp: string | null; linkedin: string };
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string }
  | { kind: "error"; code: string };

const ERROR_COPY: Record<string, string> = {
  not_configured:
    "Our online inquiry system isn't connected yet, so your message was not sent. Please contact us directly using the options below — your details are still in the form.",
  delivery_failed: "We couldn't deliver your inquiry just now. Please try again in a moment, or contact us directly.",
  rate_limited: "Too many submissions from this connection. Please wait a few minutes and try again.",
  network: "We couldn't reach the server. Check your connection and try again.",
  invalid: "Please review the highlighted fields.",
  rejected: "Your submission couldn't be accepted. Please wait a moment and try again.",
};

export function InquiryForm({ categories, services, solutions, budgets, timelines, fallback }: Props) {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from ?service=slug or ?solution=slug&option=...
  const prefService = services.find((s) => s.slug === params.get("service"));
  const prefSolution = solutions.find((s) => s.slug === params.get("solution"));
  const prefOption = params.get("option")?.slice(0, 60);

  const [category, setCategory] = useState(prefService?.pillar ?? (prefSolution ? "ai" : ""));
  const [service, setService] = useState(prefService?.title ?? "");
  const [reference, setReference] = useState(
    prefSolution ? `Digital Solution: ${prefSolution.title}${prefOption ? ` — ${prefOption}` : ""}` : "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [startedAt] = useState(() => Date.now());

  const serviceOptions = services.filter((s) => s.pillar === category);

  function collect() {
    const fd = new FormData(formRef.current!);
    const str = (k: string) => String(fd.get(k) ?? "");
    return {
      fullName: str("fullName"),
      email: str("email"),
      phone: str("phone"),
      company: str("company"),
      category,
      service: service === "__unsure" ? "Not sure yet" : service,
      budget: str("budget"),
      timeline: str("timeline"),
      message: str("message"),
      reference: reference || undefined,
      consent: fd.get("consent") === "on",
      website: str("website"),
      startedAt,
    };
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    const data = collect();
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus({ kind: "error", code: "invalid" });
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; code?: string; errors?: Record<string, string> };
      if (res.ok && json.ok && json.reference) {
        setStatus({ kind: "success", reference: json.reference });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus({ kind: "error", code: json.code ?? "delivery_failed" });
    } catch {
      setStatus({ kind: "error", code: "network" });
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-[28px] border border-line bg-ink-2 p-8 sm:p-12">
        <CheckCircle2 aria-hidden className="size-10 text-emerald-400" />
        <h2 className="display-sm mt-6">Thank you — your inquiry has been received.</h2>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">
          Your reference is <strong className="font-mono text-fg">{status.reference}</strong>. We&apos;ll review your
          project details and reply by email with next steps.
        </p>
        <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm text-fg underline underline-offset-4">
          Continue exploring services <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[28px] border border-line bg-ink-2 p-6 sm:p-10" aria-describedby="form-note">
      {status.kind === "error" && (
        <div role="alert" className="mb-8 flex gap-3 rounded-2xl border border-accent/50 bg-accent/10 p-4 text-sm leading-relaxed">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
          <div>
            <p>{ERROR_COPY[status.code] ?? ERROR_COPY.delivery_failed}</p>
            {status.code !== "invalid" && (
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {!fallback.email && !fallback.whatsapp && (
                  <a className="underline underline-offset-4" href={fallback.linkedin} target="_blank" rel="noopener noreferrer">
                    Message us on LinkedIn
                  </a>
                )}
                {fallback.email && (
                  <a className="underline underline-offset-4" href={`mailto:${fallback.email}`}>
                    Email {fallback.email}
                  </a>
                )}
                {fallback.whatsapp && (
                  <a className="underline underline-offset-4" href={fallback.whatsapp} target="_blank" rel="noopener noreferrer">
                    Message on WhatsApp
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <fieldset disabled={submitting} className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Project inquiry</legend>

        <Field label="Full name" name="fullName" error={errors.fullName} required>
          <input id="fullName" name="fullName" autoComplete="name" className={input(errors.fullName)} {...aria("fullName", errors)} />
        </Field>
        <Field label="Email" name="email" error={errors.email} required>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={input(errors.email)} {...aria("email", errors)} />
        </Field>
        <Field label="Phone or WhatsApp" name="phone" error={errors.phone} hint="Optional">
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+880" className={input(errors.phone)} {...aria("phone", errors)} />
        </Field>
        <Field label="Company name" name="company" error={errors.company} hint="Optional">
          <input id="company" name="company" autoComplete="organization" className={input(errors.company)} {...aria("company", errors)} />
        </Field>

        <Field label="Service category" name="category" error={errors.category} required>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setService("");
            }}
            className={input(errors.category)}
            {...aria("category", errors)}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Specific service" name="service" error={errors.service} hint="Optional">
          <select
            id="service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={!category}
            className={input(errors.service)}
            {...aria("service", errors)}
          >
            <option value="">{category ? "Choose a service" : "Choose a category first"}</option>
            {serviceOptions.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            {category && <option value="__unsure">Not sure yet</option>}
          </select>
        </Field>

        {reference && (
          <div className="sm:col-span-2">
            <p className="flex items-center justify-between gap-3 rounded-xl border border-line-strong px-4 py-3 text-sm">
              <span>
                <span className="text-subtle">Inquiring about: </span>
                {reference}
              </span>
              <button type="button" onClick={() => setReference("")} aria-label="Remove reference" className="rounded-full p-1 text-muted hover:text-fg">
                <X aria-hidden className="size-4" />
              </button>
            </p>
          </div>
        )}

        <Field label="Estimated budget" name="budget" error={errors.budget} required>
          <select id="budget" name="budget" defaultValue="" className={input(errors.budget)} {...aria("budget", errors)}>
            <option value="" disabled>
              Choose a range
            </option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Expected timeline" name="timeline" error={errors.timeline} required>
          <select id="timeline" name="timeline" defaultValue="" className={input(errors.timeline)} {...aria("timeline", errors)}>
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Project description" name="message" error={errors.message} required hint="What are you building, who is it for, and what does success look like?">
            <textarea id="message" name="message" rows={6} maxLength={4000} className={cn(input(errors.message), "h-auto resize-y py-3")} {...aria("message", errors)} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree that Pixel Kitz Digital may use these details to respond to my inquiry, as described in the{" "}
              <Link href="/privacy" className="text-fg underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-2 text-sm text-accent-text">
              {errors.consent}
            </p>
          )}
        </div>
      </fieldset>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs text-subtle">
          Fields marked * are required. We never share your details.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-sheen inline-flex h-14 items-center justify-center gap-2 rounded-full bg-fg px-8 font-medium text-ink transition-colors duration-500 [--btn-hover:var(--color-accent-strong)] hover:text-white disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send inquiry <ArrowUpRight aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function input(error?: string) {
  return cn(
    "h-12 w-full rounded-xl border bg-ink px-4 text-[0.95rem] text-fg transition-colors placeholder:text-subtle focus:outline-none disabled:opacity-60",
    error ? "border-accent-text" : "border-line-strong hover:border-fg/40 focus:border-fg",
  );
}

function aria(name: string, errors: Record<string, string>) {
  return { "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-error` : `${name}-hint` };
}

function Field({ label, name, error, hint, required, children }: { label: string; name: string; error?: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3 text-sm">
        <span>
          {label}
          {required && <span className="text-accent-text"> *</span>}
        </span>
        {hint && hint.length < 12 && <span id={`${name}-hint`} className="text-xs text-subtle">{hint}</span>}
      </label>
      {hint && hint.length >= 12 && (
        <p id={`${name}-hint`} className="-mt-1 mb-2 text-xs text-subtle">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}
