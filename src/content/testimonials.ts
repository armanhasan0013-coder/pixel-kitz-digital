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
  service?: string;
  projectSlug?: string;
  sourceUrl?: string;
};

export const testimonials: Testimonial[] = [];
