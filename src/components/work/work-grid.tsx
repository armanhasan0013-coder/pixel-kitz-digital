"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/sections/shared";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function WorkGrid({ projects, categories }: { projects: Project[]; categories: readonly string[] }) {
  const [active, setActive] = useState("All");
  const used = categories.filter((c) => projects.some((p) => p.category === c));
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {["All", ...used].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm transition-colors",
              active === c ? "border-fg bg-fg text-ink" : "border-line-strong text-muted hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
