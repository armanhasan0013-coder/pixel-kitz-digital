"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/primitives";
import type { Solution } from "@/content/solutions";
import { cn } from "@/lib/utils";

/** Option picker + request actions. Builds a prefilled inquiry link — nothing is submitted here. */
export function RequestPanel({ solution, whatsappNumber }: { solution: Solution; whatsappNumber: string | null }) {
  const [choice, setChoice] = useState<string | null>(solution.options?.choices[0] ?? null);
  const disabled = solution.availability === "coming-soon";

  const reference = choice ? `${solution.title} — ${choice}` : solution.title;
  const contactHref = `/contact?solution=${solution.slug}${choice ? `&option=${encodeURIComponent(choice)}` : ""}`;
  const wa = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hello Pixel Kitz Digital, I'd like to request: ${reference}.`,
      )}`
    : null;

  return (
    <div className="rounded-[24px] border border-line bg-ink-2 p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow text-subtle">Price</span>
        <span className="text-2xl font-medium tracking-[-0.03em]">{solution.price ?? "Request pricing"}</span>
      </div>

      {solution.options && (
        <fieldset className="mt-8">
          <legend className="eyebrow text-subtle">{solution.options.label}</legend>
          <div className="mt-3 grid gap-2">
            {solution.options.choices.map((c) => (
              <label
                key={c}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors",
                  choice === c ? "border-fg bg-fg/5" : "border-line-strong hover:border-fg/50",
                )}
              >
                <span>{c}</span>
                <input
                  type="radio"
                  name="option"
                  value={c}
                  checked={choice === c}
                  onChange={() => setChoice(c)}
                  className="size-4 accent-[var(--color-accent)]"
                />
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 grid gap-3">
        {disabled ? (
          <p className="rounded-xl border border-line-strong px-4 py-3 text-center text-sm text-muted">Not yet available</p>
        ) : (
          <>
            <ButtonLink href={contactHref} size="lg" variant="accent" className="w-full">
              {solution.availability === "consultation" ? "Book a consultation" : "Request a quote"}
            </ButtonLink>
            {wa && (
              <ButtonLink href={wa} size="lg" variant="ghost" className="w-full">
                Inquire on WhatsApp
              </ButtonLink>
            )}
          </>
        )}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-subtle">
        Submitting a request does not create an order or payment. We&apos;ll confirm requirements, scope and price in
        writing first.
      </p>
    </div>
  );
}
