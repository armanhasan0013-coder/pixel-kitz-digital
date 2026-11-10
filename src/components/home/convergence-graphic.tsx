import type { CSSProperties } from "react";
import { BRAND, MARK_PATHS } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

/**
 * Signature graphic: the four arms of the logo mark converge on the red dot —
 * four disciplines (creative, web, growth, AI) meeting at one point of focus.
 * Pure SVG + CSS; no animation library, no canvas.
 */

const ARMS = [
  { label: "01 — Creative", dx: -1, dy: -1 },
  { label: "02 — Web & Tech", dx: 1, dy: -1 },
  { label: "03 — Growth", dx: 1, dy: 1 },
  { label: "04 — AI & Digital", dx: -1, dy: 1 },
];

export function ConvergenceGraphic({ className, active }: { className?: string; active?: number }) {
  return (
    <svg viewBox="-320 -320 640 640" aria-hidden className={cn("overflow-visible", className)}>
      {/* Guides */}
      <g fill="none" stroke="rgb(233 231 233 / 0.1)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <circle r="300" />
        <circle r="214" />
        <line x1="-320" y1="0" x2="320" y2="0" />
        <line x1="0" y1="-320" x2="0" y2="320" />
        <line x1="-226" y1="-226" x2="226" y2="226" strokeDasharray="2 6" />
        <line x1="226" y1="-226" x2="-226" y2="226" strokeDasharray="2 6" />
      </g>
      <g className="ring-spin">
        <circle r="258" fill="none" stroke="rgb(233 231 233 / 0.22)" strokeWidth="1" strokeDasharray="1 11" />
        <circle cx="0" cy="-258" r="3" fill={BRAND.red} />
      </g>

      {/* Quadrant labels */}
      <g style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, letterSpacing: "0.14em" }}>
        {ARMS.map((a, i) => (
          <text
            key={a.label}
            x={a.dx * 190}
            y={a.dy * 292 + (a.dy > 0 ? 4 : 0)}
            textAnchor="middle"
            fill={active === i ? "#F2665C" : "rgb(233 231 233 / 0.45)"}
            className="fade-in"
            style={{ "--d": `${900 + i * 120}ms`, transition: "fill .5s" } as CSSProperties}
          >
            {a.label.toUpperCase()}
          </text>
        ))}
      </g>

      {/* The mark, scaled and centered */}
      <g transform="scale(2.35) translate(-196.4 -151.58)">
        {MARK_PATHS.map((d, i) => (
          <g
            key={d}
            className="converge-arm"
            style={{ "--tx": `${ARMS[i].dx * 46}px`, "--ty": `${ARMS[i].dy * 46}px`, "--d": `${250 + i * 90}ms` } as CSSProperties}
          >
            <path d={d} fill={active === i ? "#F2665C" : BRAND.light} style={{ transition: "fill .5s" }} />
          </g>
        ))}
        <circle className="pulse-dot" cx="196.4" cy="151.58" r="8.91" fill={BRAND.red} />
      </g>
    </svg>
  );
}
