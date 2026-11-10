import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { Magnetic } from "@/components/ui/magnetic";
import { LogoMark } from "@/components/brand/logo";
import { siteConfig, whatsappLink } from "@/config/site";
import type { Project } from "@/content/projects";

/* ---------------- Portfolio ---------------- */

const DISCIPLINES = ["Brand identity", "Social media creatives", "Advertising design", "YouTube thumbnails", "E-commerce listing visuals"];

export function PortfolioEmptyState() {
  return (
    <a
      href={siteConfig.founder.links.behance}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      className="group relative block overflow-hidden rounded-[28px] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-line-strong sm:p-12"
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent-text">Portfolio — being curated</p>
          <p className="display-sm mt-5 max-w-[22ch] text-balance">
            Selected case studies are being prepared for this site.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-muted">
            In the meantime, the founder&apos;s design work — including branding, campaign and e-commerce visuals — is
            available on Behance.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {DISCIPLINES.map((d) => (
              <li key={d} className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-muted">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-6 lg:col-span-5 lg:flex-col lg:items-end">
          <span className="text-[clamp(3rem,7vw,6.5rem)] leading-none font-medium tracking-[-0.06em] text-fg/90 transition-colors group-hover:text-fg">
            Behance
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-fg text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
            <ArrowUpRight aria-hidden className="size-6" />
          </span>
        </div>
      </div>
      <span className="sr-only"> (opens Behance in a new tab)</span>
    </a>
  );
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
      className="group block"
    >
      <div className="project-media relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface ring-1 ring-line transition-shadow duration-700 group-hover:shadow-[0_24px_60px_-20px_rgb(217_69_62/0.55)]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-medium tracking-[-0.02em]">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.summary}</p>
        </div>
        <span className="eyebrow shrink-0 text-subtle">{project.category}</span>
      </div>
    </Link>
  );
}

/* ---------------- Founder ---------------- */

export function FounderSection({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const { founder } = siteConfig;
  const H = headingLevel;
  return (
    <section className="bg-paper text-paper-ink" aria-labelledby="founder-heading">
      <Container className="py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            {founder.portrait && (
              // Brand-red glow behind the portrait
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[44px] bg-[radial-gradient(60%_55%_at_50%_45%,rgb(217_69_62/0.45),transparent_75%)] blur-2xl"
              />
            )}
            <div
              className={
                founder.portrait
                  ? "relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink ring-1 ring-accent/40 shadow-[0_0_48px_-6px_rgb(217_69_62/0.55),0_30px_60px_-30px_rgb(16_16_20/0.6)]"
                  : "relative aspect-[4/5] overflow-hidden rounded-[28px] bg-paper-2"
              }
            >
              {founder.portrait ? (
                <Image src={founder.portrait} alt={`Portrait of ${founder.name}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgb(22_22_27/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(22_22_27/0.07)_1px,transparent_1px)] [background-size:48px_48px]"
                  />
                  {/* Placeholder until a real portrait is set in siteConfig.founder.portrait */}
                  <LogoMark className="relative w-2/5 text-paper-ink" />
                  <p className="eyebrow absolute bottom-6 left-6 text-paper-muted">{founder.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:col-span-7">
            <div data-reveal>
              <Eyebrow tone="paper">Founder</Eyebrow>
            </div>
            <H id="founder-heading" data-reveal className="display-md mt-5 text-balance">
              Design-led from day one.
            </H>
            <div data-reveal className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-paper-muted">
              <p>
                <strong className="font-medium text-paper-ink">{founder.name}</strong> is a multidisciplinary graphic
                designer with around five years of experience in branding, visual communication, social media
                creatives, advertising design, YouTube thumbnails and e-commerce listing visuals.
              </p>
              <p>
                Working across Adobe Photoshop, Adobe Illustrator and AI-assisted creative workflows, he founded Pixel
                Kitz Digital to bring design, web technology and marketing together under one brand — so clients work
                with one team that understands how every piece connects.
              </p>
            </div>
            <div data-reveal className="mt-auto pt-10">
              <p className="text-sm text-paper-muted">
                {founder.name} — {founder.role}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {Object.entries(founder.links).map(([k, href]) => (
                  <li key={k}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-paper-ink/20 px-4 text-sm capitalize transition-colors hover:bg-paper-ink hover:text-paper"
                    >
                      {k === "linkedin" ? "LinkedIn" : k} <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

export function CtaSection({ title = "Let's Build Something Extraordinary." }: { title?: string }) {
  const wa = whatsappLink("Hello Pixel Kitz Digital, I'd like to discuss a project.");
  const email = siteConfig.contact.email;
  return (
    <section className="noise relative overflow-hidden border-t border-line" aria-labelledby="cta-heading">
      <div aria-hidden className="bg-grid mask-fade absolute inset-0" />
      <div
        aria-hidden
        className="absolute bottom-[-40%] left-1/2 size-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(217_69_62/0.18),transparent_60%)]"
      />
      <Container className="relative py-28 text-center sm:py-40">
        <div data-reveal className="flex justify-center">
          <Eyebrow>Start a project</Eyebrow>
        </div>
        <h2 id="cta-heading" data-reveal className="display-lg mx-auto mt-6 max-w-[14ch] text-balance">
          {title}
        </h2>
        <p data-reveal className="lede mx-auto mt-6 max-w-xl">
          Tell us what you&apos;re building. We&apos;ll reply with clear next steps, an honest view of scope, and how we
          can help.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <ButtonLink href="/contact" size="lg" variant="accent">
              Start a Project
            </ButtonLink>
          </Magnetic>
          {wa && (
            <ButtonLink href={wa} size="lg" variant="ghost">
              Chat on WhatsApp
            </ButtonLink>
          )}
          {!wa && email && (
            <ButtonLink href={`mailto:${email}`} size="lg" variant="ghost">
              {email}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}

export { SectionHeading };
