import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { CtaSection } from "@/components/sections/shared";
import { ConvergenceGraphic } from "@/components/home/convergence-graphic";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getPillar, getService, pillars, relatedServices, services } from "@/content/services";
import { absoluteUrl, siteConfig, whatsappLink } from "@/config/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${slug}` });
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  // Params are read inside Suspense so navigations render instantly (Cache Components).
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pillar = getPillar(service.pillar);
  const pillarIndex = pillars.findIndex((p) => p.id === pillar.id);
  const related = relatedServices(service);
  const wa = whatsappLink(`Hello Pixel Kitz Digital, I'm interested in: ${service.title}.`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: pillar.title,
          url: absoluteUrl(`/services/${slug}`),
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          areaServed: "Worldwide",
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div aria-hidden className="bg-grid mask-fade absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 right-[-12%] hidden w-[42vw] max-w-[640px] -translate-y-1/2 opacity-60 lg:block">
          <ConvergenceGraphic active={pillarIndex} className="h-auto w-full" />
        </div>
        <Container className="relative">
          <Link href={`/services?pillar=${pillar.id}`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> {pillar.title}
          </Link>
          <h1 className="display-lg mt-8 max-w-[16ch] text-balance">{service.title}</h1>
          <p className="lede mt-6 max-w-2xl text-pretty">{service.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
              Start a project inquiry
            </ButtonLink>
            {wa && (
              <ButtonLink href={wa} variant="ghost" size="lg">
                Ask on WhatsApp
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <p className="display-sm mt-5 text-pretty">{service.audience}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Key deliverables</Eyebrow>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-4 py-4">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-subtle">
              Final deliverables, timeline and pricing are confirmed in writing after an initial consultation.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-2 py-20 sm:py-28" aria-labelledby="process-h">
        <Container>
          <Eyebrow>Typical process</Eyebrow>
          <h2 id="process-h" className="display-md mt-5 max-w-[18ch]">
            How a {pillar.short.toLowerCase()} project runs.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pillar.process.map((step, i) => (
              <li key={step.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties} className="bg-ink-2 p-7 sm:min-h-[240px]">
                <span className="eyebrow text-accent-text">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="related-h">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-h" className="display-sm">
                Related services
              </h2>
              <Link href={`/services?pillar=${pillar.id}`} className="hidden text-sm text-muted hover:text-fg sm:inline">
                All {pillar.short.toLowerCase()} services
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col rounded-[24px] border border-line p-7 transition-colors duration-500 hover:border-line-strong hover:bg-ink-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-medium tracking-[-0.02em]">{r.title}</h3>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-subtle group-hover:text-accent-text" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{r.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaSection title={`Let's talk about your ${service.title.toLowerCase()} project.`} />
    </>
  );
}
