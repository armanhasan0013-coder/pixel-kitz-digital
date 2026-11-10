import { ContactLine, Entity, LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = { ...pageMetadata({ title: "Privacy Policy", description: "How Pixel Kitz Digital collects, uses and protects personal information.", path: "/privacy" }) };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information we collect through this website, why we collect it, and how you can control it."
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by <Entity />, based in Bangladesh. Contact: <ContactLine />.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Details you submit in our inquiry form: name, email, optional phone or WhatsApp number, optional company name, the services you are interested in, budget range, timeline and project description.</li>
        <li>Messages you send us by email, WhatsApp or social media.</li>
        <li>Basic technical information processed by our hosting provider, such as IP address and browser type, used for security and to keep the site running. [Update this section if analytics or cookies are added.]</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and prepare proposals.</li>
        <li>To deliver and support services you have agreed to.</li>
        <li>To protect the website from spam and abuse.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use inquiry details for unrelated marketing without your consent.</p>

      <h2>Service providers</h2>
      <p>
        We use trusted providers to host this website and deliver inquiry emails or notifications. [List providers once
        confirmed — e.g. hosting provider, email delivery provider.] They process data only on our instructions.
      </p>

      <h2>Passwords and account credentials</h2>
      <p>
        We never ask for, collect or store passwords for your third-party accounts. Where access is needed to provide a
        service, we use the provider&apos;s official team or collaborator features.
      </p>

      <h2>Retention</h2>
      <p>We keep inquiry information for as long as needed to respond and for [retention period] afterwards, unless a longer period is required by law or an ongoing project.</p>

      <h2>Your rights</h2>
      <p>You can ask us to access, correct or delete the personal information we hold about you by contacting us at the details above.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The latest version will always be on this page with its update date.</p>
    </LegalPage>
  );
}
