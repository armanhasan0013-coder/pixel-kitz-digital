/**
 * Central business configuration.
 *
 * Anything that is not yet verified (phone, email, address, legal entity) is read
 * from environment variables and left `null` when missing. Components hide
 * contact options that are not configured instead of showing fake details.
 */

function env(value: string | undefined): string | null {
  const v = value?.trim();
  return v ? v : null;
}

export const siteConfig = {
  name: "Pixel Kitz Digital",
  shortName: "Pixel Kitz",
  tagline: "Create Boldly. Build Intelligently. Grow Digitally.",
  brandLine: ["Ideas", "Design", "Digital Growth"],
  description:
    "Pixel Kitz Digital is a creative, technology and digital growth agency based in Bangladesh — brand identity, websites, performance marketing and practical AI solutions under one roof.",
  url:
    env(process.env.NEXT_PUBLIC_SITE_URL) ??
    // Vercel sets this automatically, so links work before a custom domain is configured.
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en",

  contact: {
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    /** Digits only, international format without "+", e.g. 8801XXXXXXXXX */
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    address: env(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS),
    country: "Bangladesh",
  },

  legal: {
    /** Registered legal entity name — leave null until confirmed. */
    entityName: env(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME),
    lastUpdated: "Draft — not yet published",
  },

  founder: {
    name: "Imran Hossain Bhuiyan",
    role: "Founder & CEO",
    /** Path under /public, e.g. "/images/founder.jpg". null shows a monogram. */
    portrait: "/images/founder.png" as string | null,
    links: {
      behance: "https://www.behance.net/Imran-H-bhuiyan",
      linkedin: "https://www.linkedin.com/in/imranbhuiya/",
      instagram: "https://www.instagram.com/imran_psd/",
    },
  },

  /** Company social profiles. Add verified company URLs when they exist. */
  social: [
    { label: "Behance", href: "https://www.behance.net/Imran-H-bhuiyan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/imranbhuiya/" },
    { label: "Instagram", href: "https://www.instagram.com/imran_psd/" },
  ],

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Digital Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],

  inquiry: {
    budgets: [
      "Under ৳25,000",
      "৳25,000 – ৳75,000",
      "৳75,000 – ৳2,00,000",
      "Above ৳2,00,000",
      "International project (USD)",
      "Not sure yet",
    ],
    timelines: ["As soon as possible", "Within 2 weeks", "Within 1 month", "1 – 3 months", "Flexible"],
  },
} as const;

export function whatsappLink(message: string): string | null {
  const n = siteConfig.contact.whatsapp?.replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
