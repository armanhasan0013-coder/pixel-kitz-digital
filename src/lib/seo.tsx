import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

/** Builds page metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — ${siteConfig.name}`, description, url: path, siteName: siteConfig.name, type: "website" },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd() {
  const { founder, contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/pixel-kitz-logo-original.svg"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: ["BD", "Worldwide"],
    address: { "@type": "PostalAddress", addressCountry: "BD", ...(contact.address ? { streetAddress: contact.address } : {}) },
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      sameAs: Object.values(founder.links),
    },
    sameAs: siteConfig.social.map((s) => s.href),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
