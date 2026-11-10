/**
 * Digital Solutions catalog.
 *
 * Rules enforced by this data model:
 * - `price` stays null ("Request pricing") until real pricing is approved.
 * - No listing sells, shares or delivers third-party account credentials.
 * - Subscriptions are always purchased by the customer directly from the
 *   official provider unless an authorized resale agreement exists.
 */

export type Availability = "available" | "consultation" | "coming-soon";

export type SolutionCategory =
  | "AI Setup & Onboarding"
  | "AI Content & Voice"
  | "Automation"
  | "Productivity & Software";

export type Solution = {
  slug: string;
  title: string;
  category: SolutionCategory;
  description: string;
  fulfillment: string;
  requirements: string[];
  /** Display string such as "৳5,000" once approved. null renders "Request pricing". */
  price: string | null;
  availability: Availability;
  options?: { label: string; choices: string[] };
  terms: string;
  relatedService?: string;
};

export const solutionCategories: SolutionCategory[] = [
  "AI Setup & Onboarding",
  "AI Content & Voice",
  "Automation",
  "Productivity & Software",
];

export const availabilityLabel: Record<Availability, string> = {
  available: "Available",
  consultation: "By consultation",
  "coming-soon": "Coming soon",
};

export const solutions: Solution[] = [
  {
    slug: "chatgpt-setup-onboarding",
    title: "ChatGPT Setup & Onboarding",
    category: "AI Setup & Onboarding",
    description:
      "A guided session that gets you or your team productive with ChatGPT: settings, custom instructions, projects and workflows built around your actual tasks.",
    fulfillment: "Live remote session plus a written setup guide and starter prompt library.",
    requirements: [
      "Your own ChatGPT account, created with your email and paid by you if you choose a paid plan",
      "A short list of the tasks you want help with",
    ],
    price: null,
    availability: "available",
    options: { label: "Who is this for?", choices: ["Individual", "Small team (2–10)", "Organization (10+)"] },
    terms:
      "Setup and training service only. Pixel Kitz Digital is independent and not affiliated with OpenAI. We do not sell, share or create ChatGPT accounts, and we never ask for your password.",
    relatedService: "chatgpt-setup",
  },
  {
    slug: "claude-setup-onboarding",
    title: "Claude Setup & Onboarding",
    category: "AI Setup & Onboarding",
    description:
      "Practical onboarding for Claude: projects, knowledge files, writing and analysis workflows, and simple team guidelines for consistent results.",
    fulfillment: "Live remote session plus a written setup guide and starter prompt library.",
    requirements: [
      "Your own Claude account, created with your email and paid by you if you choose a paid plan",
      "Examples of the documents or tasks you work with",
    ],
    price: null,
    availability: "available",
    options: { label: "Who is this for?", choices: ["Individual", "Small team (2–10)", "Organization (10+)"] },
    terms:
      "Setup and training service only. Pixel Kitz Digital is independent and not affiliated with Anthropic. We do not sell, share or create Claude accounts, and we never ask for your password.",
    relatedService: "claude-setup",
  },
  {
    slug: "ai-workflow-assessment",
    title: "AI Workflow Assessment",
    category: "AI Setup & Onboarding",
    description:
      "A structured review of how your team works today, with a written recommendation of where AI tools can save time — and where they shouldn't be used.",
    fulfillment: "Consultation call followed by a written recommendations document.",
    requirements: ["Access to a team lead who can describe daily workflows", "A list of tools you already use"],
    price: null,
    availability: "consultation",
    terms: "Recommendations are independent; we receive no commission from AI providers unless disclosed in writing.",
    relatedService: "ai-workflow-implementation",
  },
  {
    slug: "ai-voiceover-production",
    title: "Premium AI Voiceover Production",
    category: "AI Content & Voice",
    description:
      "Natural-sounding voiceovers for ads, explainers and social videos — voice selected, timed and mastered to match your edit.",
    fulfillment: "Delivered as mastered WAV and MP3 files, with one revision round.",
    requirements: ["Final approved script", "Preferred voice style and language", "Intended usage (ads, YouTube, internal)"],
    price: null,
    availability: "available",
    options: { label: "Length", choices: ["Up to 60 seconds", "1–5 minutes", "Longer than 5 minutes"] },
    terms:
      "Produced with commercially licensed voice tools; the selected tool's usage terms apply. We do not replicate any real person's voice without their documented consent.",
    relatedService: "ai-voiceover",
  },
  {
    slug: "text-to-speech-narration",
    title: "Text-to-Speech Narration",
    category: "AI Content & Voice",
    description:
      "Clear narration for articles, training material and e-learning, delivered as organized, chaptered audio files.",
    fulfillment: "Chaptered audio files delivered via a shared download link.",
    requirements: ["Final text in a document file", "Pronunciation notes for names or technical terms"],
    price: null,
    availability: "available",
    terms: "Usage rights follow the licensed tool used for production and are confirmed in your quote.",
    relatedService: "text-to-speech",
  },
  {
    slug: "ai-content-pack",
    title: "AI-Assisted Content Pack",
    category: "AI Content & Voice",
    description:
      "Blog, social or product-description drafts produced with AI assistance, then edited and fact-checked by a person before delivery.",
    fulfillment: "Edited documents delivered in Google Docs or Word format.",
    requirements: ["Topic list or product catalog", "Brand voice notes or example content"],
    price: null,
    availability: "available",
    options: { label: "Content type", choices: ["Blog articles", "Social captions", "Product descriptions"] },
    terms: "All content is reviewed by a person. You own the final delivered text.",
    relatedService: "ai-content-production",
  },
  {
    slug: "business-automation-setup",
    title: "Business Automation Setup",
    category: "Automation",
    description:
      "Connect your forms, spreadsheets, email and messaging tools so inquiries and orders move automatically — with alerts when something needs attention.",
    fulfillment: "Built inside your accounts, tested with you, and documented.",
    requirements: ["Admin access you grant through each tool's official sharing or team features", "A description of the current manual process"],
    price: null,
    availability: "consultation",
    terms:
      "Automation platforms may have their own subscription costs, paid directly by you. Access is granted through official team or collaborator features — never by sharing passwords.",
    relatedService: "business-automation",
  },
  {
    slug: "productivity-workspace-setup",
    title: "Productivity Workspace Setup",
    category: "Productivity & Software",
    description:
      "A tidy, shared workspace for your team — structure, templates and permissions in the productivity tools you choose.",
    fulfillment: "Remote setup inside your workspace plus a recorded walkthrough.",
    requirements: ["A workspace you own", "Team size and main use cases"],
    price: null,
    availability: "available",
    terms: "Tool subscriptions, if any, are purchased directly by you from the provider.",
    relatedService: "productivity-tools",
  },
  {
    slug: "software-subscription-assistance",
    title: "Software Subscription Assistance",
    category: "Productivity & Software",
    description:
      "Unsure which plan you need? We compare options, explain the trade-offs and guide you through purchasing directly from the official provider.",
    fulfillment: "Consultation call and a written plan recommendation.",
    requirements: ["Your budget range", "What you need the software to do"],
    price: null,
    availability: "consultation",
    terms:
      "Subscriptions are purchased by you, in your name, from the official provider. Pixel Kitz Digital does not resell third-party subscriptions unless an authorized agreement is published on this page.",
    relatedService: "software-subscription-assistance",
  },
  {
    slug: "licensed-digital-resources",
    title: "Licensed Digital Resources",
    category: "Productivity & Software",
    description:
      "Templates, assets and productivity resources that Pixel Kitz Digital is authorized to distribute. Listings will appear here once licensing is confirmed.",
    fulfillment: "To be confirmed per resource.",
    requirements: ["To be confirmed per resource"],
    price: null,
    availability: "coming-soon",
    terms: "Only resources we have the documented right to distribute will be listed.",
    relatedService: "licensed-digital-resources",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((x) => x.slug === slug);
}
