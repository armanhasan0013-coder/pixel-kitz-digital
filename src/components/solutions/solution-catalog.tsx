"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SolutionCard } from "@/components/solutions/solution-card";
import type { Solution, SolutionCategory } from "@/content/solutions";
import { cn } from "@/lib/utils";

export function SolutionCatalog({ solutions, categories }: { solutions: Solution[]; categories: SolutionCategory[] }) {
  const [category, setCategory] = useState<SolutionCategory | "All">("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return solutions.filter(
      (s) =>
        (category === "All" || s.category === category) &&
        (!q || `${s.title} ${s.description} ${s.category}`.toLowerCase().includes(q)),
    );
  }, [solutions, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors",
                category === c ? "border-fg bg-fg text-ink" : "border-line-strong text-muted hover:text-fg",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-80">
          <span className="sr-only">Search digital solutions</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions"
            className="h-10 w-full rounded-full border border-line-strong bg-transparent pr-4 pl-10 text-sm placeholder:text-subtle focus:border-fg focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} solutions shown
      </p>

      {shown.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[24px] border border-dashed border-line-strong px-6 py-20 text-center">
          <p className="display-sm">Nothing matches that search.</p>
          <p className="mt-3 text-muted">Try another term or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 h-11 rounded-full border border-line-strong px-5 text-sm"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
