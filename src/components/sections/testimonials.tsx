import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";
import { testimonials, type Testimonial } from "@/content/testimonials";

function attribution(t: Testimonial) {
  return [t.role, t.company, t.location].filter(Boolean).join(", ");
}

function TestimonialCard({ testimonial: t, index, featured }: { testimonial: Testimonial; index: number; featured: boolean }) {
  const project = t.projectSlug ? projects.find((p) => p.slug === t.projectSlug) : undefined;
  const by = attribution(t);
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
      className={cn("flex bg-ink", featured && "md:col-span-2")}
    >
      <figure className="flex flex-1 flex-col p-8 sm:p-10">
        <span aria-hidden className="text-6xl leading-none font-medium text-accent-text">
          &ldquo;
        </span>
        <blockquote
          className={cn(
            "mt-2 text-pretty tracking-[-0.02em]",
            featured ? "text-2xl leading-snug sm:text-3xl" : "text-lg leading-relaxed",
          )}
        >
          <p>{t.quote}</p>
        </blockquote>
        <figcaption className="mt-auto pt-10">
          <p className="font-medium">{t.name}</p>
          {by && <p className="mt-1 text-sm text-muted">{by}</p>}
          {(t.service || project || t.sourceUrl) && (
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {t.service && <span className="eyebrow text-subtle">{t.service}</span>}
              {project && (
                <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-1 text-muted hover:text-fg">
                  View the project <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              )}
              {t.sourceUrl && (
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-fg"
                >
                  Original review <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </figcaption>
      </figure>
    </li>
  );
}

/** Client testimonials from src/content/testimonials.ts. Renders nothing while that list is empty. */
export function TestimonialsSection({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          eyebrow="Client testimonials"
          title={<span id="testimonials-heading">In our clients&apos; words.</span>}
          lede="Reviews left by clients for our founder's design work, quoted exactly as they wrote them."
        />
        <ul
          className={cn(
            "mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line",
            items.length > 1 && "md:grid-cols-2",
          )}
        >
          {items.map((t, i) => (
            <TestimonialCard
              key={`${t.name}-${i}`}
              testimonial={t}
              index={i}
              // With an odd count on the two-column layout, the first quote spans the row so no cell is left empty.
              featured={i === 0 && items.length % 2 === 1 && items.length > 1}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
