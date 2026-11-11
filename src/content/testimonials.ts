/**
 * Client testimonials.
 *
 * Only add words a real client actually gave you, and only with their permission to publish them.
 * No invented quotes, names, companies or results — the same rule as the portfolio.
 * While this list is empty, the testimonials section is not shown anywhere on the site.
 *
 * Example entry:
 *   {
 *     quote: "What the client said, in their own words.",
 *     name: "Client name",
 *     role: "Founder",              // optional
 *     company: "Company name",      // optional
 *     location: "Country",          // optional
 *     service: "Brand identity",    // optional — what you did for them
 *     projectSlug: "project-slug",  // optional — links to /work/<slug> from src/content/projects.ts
 *     sourceUrl: "https://...",     // optional — public review this quote comes from (Fiverr, Google, LinkedIn...)
 *   },
 */

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Country or city, shown after role/company. */
  location?: string;
  service?: string;
  projectSlug?: string;
  sourceUrl?: string;
};

/**
 * Public reviews left on the founder's Fiverr profile, quoted exactly as written (typos included).
 * Names are the reviewers' Fiverr usernames. Collected 2026-11-12 — 21 reviews, 5.0 average at that time.
 */
const FIVERR = "https://www.fiverr.com/imran_bhuiya";
const THUMBNAILS = "YouTube thumbnail design";

function fiverr(name: string, location: string, quote: string): Testimonial {
  return { quote, name, role: "Fiverr client", location, service: THUMBNAILS, sourceUrl: FIVERR };
}

export const testimonials: Testimonial[] = [
  fiverr(
    "igm100",
    "United Kingdom",
    "Amazing work, thank you so much - really fast and clear communication and seriously exceeded my expectations. Definitely recommend to work with this guy, will be returning to purchase more in the future.",
  ),
  fiverr(
    "jtcproperty",
    "United Kingdom",
    "pleasure to work with and got the project completed within a good timescale, would reccommed",
  ),
  fiverr("majaliwalukambo", "Canada", "Very good and fast. I like the work and hope to continue working with you!!"),
  fiverr("bigrob2020", "United States", "He did a wonderful job and made sure that it was right"),
  fiverr(
    "chinchingmarley",
    "Kenya",
    "He is a really good at his work... looking forward to give him more work",
  ),
  fiverr("onlinecheapskat", "Colombia", "Great Job! I will be ordering from him again! Thanks!"),
];
