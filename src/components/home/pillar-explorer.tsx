"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { ConvergenceGraphic } from "@/components/home/convergence-graphic";
import type { Pillar, Service } from "@/content/services";
import { cn } from "@/lib/utils";

type Props = { pillars: Pillar[]; servicesByPillar: Record<string, Service[]> };

export function PillarExplorer({ pillars, servicesByPillar }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pillar = pillars[active];
  const list = servicesByPillar[pillar.id];

  function onKeyDown(e: KeyboardEvent) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (active + keys[e.key] + pillars.length) % pillars.length;
      setActive(next);
      tabs.current[next]?.focus();
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div role="tablist" aria-label="Service pillars" aria-orientation="vertical" onKeyDown={onKeyDown} className="lg:col-span-6">
        {pillars.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`pillar-tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`pillar-panel-${p.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "group relative flex w-full items-baseline gap-5 border-t border-line py-6 text-left transition-colors duration-500 last:border-b sm:gap-8 sm:py-8",
                selected ? "text-fg" : "text-subtle hover:text-muted",
              )}
            >
              <span className={cn("eyebrow shrink-0 transition-colors", selected ? "text-accent-text" : "text-subtle")}>{p.index}</span>
              <span className="text-[clamp(1.6rem,3.6vw,3.1rem)] leading-[1.02] font-medium tracking-[-0.045em]">{p.title}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-[-1px] left-0 h-px bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)]",
                  selected ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-6">
        <div
          id={`pillar-panel-${pillar.id}`}
          role="tabpanel"
          aria-labelledby={`pillar-tab-${pillar.id}`}
          className="relative overflow-hidden rounded-[28px] border border-line bg-ink-2 p-7 sm:p-10"
        >
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-72 opacity-70 sm:w-80">
            <ConvergenceGraphic active={active} className="h-auto w-full" />
          </div>
          <div key={pillar.id} className="fade-in relative">
            <p className="eyebrow text-accent-text">{pillar.short}</p>
            <h3 className="display-sm mt-4 max-w-[16ch] text-balance">{pillar.headline}</h3>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">{pillar.summary}</p>
            <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
              {list.slice(0, 8).map((s) => (
                <li key={s.slug} className="border-t border-line">
                  <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-3 py-3 text-sm text-fg/85 hover:text-fg">
                    <span>{s.title}</span>
                    <ArrowUpRight aria-hidden className="size-3.5 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/services?pillar=${pillar.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-accent"
            >
              View all {list.length} {pillar.short.toLowerCase()} services <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
