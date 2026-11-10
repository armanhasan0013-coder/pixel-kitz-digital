import { ContactLine, LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Delivery & Refund Policy",
  description: "How Pixel Kitz Digital delivers digital services and solutions, and how refunds are handled.",
  path: "/delivery-refund-policy",
});

export default function DeliveryRefundPage() {
  return (
    <LegalPage
      title="Delivery & Refund Policy"
      intro="This policy covers digital services and Digital Solutions listings, including setup sessions, AI-assisted production, automation and design deliverables."
    >
      <h2>How delivery works</h2>
      <ul>
        <li>Design and production work is delivered digitally — via email, a shared download link or a shared folder — in the formats agreed in your proposal.</li>
        <li>Setup, onboarding and training services are delivered through live remote sessions, inside accounts that you own, followed by written notes where stated.</li>
        <li>Delivery timelines start after we receive the agreed advance payment and all required materials from you.</li>
      </ul>

      <h2>What we never deliver</h2>
      <p>
        We do not sell, share, create on your behalf or deliver login credentials for third-party accounts or
        subscriptions. Software subscriptions are purchased by you directly from the official provider unless a
        listing explicitly states an authorized arrangement.
      </p>

      <h2>Online payments</h2>
      <p>
        Online checkout is not yet active on this website. Payment instructions are provided with each approved
        proposal or invoice. [Update this section when a payment gateway is integrated.]
      </p>

      <h2>Cancellations</h2>
      <p>[Describe cancellation terms — e.g. before work starts, after work starts, for scheduled sessions.]</p>

      <h2>Refunds</h2>
      <ul>
        <li>If we cannot start an agreed project, any advance payment for that project is refunded in full.</li>
        <li>For work in progress, refunds are assessed based on work completed to date. [Define method.]</li>
        <li>Completed and approved deliverables, and delivered live sessions, are generally non-refundable. [Confirm.]</li>
        <li>Third-party fees paid on your behalf (with your approval) are refundable only if the provider refunds them.</li>
      </ul>

      <h2>How to request a refund</h2>
      <p>
        Contact us with your project reference and the reason for your request: <ContactLine />. We aim to respond
        within [X] business days.
      </p>
    </LegalPage>
  );
}
