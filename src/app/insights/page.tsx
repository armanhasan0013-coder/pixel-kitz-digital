import { Container, PageHero } from "@/components/ui/primitives";
import { InsightList } from "@/components/insights/insight-list";
import { pageMetadata } from "@/lib/seo";
import { insightCategories, insights } from "@/content/insights";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical notes on design, marketing, AI tools, web development and business growth from Pixel Kitz Digital.",
  path: "/insights",
});

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the studio."
        lede="Practical thinking on design, marketing, AI tools, web development and business growth — written to be useful, not to fill a content calendar."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <InsightList insights={sorted} categories={insightCategories} />
        </Container>
      </section>
    </>
  );
}
