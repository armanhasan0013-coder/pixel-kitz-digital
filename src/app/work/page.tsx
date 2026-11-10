import { Container, PageHero } from "@/components/ui/primitives";
import { CtaSection, PortfolioEmptyState } from "@/components/sections/shared";
import { WorkGrid } from "@/components/work/work-grid";
import { pageMetadata } from "@/lib/seo";
import { projectCategories, projects } from "@/content/projects";

export const metadata = pageMetadata({
  title: "Our Work",
  description: "Selected branding, social media, advertising, YouTube and e-commerce design projects by Pixel Kitz Digital.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Ideas, made visible."
        lede="A curated selection of identity, campaign, content and e-commerce work. Each project shows the challenge, the thinking and what was delivered."
      />
      <section className="py-16 sm:py-24">
        <Container>
          {projects.length > 0 ? <WorkGrid projects={projects} categories={projectCategories} /> : <PortfolioEmptyState />}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
