/**
 * Insights (blog). Articles marked `status: "sample"` display a visible
 * "Sample article — pending review" label. Change to "published" once approved.
 */

export const insightCategories = ["Design", "Marketing", "AI Tools", "Web Development", "Business Growth"] as const;
export type InsightCategory = (typeof insightCategories)[number];

export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "list"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string; // ISO date
  readingTime: string;
  status: "sample" | "published";
  body: Block[];
};

export const insights: Insight[] = [
  {
    slug: "what-a-brand-identity-includes",
    title: "What a brand identity actually includes — and what it doesn't",
    excerpt:
      "A logo is the most visible part of a brand identity, but it's rarely the part that does the most work. Here's what a complete identity covers.",
    category: "Design",
    date: "2026-11-01",
    readingTime: "4 min read",
    status: "sample",
    body: [
      { type: "p", text: "When businesses ask for a \"brand identity\", they often mean a logo. A logo matters, but on its own it can't make a brand feel consistent. Consistency comes from a system — a small set of decisions that are applied the same way everywhere." },
      { type: "h2", text: "The core components" },
      { type: "list", items: [
        "A logo suite: primary logo, simplified versions and an icon for small spaces like profile pictures.",
        "A color palette with defined values for print and screen, and rules about which colors lead.",
        "Typography: one or two typefaces and how they're used for headings, body text and labels.",
        "Graphic elements: shapes, patterns or image treatments that make your materials recognizable even without the logo.",
        "Guidelines that explain how all of the above should be used.",
      ] },
      { type: "h2", text: "What an identity doesn't include" },
      { type: "p", text: "An identity isn't a marketing strategy, a website or a content plan. It's the foundation those things are built on. Separating them helps you budget properly and avoid paying twice for the same thinking." },
      { type: "h2", text: "How to tell if yours is working" },
      { type: "p", text: "Line up your social posts, website, packaging and business card side by side. If they look like they come from the same company without needing the logo to prove it, your identity is doing its job." },
    ],
  },
  {
    slug: "prepare-before-a-website-project",
    title: "Five things to prepare before you brief a website project",
    excerpt:
      "Most website delays don't come from design or development — they come from missing content and unclear decisions. Prepare these five things first.",
    category: "Web Development",
    date: "2026-10-20",
    readingTime: "5 min read",
    status: "sample",
    body: [
      { type: "p", text: "A website project moves fastest when the important decisions are made before design starts. You don't need everything finished, but you do need clarity on a few points." },
      { type: "h2", text: "1. One primary goal" },
      { type: "p", text: "Decide what a successful visit looks like: an inquiry, a call, a purchase, a booking. Every page should support that action." },
      { type: "h2", text: "2. Your audience, in plain words" },
      { type: "p", text: "Describe two or three types of visitors and what they need to know before they trust you." },
      { type: "h2", text: "3. A draft page list" },
      { type: "p", text: "A simple list of pages, even if it changes later, makes scope and pricing far more accurate." },
      { type: "h2", text: "4. Content owners" },
      { type: "p", text: "Who will write or approve the text? Who supplies photos? Unassigned content is the most common cause of delay." },
      { type: "h2", text: "5. Practical details" },
      { type: "list", items: [
        "Do you already own a domain? Who has access to it?",
        "Do you need online payments, and which providers are available to your business?",
        "Who will update the website after launch?",
      ] },
    ],
  },
  {
    slug: "using-ai-tools-safely-at-work",
    title: "Using AI tools at work without handing over your accounts",
    excerpt:
      "Shared logins and resold accounts look cheap but put your data at risk. Here's a safer way to get your team using AI tools.",
    category: "AI Tools",
    date: "2026-10-05",
    readingTime: "4 min read",
    status: "sample",
    body: [
      { type: "p", text: "AI tools are quickly becoming everyday work tools. As demand grows, so do offers of shared or resold accounts. They can seem convenient, but they come with real risks." },
      { type: "h2", text: "Why shared accounts are a problem" },
      { type: "list", items: [
        "Anyone with the login can see your conversations, files and history.",
        "Shared or resold accounts commonly break the provider's terms and can be suspended without warning.",
        "You have no control over billing, security settings or data retention.",
      ] },
      { type: "h2", text: "A safer setup" },
      { type: "p", text: "Create accounts in your own name, with your own email, and buy any paid plan directly from the provider. For teams, use the provider's official team or business plans, which give an administrator control over members and data." },
      { type: "h2", text: "Where outside help fits" },
      { type: "p", text: "Good onboarding support should never need your password. It should help you choose the right plan, configure settings, build useful workflows and train your team — all inside accounts that you own and control." },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
