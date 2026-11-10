import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { CurrentYear } from "@/components/ui/current-year";
import { siteConfig, whatsappLink } from "@/config/site";
import { pillars } from "@/content/services";

export function Footer() {
  const { contact } = siteConfig;
  const wa = whatsappLink("Hello Pixel Kitz Digital, I'd like to discuss a project.");

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-12 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              A 360° creative, technology and digital solutions agency. {siteConfig.tagline}
            </p>
            <p className="eyebrow mt-6 text-subtle">{siteConfig.brandLine.join(" / ")}</p>
          </div>

          <nav aria-label="Footer — services" className="lg:col-span-3">
            <h2 className="eyebrow text-subtle">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {pillars.map((p) => (
                <li key={p.id}>
                  <Link href={`/services?pillar=${p.id}`} className="text-muted transition-colors hover:text-fg">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — company" className="lg:col-span-2">
            <h2 className="eyebrow text-subtle">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {siteConfig.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted transition-colors hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-subtle">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-fg hover:text-accent-text">
                  Start a project <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              </li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="text-muted hover:text-fg">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-muted hover:text-fg">
                    {contact.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="text-muted">{contact.address ?? contact.country}</li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-xs text-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-20 select-none text-center text-[17vw] leading-[0.8] font-medium tracking-[-0.07em] text-fg/[0.04] lg:text-[13.5vw]"
        >
          Pixel Kitz
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legal.entityName ?? siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy" className="hover:text-fg">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-fg">Terms of Service</Link></li>
            <li><Link href="/delivery-refund-policy" className="hover:text-fg">Delivery & Refund Policy</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
