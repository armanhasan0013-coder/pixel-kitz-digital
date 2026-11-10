import { ContactLine, Entity, LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms of Service", description: "Terms governing use of the Pixel Kitz Digital website and services.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern your use of this website and the general basis on which we provide services. Individual projects are also governed by a written proposal or agreement."
    >
      <h2>1. About these terms</h2>
      <p>
        &ldquo;We&rdquo;, &ldquo;us&rdquo; and &ldquo;Pixel Kitz Digital&rdquo; refer to <Entity />. By using this
        website you agree to these terms.
      </p>

      <h2>2. Website information</h2>
      <p>
        Service descriptions on this website describe the types of work we offer. They are not binding offers. Scope,
        deliverables, timeline and price for any project are confirmed in a written proposal before work begins.
      </p>

      <h2>3. Inquiries and proposals</h2>
      <p>
        Submitting an inquiry or quote request does not create a contract or an obligation to pay. A project starts
        only when both parties accept a written proposal and any agreed advance payment is received.
      </p>

      <h2>4. Payments</h2>
      <p>[Describe accepted payment methods, advance payment percentage, invoicing and late-payment terms.]</p>

      <h2>5. Revisions and approvals</h2>
      <p>The number of revision rounds is stated in each proposal. Additional changes outside the agreed scope may be quoted separately.</p>

      <h2>6. Intellectual property</h2>
      <p>
        On full payment, ownership of final approved deliverables transfers to the client unless the proposal states
        otherwise. Third-party assets (fonts, stock images, software, AI tools) remain subject to their own licenses.
        We may show completed work in our portfolio unless you ask us not to in writing.
      </p>

      <h2>7. Third-party tools and providers</h2>
      <p>
        We are an independent agency and are not affiliated with or endorsed by third-party software providers unless
        explicitly stated. Your use of third-party tools is governed by those providers&apos; terms. We do not sell,
        share or transfer third-party account credentials.
      </p>

      <h2>8. No guaranteed results</h2>
      <p>
        We work to agreed objectives, but we do not guarantee specific outcomes such as sales, rankings, return on ad
        spend or follower growth, which depend on factors outside our control.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>[To be completed with legal advice.]</p>

      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of Bangladesh. [Confirm jurisdiction with legal advice.]</p>

      <h2>11. Contact</h2>
      <p>
        <ContactLine />
      </p>
    </LegalPage>
  );
}
