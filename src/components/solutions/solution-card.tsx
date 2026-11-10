import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { availabilityLabel, type Solution } from "@/content/solutions";
import { cn } from "@/lib/utils";

export function AvailabilityBadge({ value }: { value: Solution["availability"] }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted">
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          value === "available" && "bg-emerald-400",
          value === "consultation" && "bg-amber-300",
          value === "coming-soon" && "bg-subtle",
        )}
      />
      {availabilityLabel[value]}
    </span>
  );
}

export function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
      className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[24px] border border-line bg-ink p-7 transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-subtle">{solution.category}</span>
        <AvailabilityBadge value={solution.availability} />
      </div>
      <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-balance">{solution.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{solution.description}</p>
      <div className="mt-auto flex items-end justify-between pt-8">
        <span className="text-sm font-medium">{solution.price ?? "Request pricing"}</span>
        <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>
    </Link>
  );
}
