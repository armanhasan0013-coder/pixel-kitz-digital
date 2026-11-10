import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { pageMetadata } from "@/lib/seo";
import { pillars, services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { siteConfig, whatsappLink } from "@/config/site";

export const metadata = pageMetadata({
  title: "Start a Project",
  description: "Tell us about your brand, website, marketing or AI project. Pixel Kitz Digital will reply with clear next steps.",
  path: "/contact",
});

const NEXT_STEPS = [
  { title: "We review your brief", text: "We read every inquiry personally and check how we can help." },
  { title: "A short discovery call", text: "We clarify goals, scope and constraints together." },
  { title: "A clear written proposal", text: "Scope, timeline and price — confirmed before any work begins." },
];

export default function ContactPage() {
  const { contact, founder } = siteConfig;
  const wa = whatsappLink("Hello Pixel Kitz Digital, I'd like to discuss a project.");

  const formProps = {
    categories: pillars.map((p) => ({ value: p.id, label: p.title })),
    services: services.map((s) => ({ slug: s.slug, title: s.title, pillar: s.pillar })),
    solutions: solutions.map((s) => ({ slug: s.slug, title: s.title })),
    budgets: siteConfig.inquiry.budgets,
    timelines: siteConfig.inquiry.timelines,
    fallback: { email: contact.email, whatsapp: wa, linkedin: founder.links.linkedin },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="bg-grid mask-fade absolute inset-x-0 top-0 h-[600px]" />
      <Container className="relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Start a project</Eyebrow>
          <h1 className="display-lg mt-6 text-balance">Let&apos;s build something extraordinary.</h1>
          <p className="lede mt-6 max-w-md">
            Share a few details about your project. The more context you give, the more useful our first reply will be.
          </p>

          <ul className="mt-12 space-y-4">
            {contact.email && (
              <ContactItem icon={<Mail className="size-4" />} label="Email" href={`mailto:${contact.email}`} value={contact.email} />
            )}
            {wa && <ContactItem icon={<MessageCircle className="size-4" />} label="WhatsApp" href={wa} value="Message us on WhatsApp" external />}
            {contact.phone && (
              <ContactItem icon={<Phone className="size-4" />} label="Phone" href={`tel:${contact.phone.replace(/\s/g, "")}`} value={contact.phone} />
            )}
            <ContactItem icon={<MapPin className="size-4" />} label="Location" value={contact.address ?? `${contact.country} · Available worldwide`} />
          </ul>

          <div className="mt-14 border-t border-line pt-10">
            <h2 className="eyebrow text-subtle">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="eyebrow mt-1 text-accent-text">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-12 text-sm text-muted">
            Prefer to see the work first?{" "}
            <a href={founder.links.behance} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
              View the portfolio on Behance
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={<div className="h-[900px] animate-pulse rounded-[28px] border border-line bg-ink-2" aria-label="Loading form" />}>
            <InquiryForm {...formProps} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

function ContactItem({ icon, label, value, href, external }: { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const content = (
    <>
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-muted">
        {icon}
      </span>
      <span>
        <span className="eyebrow block text-subtle">{label}</span>
        <span className="mt-1 block">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 hover:text-accent-text" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4">{content}</div>
      )}
    </li>
  );
}
