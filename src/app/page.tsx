import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { PillarExplorer } from "@/components/home/pillar-explorer";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { CtaSection, FounderSection, PortfolioEmptyState, ProjectCard } from "@/components/sections/shared";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { SolutionCard } from "@/components/solutions/solution-card";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { pillars, services } from "@/content/services";
import { projects } from "@/content/projects";
import { ShowcaseMarquee } from "@/components/work/showcase-marquee";
import { solutions } from "@/content/solutions";

const REASONS = [
  {
    title: "One team, connected thinking",
    text: "Brand, website, campaigns and tools are planned together, so your visuals, messaging and technology support the same goal.",
  },
  {
    title: "Design-led, not decoration-led",
    text: "Every layout, color and headline has a job. We design for clarity and conversion first, then for impact.",
  },
  {
    title: "Honest scope and pricing",
    text: "We confirm scope, deliverables and cost before work starts. No vague packages, no surprise invoices.",
  },
  {
    title: "Practical technology",
    text: "We recommend tools you can actually run — set up in accounts you own, with handover so you're never locked in.",
  },
];

const PROCESS = [
  { title: "Discover", text: "Understand your business, audience and what success should look like." },
  { title: "Strategize", text: "Define the approach, scope, priorities and timeline in writing." },
  { title: "Create", text: "Design, build and write — with structured reviews at each milestone." },
  { title: "Launch", text: "Test thoroughly, prepare final files and go live with confidence." },
  { title: "Grow", text: "Measure what's working and keep improving after launch." },
];

export default function HomePage() {
  const byPillar = Object.fromEntries(pillars.map((p) => [p.id, services.filter((s) => s.pillar === p.id)]));
  const featuredSolutions = solutions.filter((s) => s.availability !== "coming-soon").slice(0, 3);
  const marquee = services.filter((_, i) => i % 3 === 0).map((s) => s.title);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />

      {/* Marquee */}
      <div aria-hidden className="overflow-hidden border-b border-line py-6">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-2xl tracking-[-0.03em] text-fg/35 sm:text-3xl">
              {t}
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* Services overview */}
      <section className="py-24 sm:py-32" aria-labelledby="services-heading">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title={<span id="services-heading">Four disciplines. One point of focus.</span>}
              lede="Creative, technology, growth and AI — the four arms of our mark, and of our work. Each is strong on its own; together they move a business forward."
            />
            <div data-reveal className="shrink-0">
              <ButtonLink href="/services" variant="ghost">
                All {services.length} services
              </ButtonLink>
            </div>
          </div>
          <div className="mt-16">
            <PillarExplorer pillars={pillars} servicesByPillar={byPillar} />
          </div>
        </Container>
      </section>

      {/* Featured work */}
      <section className="border-t border-line py-24 sm:py-32" aria-labelledby="work-heading">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Featured work" title={<span id="work-heading">Work that earns attention.</span>} />
            {projects.length > 0 && (
              <div data-reveal>
                <ButtonLink href="/work" variant="ghost">
                  View all work
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
        {projects.length > 0 && (
          <div className="mt-14 overflow-hidden">
            <ShowcaseMarquee />
          </div>
        )}
        <Container>
          <div className="mt-16">
            {projects.length > 0 ? (
              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                {projects.slice(0, 4).map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </div>
            ) : (
              <PortfolioEmptyState />
            )}
          </div>
        </Container>
      </section>

      {/* Why */}
      <section className="border-t border-line py-24 sm:py-32" aria-labelledby="why-heading">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Why Pixel Kitz Digital"
                title={<span id="why-heading">Creativity and technology, under one roof.</span>}
                lede="Most businesses juggle a designer, a developer and a marketer who never speak to each other. We bring those skills together, so nothing gets lost between them."
              />
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {REASONS.map((r, i) => (
              <li
                key={r.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="flex flex-col bg-ink p-8 sm:min-h-[300px] sm:p-10"
              >
                <span className="eyebrow text-accent-text">0{i + 1}</span>
                <h3 className="mt-auto pt-12 text-2xl font-medium tracking-[-0.03em]">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-line py-24 sm:py-32" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title={<span id="process-heading">A clear process, start to finish.</span>}
            lede="Every project follows the same five stages, adapted to its size. You always know what's happening, what's next, and what we need from you."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:min-h-[320px]"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-subtle">Step 0{i + 1}</span>
                  {i < PROCESS.length - 1 && <span aria-hidden className="hidden text-subtle md:block">→</span>}
                </div>
                <h3 className="mt-10 text-3xl font-medium tracking-[-0.04em] md:mt-24">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Client testimonials — hidden until src/content/testimonials.ts has entries */}
      <TestimonialsSection limit={4} />

      {/* Digital solutions */}
      <section className="border-t border-line bg-ink-2 py-24 sm:py-32" aria-labelledby="solutions-heading">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Digital Solutions"
              title={<span id="solutions-heading">AI and productivity, set up properly.</span>}
              lede="Onboarding, automation and AI-assisted production — delivered inside accounts you own, never through shared logins."
            />
            <div data-reveal className="shrink-0">
              <ButtonLink href="/solutions" variant="ghost">
                Browse digital solutions
              </ButtonLink>
            </div>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {featuredSolutions.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} />
            ))}
          </div>
          <p data-reveal className="mt-8 max-w-3xl text-xs leading-relaxed text-subtle">
            Pixel Kitz Digital is an independent agency and is not affiliated with, endorsed by, or a reseller for
            OpenAI, Anthropic, Adobe or other software providers unless explicitly stated. Product names are used only
            to describe the tools our services support.
          </p>
        </Container>
      </section>

      <FounderSection />

      {/* Insights teaser */}
      <section className="py-20" aria-label="Insights">
        <Container>
          <Link
            href="/insights"
            data-reveal
            className="group flex flex-col justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center"
          >
            <span className="display-sm">Notes on design, marketing and AI tools.</span>
            <span className="inline-flex items-center gap-2 text-sm text-muted group-hover:text-fg">
              Read Insights <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </Link>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
