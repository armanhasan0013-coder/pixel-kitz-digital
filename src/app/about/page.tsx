import type { CSSProperties } from "react";
import { Container, Eyebrow, PageHero } from "@/components/ui/primitives";
import { CtaSection, FounderSection } from "@/components/sections/shared";
import { ConvergenceGraphic } from "@/components/home/convergence-graphic";
import { pageMetadata } from "@/lib/seo";
import { pillars } from "@/content/services";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Pixel Kitz Digital brings creative design, web technology, performance marketing and practical AI solutions together under one brand. Meet the agency and its founder.",
  path: "/about",
});

const VALUES = [
  { title: "Clarity over noise", text: "Simple, well-made work communicates faster than decoration. We remove before we add." },
  { title: "Honesty in every quote", text: "We say what's included, what isn't, and what we don't do. No inflated promises." },
  { title: "Craft in the details", text: "Spacing, file naming, load times, handover notes — the small things are where quality shows." },
  { title: "Your ownership", text: "Your accounts, files and data stay yours. We document what we build so you're never locked in." },
  { title: "Keep learning", text: "Tools change quickly. We test new ones carefully and adopt only what genuinely helps clients." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the agency"
        title="Ideas, design and digital growth — connected."
        lede="Pixel Kitz Digital helps entrepreneurs, creators, startups and established businesses build, launch, market and grow their digital presence, with creative, technology and marketing skills under one roof."
      />

      <section className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow>Vision</Eyebrow>
            <p className="display-sm mt-5 text-pretty">
              To be the partner ambitious businesses in Bangladesh and beyond trust to turn ideas into brands, products
              and growth.
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <Eyebrow>Mission</Eyebrow>
            <p className="display-sm mt-5 text-pretty">
              To make high-quality design, technology and marketing accessible — delivered with clear scope, honest
              advice and real craft.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-2 py-24 sm:py-32" aria-labelledby="philosophy-h">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>Creative philosophy</Eyebrow>
            <h2 id="philosophy-h" className="display-md mt-5 text-balance">
              Four arms. One point of focus.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted">
              <p>
                Our mark is four arms converging on a single red point. It describes how we work: creative, technology,
                growth and AI come from different directions, but every project points them at one thing — the
                outcome that matters to your business.
              </p>
              <p>
                That&apos;s why we start with questions, not mood boards. Who is this for? What should they do next?
                What will make it worth the investment? Good answers make good design inevitable.
              </p>
            </div>
          </div>
          <div aria-hidden className="mx-auto w-full max-w-[520px] lg:col-span-6">
            <ConvergenceGraphic className="h-auto w-full" />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="approach-h">
        <Container>
          <Eyebrow>Multidisciplinary approach</Eyebrow>
          <h2 id="approach-h" className="display-md mt-5 max-w-[20ch] text-balance">
            One brief. Four disciplines working together.
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p.id} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties} className="bg-ink p-7 sm:min-h-[280px]">
                <span className="eyebrow text-accent-text">{p.index}</span>
                <h3 className="mt-10 text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.headline}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FounderSection />

      <section className="py-24 sm:py-32" aria-labelledby="values-h">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Core values</Eyebrow>
            <h2 id="values-h" className="display-md mt-5">
              How we work.
            </h2>
            <p className="mt-5 text-muted">{siteConfig.tagline}</p>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-8">
            {VALUES.map((v, i) => (
              <li key={v.title} data-reveal className="grid gap-3 py-7 sm:grid-cols-12 sm:gap-6">
                <span className="eyebrow text-subtle sm:col-span-1">0{i + 1}</span>
                <h3 className="text-xl font-medium tracking-[-0.02em] sm:col-span-4">{v.title}</h3>
                <p className="leading-relaxed text-muted sm:col-span-7">{v.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
