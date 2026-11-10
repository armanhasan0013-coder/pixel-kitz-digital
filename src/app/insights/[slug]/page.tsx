import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, DraftNotice } from "@/components/ui/primitives";
import { CtaSection } from "@/components/sections/shared";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { getInsight, insights } from "@/content/insights";
import { absoluteUrl, siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    ...pageMetadata({ title: post.title, description: post.excerpt, path: `/insights/${slug}` }),
    // Sample articles are kept out of search results until approved.
    ...(post.status === "sample" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  // Params are read inside Suspense so navigations render instantly (Cache Components).
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: absoluteUrl(`/insights/${slug}`),
        }}
      />
      <article className="pt-32 pb-24 sm:pt-40">
        <Container className="max-w-[860px]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> All insights
          </Link>
          {post.status === "sample" && (
            <div className="mt-8">
              <DraftNotice>Sample article — pending review and approval before publication.</DraftNotice>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-subtle">
            <span className="eyebrow text-accent-text">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="display-md mt-6 text-balance">{post.title}</h1>
          <p className="lede mt-6">{post.excerpt}</p>
          <div className="prose-pk mt-12 border-t border-line pt-4">
            {post.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "list")
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </Container>
      </article>
      <CtaSection title="Have a project in mind?" />
    </>
  );
}
