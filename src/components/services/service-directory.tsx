"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Pillar, PillarId, Service } from "@/content/services";
import { cn } from "@/lib/utils";

type Props = { pillars: Pillar[]; services: Service[] };

export function ServiceDirectory({ pillars, services }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const param = params.get("pillar");
  const active: PillarId | "all" = pillars.some((p) => p.id === param) ? (param as PillarId) : "all";
  const [query, setQuery] = useState("");

  function select(id: PillarId | "all") {
    const sp = new URLSearchParams(params.toString());
    if (id === "all") sp.delete("pillar");
    else sp.set("pillar", id);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const q = query.trim().toLowerCase();
  const visiblePillars = useMemo(
    () =>
      pillars
        .filter((p) => active === "all" || p.id === active)
        .map((p) => ({
          pillar: p,
          items: services.filter(
            (s) => s.pillar === p.id && (!q || `${s.title} ${s.summary}`.toLowerCase().includes(q)),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [pillars, services, active, q],
  );
  const total = visiblePillars.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-5 border-b border-line bg-ink/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:top-20 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {[{ id: "all" as const, short: "All services" }, ...pillars].map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={active === p.id}
                onClick={() => select(p.id)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors duration-300",
                  active === p.id ? "border-fg bg-fg text-ink" : "border-line-strong text-muted hover:border-fg/60 hover:text-fg",
                )}
              >
                {p.short}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-80">
            <span className="sr-only">Search services</span>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services"
              className="h-10 w-full rounded-full border border-line-strong bg-transparent pr-4 pl-10 text-sm placeholder:text-subtle focus:border-fg focus:outline-none"
            />
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {total} services shown
      </p>

      {visiblePillars.length === 0 && (
        <div className="py-24 text-center">
          <p className="display-sm">No services match &ldquo;{query}&rdquo;.</p>
          <p className="mt-3 text-muted">Try a different term, or tell us what you need — we&apos;ll point you in the right direction.</p>
          <div className="mt-8 flex justify-center gap-3">
            <button type="button" onClick={() => setQuery("")} className="h-11 rounded-full border border-line-strong px-5 text-sm">
              Clear search
            </button>
            <Link href="/contact" className="inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-ink">
              Ask us directly
            </Link>
          </div>
        </div>
      )}

      {visiblePillars.map(({ pillar, items }) => (
        <section key={pillar.id} aria-labelledby={`h-${pillar.id}`} className="border-b border-line py-16 last:border-b-0 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-44">
                <p className="eyebrow text-accent-text">{pillar.index}</p>
                <h2 id={`h-${pillar.id}`} className="display-sm mt-3 max-w-[14ch]">
                  {pillar.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{pillar.summary}</p>
              </div>
            </div>
            <ul className="grid gap-px self-start overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
              {items.map((s) => (
                <li key={s.slug} className="bg-ink">
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-ink-2 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-medium tracking-[-0.02em]">{s.title}</h3>
                      <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-subtle transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
