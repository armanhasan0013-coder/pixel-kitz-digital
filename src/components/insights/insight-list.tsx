"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/content/insights";
import { cn, formatDate } from "@/lib/utils";

export function InsightList({ insights, categories }: { insights: Insight[]; categories: readonly string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? insights : insights.filter((i) => i.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors",
              active === c ? "border-fg bg-fg text-ink" : "border-line-strong text-muted hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-dashed border-line-strong px-6 py-20 text-center">
          <p className="display-sm">No {active} articles yet.</p>
          <p className="mt-3 text-muted">New articles are on the way. Check back soon.</p>
        </div>
      ) : (
        <ul className="mt-10 border-t border-line">
          {shown.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link href={`/insights/${post.slug}`} className="group grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-10">
                <div className="flex flex-wrap items-center gap-3 sm:col-span-3 sm:flex-col sm:items-start sm:gap-2">
                  <span className="eyebrow text-accent-text">{post.category}</span>
                  <time dateTime={post.date} className="text-sm text-subtle">
                    {formatDate(post.date)}
                  </time>
                  {post.status === "sample" && (
                    <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] text-muted">Sample article</span>
                  )}
                </div>
                <div className="sm:col-span-8">
                  <h2 className="text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight font-medium tracking-[-0.035em] text-balance transition-colors group-hover:text-fg/80">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{post.excerpt}</p>
                </div>
                <ArrowUpRight aria-hidden className="hidden size-6 justify-self-end text-subtle transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-text sm:col-span-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
