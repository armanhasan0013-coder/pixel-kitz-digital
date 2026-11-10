import { Suspense } from "react";
import { Container, PageHero } from "@/components/ui/primitives";
import { ServiceDirectory } from "@/components/services/service-directory";
import { CtaSection } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { pillars, services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Brand identity, design, websites, e-commerce, Meta advertising, social media and AI tool onboarding — explore every Pixel Kitz Digital service.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${services.length} services · 4 disciplines`}
        title="Everything you need to build, launch and grow."
        lede="Choose a discipline or search for a specific service. Every project starts with a conversation to confirm scope, timeline and budget."
      />
      <Container>
        <Suspense fallback={<ServiceDirectoryFallback />}>
          <ServiceDirectory pillars={pillars} services={services} />
        </Suspense>
      </Container>
      <CtaSection title="Not sure which service you need?" />
    </>
  );
}

function ServiceDirectoryFallback() {
  return (
    <div className="py-16">
      {pillars.map((p) => (
        <section key={p.id} className="border-b border-line py-10">
          <h2 className="display-sm">{p.title}</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.pillar === p.id)
              .map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className="text-muted hover:text-fg">
                    {s.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
