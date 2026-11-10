import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Info, Truck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { AvailabilityBadge, SolutionCard } from "@/components/solutions/solution-card";
import { RequestPanel } from "@/components/solutions/request-panel";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getSolution, solutions } from "@/content/solutions";
import { getService } from "@/content/services";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.description, path: `/solutions/${slug}` });
}

export default function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  // Params are read inside Suspense so navigations render instantly (Cache Components).
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = solutions.filter((s) => s.category === solution.category && s.slug !== slug).slice(0, 3);
  const service = solution.relatedService ? getService(solution.relatedService) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Digital Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${slug}` },
        ])}
      />
      <section className="relative border-b border-line pt-32 pb-20 sm:pt-40">
        <div aria-hidden className="bg-grid mask-fade absolute inset-0" />
        <Container className="relative">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> Digital Solutions
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-4">
                <span className="eyebrow text-accent-text">{solution.category}</span>
                <AvailabilityBadge value={solution.availability} />
              </div>
              <h1 className="display-lg mt-6 text-balance">{solution.title}</h1>
              <p className="lede mt-6 max-w-2xl">{solution.description}</p>

              <div className="mt-14 grid gap-10 sm:grid-cols-2">
                <div>
                  <Eyebrow>
                    <span className="inline-flex items-center gap-2">
                      <Truck aria-hidden className="size-3.5" /> Delivery
                    </span>
                  </Eyebrow>
                  <p className="mt-4 leading-relaxed text-muted">{solution.fulfillment}</p>
                </div>
                <div>
                  <Eyebrow>Requirements</Eyebrow>
                  <ul className="mt-4 space-y-3">
                    {solution.requirements.map((r) => (
                      <li key={r} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex gap-4 rounded-[20px] border border-line p-6">
                <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-text" />
                <div>
                  <h2 className="text-sm font-medium">Terms & eligibility</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{solution.terms}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    See the{" "}
                    <Link href="/delivery-refund-policy" className="text-fg underline underline-offset-4">
                      Delivery &amp; Refund Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {service && (
                <p className="mt-8 text-sm text-muted">
                  Related service:{" "}
                  <Link href={`/services/${service.slug}`} className="text-fg underline underline-offset-4">
                    {service.title}
                  </Link>
                </p>
              )}
            </div>
            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Request this solution">
              <div className="lg:sticky lg:top-28">
                <RequestPanel solution={solution} whatsappNumber={siteConfig.contact.whatsapp} />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="more-h">
          <Container>
            <h2 id="more-h" className="display-sm">
              More in {solution.category}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((s, i) => (
                <SolutionCard key={s.slug} solution={s} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
