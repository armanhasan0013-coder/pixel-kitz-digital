import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { projects, type ProjectImage } from "@/content/projects";

type Tile = ProjectImage & { slug: string; title: string };

/** Pick a few images per project so rows stay varied, split by shape. */
function tiles(): { wide: Tile[]; square: Tile[] } {
  const wide: Tile[] = [];
  const square: Tile[] = [];
  for (const p of projects) {
    for (const g of p.gallery.slice(0, 4)) {
      const t = { ...g, slug: p.slug, title: p.title };
      (g.width / g.height > 1.4 ? wide : square).push(t);
    }
  }
  return { wide, square };
}

function Row({ items, height, reverse, duration }: { items: Tile[]; height: number; reverse?: boolean; duration: number }) {
  const loop = [...items, ...items];
  return (
    <div className="showcase-row group/row relative flex overflow-hidden">
      <ul
        className="showcase-track flex w-max shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
        style={{ "--dur": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        {loop.map((t, i) => {
          const dup = i >= items.length;
          const w = Math.round((t.width / t.height) * height);
          return (
            <li key={`${t.src}-${i}`} aria-hidden={dup || undefined} className="shrink-0" style={{ width: w }}>
              <Link
                href={`/work/${t.slug}`}
                tabIndex={dup ? -1 : undefined}
                className="showcase-tile group relative block overflow-hidden rounded-[18px] bg-surface ring-1 ring-line"
                style={{ height }}
              >
                <Image
                  src={t.src}
                  alt={dup ? "" : t.alt}
                  fill
                  sizes={`${w}px`}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {t.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Two infinite rows of real portfolio work moving in opposite directions. Pauses on hover; static under reduced motion. */
export function ShowcaseMarquee() {
  const { wide, square } = tiles();
  return (
    <div className="showcase relative -rotate-[1.5deg] space-y-4 py-6 sm:space-y-5" aria-label="Portfolio showcase">
      <Row items={wide} height={200} duration={70} />
      <Row items={square} height={240} duration={80} reverse />
      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-40" />
    </div>
  );
}
