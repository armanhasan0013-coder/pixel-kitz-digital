import type { CSSProperties } from "react";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Magnetic } from "@/components/ui/magnetic";
import { ConvergenceGraphic } from "@/components/home/convergence-graphic";
import { siteConfig } from "@/config/site";

const LINES = ["Creative Thinking.", "Digital Execution.", "Limitless Possibilities."];

export function Hero() {
  return (
    <section className="noise relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 lg:pt-32">
      <div aria-hidden className="bg-grid mask-fade absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute top-[18%] right-[-10%] -z-10 size-[55vmax] rounded-full bg-[radial-gradient(circle,rgb(217_69_62/0.16),transparent_62%)] blur-2xl"
      />

      {/* Graphic */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[24%] right-[-52%] -z-10 w-[110vw] max-w-none -translate-y-1/2 opacity-25 sm:top-[40%] sm:right-[-24%] sm:w-[80vw] sm:opacity-40lg:top-1/2 lg:right-[-16%] lg:w-[min(60vw,860px)] lg:opacity-60 xl:right-[-4%] xl:w-[min(54vw,860px)] xl:opacity-100"
      >
        <ConvergenceGraphic className="h-auto w-full" />
      </div>

      <Container className="flex flex-1 flex-col">
        <div className="fade-in flex items-center gap-3" style={{ "--d": "100ms" } as CSSProperties}>
          <span className="eyebrow text-muted">360° Creative · Technology · Digital Growth</span>
        </div>

        <h1 className="display-xl mt-8 max-w-[13ch] lg:mt-12">
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ "--d": `${150 + i * 110}ms` } as CSSProperties} className={i === 2 ? "text-muted" : undefined}>
                {i === 2 ? (
                  <>
                    Limitless Possibilities<span className="text-accent">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-auto grid gap-10 pt-14 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <p className="lede fade-in max-w-xl text-pretty lg:col-span-6" style={{ "--d": "600ms" } as CSSProperties}>
            From striking brand identities to powerful websites, performance-driven marketing, and smarter digital
            solutions — we help ambitious ideas become remarkable businesses.
          </p>
          <div className="fade-in flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" style={{ "--d": "750ms" } as CSSProperties}>
            <Magnetic>
              <ButtonLink href="/services" size="lg">
                Explore Our Services
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/contact" variant="ghost" size="lg">
                Start a Project
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex h-14 items-center justify-between text-muted">
          <p className="eyebrow">{siteConfig.brandLine.join("  /  ")}</p>
          <p className="eyebrow hidden sm:block">Based in Bangladesh · Available worldwide</p>
        </Container>
      </div>
    </section>
  );
}
