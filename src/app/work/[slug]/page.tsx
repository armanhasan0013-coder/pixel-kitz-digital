import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { CtaSection } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata({ title: project.title, description: project.summary, path: `/work/${slug}` });
}

export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  // Params are read inside Suspense so navigations render instantly (Cache Components).
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="pt-32 sm:pt-40">
        <Container>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> All work
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="display-lg lg:col-span-8">{project.title}</h1>
            <dl className="grid grid-cols-2 gap-6 text-sm lg:col-span-4">
              {project.client && (
                <div>
                  <dt className="eyebrow text-subtle">Client</dt>
                  <dd className="mt-2">{project.client}</dd>
                </div>
              )}
              <div>
                <dt className="eyebrow text-subtle">Category</dt>
                <dd className="mt-2">{project.category}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="eyebrow text-subtle">Year</dt>
                  <dd className="mt-2">{project.year}</dd>
                </div>
              )}
            </dl>
          </div>
          <p className="lede mt-6 max-w-2xl">{project.summary}</p>
          {/* The first gallery image is the full-resolution hero; the cover is a cropped thumbnail. */}
          {project.gallery[0] && (
            <div className="relative mt-12 overflow-hidden rounded-[28px] bg-surface ring-1 ring-line shadow-[0_40px_100px_-40px_rgb(217_69_62/0.45)]">
              <Image
                src={project.gallery[0].src}
                alt={project.gallery[0].alt}
                width={project.gallery[0].width}
                height={project.gallery[0].height}
                priority
                sizes="(min-width:1280px) 1200px, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-3">
          {project.challenge && (
            <div>
              <Eyebrow>Challenge</Eyebrow>
              <p className="mt-5 leading-relaxed text-muted">{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <Eyebrow>Solution</Eyebrow>
              <p className="mt-5 leading-relaxed text-muted">{project.solution}</p>
            </div>
          )}
          <div>
            <Eyebrow>Deliverables</Eyebrow>
            <ul className="mt-5 space-y-2">
              {project.deliverables.map((d) => (
                <li key={d} className="border-b border-line pb-2">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          {project.tools && project.tools.length > 0 && (
            <div>
              <Eyebrow>Tools</Eyebrow>
              <ul className="mt-5 space-y-2">
                {project.tools.map((t) => (
                  <li key={t} className="border-b border-line pb-2">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {project.gallery.length > 1 && (
        <section className="pb-20 sm:pb-28" aria-label="Project gallery">
          {/* Masonry columns keep every design at its true proportions */}
          <Container className="columns-1 gap-6 md:columns-2">
            {project.gallery.slice(1).map((img) => (
              <div
                key={img.src}
                data-reveal
                className="group mb-6 break-inside-avoid overflow-hidden rounded-[24px] bg-surface ring-1 ring-line transition-shadow duration-700 hover:shadow-[0_24px_60px_-20px_rgb(217_69_62/0.5)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </Container>
        </section>
      )}

      {project.externalUrl && (
        <Container className="pb-20">
          <ButtonLink href={project.externalUrl} variant="ghost">
            View full project on Behance
          </ButtonLink>
        </Container>
      )}

      <CtaSection />
    </>
  );
}
