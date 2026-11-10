import { ShieldCheck } from "lucide-react";
import { Container, PageHero } from "@/components/ui/primitives";
import { SolutionCatalog } from "@/components/solutions/solution-catalog";
import { CtaSection } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { solutionCategories, solutions } from "@/content/solutions";

export const metadata = pageMetadata({
  title: "Digital Solutions",
  description:
    "AI tool onboarding, workflow automation, AI voiceover and productivity solutions — set up inside accounts you own. Request pricing for any listing.",
  path: "/solutions",
});

const PRINCIPLES = [
  "Accounts are always created and owned by you.",
  "We never ask for, store or share your passwords.",
  "Subscriptions are bought directly from official providers.",
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital Solutions"
        title="Smarter tools. Set up the right way."
        lede="Practical AI, automation and productivity services for individuals and teams. Browse the catalog, choose what fits, and request a quote — we'll confirm requirements before anything begins."
      >
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p} className="flex items-start gap-3 bg-ink p-5 text-sm">
              <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container>
          <SolutionCatalog solutions={solutions} categories={solutionCategories} />
          <div className="mt-16 rounded-[20px] border border-line p-6 text-sm leading-relaxed text-muted sm:p-8">
            <h2 className="eyebrow text-fg">Important</h2>
            <p className="mt-3">
              Pixel Kitz Digital is an independent agency. We are not affiliated with, endorsed by, or an authorized
              reseller for OpenAI, Anthropic, Adobe, Google, Microsoft or any other software provider unless a listing
              explicitly states otherwise. Product names are used only to describe the tools our services support.
              Pricing is confirmed in writing before any work or payment. See our{" "}
              <a href="/delivery-refund-policy" className="text-fg underline underline-offset-4">
                Delivery &amp; Refund Policy
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
      <CtaSection title="Need something not listed here?" />
    </>
  );
}
