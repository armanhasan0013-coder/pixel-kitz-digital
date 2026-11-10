/**
 * Service taxonomy. Edit copy here — pages, filters, sitemap and the inquiry
 * form all read from this file. Services are offerings; scope, timeline and
 * pricing are confirmed during consultation.
 */

export type PillarId = "creative" | "web" | "growth" | "ai";

export type Pillar = {
  id: PillarId;
  index: string;
  title: string;
  short: string;
  headline: string;
  summary: string;
  process: { title: string; text: string }[];
};

export type Service = {
  slug: string;
  pillar: PillarId;
  title: string;
  summary: string;
  audience: string;
  deliverables: string[];
};

export const pillars: Pillar[] = [
  {
    id: "creative",
    index: "01",
    title: "Creative & Design Studio",
    short: "Creative",
    headline: "Identity and visuals people remember.",
    summary:
      "Brand identities, campaign creatives, e-commerce visuals and print — designed with a clear idea behind every decision and prepared properly for where they will be used.",
    process: [
      { title: "Brief & references", text: "We clarify the goal, audience, formats and the look you are aiming for." },
      { title: "Concept directions", text: "You review focused design directions with the reasoning behind each one." },
      { title: "Design & refinement", text: "The chosen direction is developed and refined through structured feedback rounds." },
      { title: "Final files & handover", text: "You receive organised, correctly sized files for print, web and social." },
    ],
  },
  {
    id: "web",
    index: "02",
    title: "Website & Technology Solutions",
    short: "Web & Tech",
    headline: "Websites that work as hard as you do.",
    summary:
      "Business websites, landing pages, online stores and practical web tools — fast, responsive, easy to manage, and scoped honestly around what your business needs now.",
    process: [
      { title: "Discovery & scope", text: "We define goals, pages, features, content and a realistic scope and timeline." },
      { title: "Structure & UX", text: "Sitemap, user flows and wireframes are agreed before visual design begins." },
      { title: "Design & build", text: "Interface design and development, shared with you on a preview link as it progresses." },
      { title: "Test, launch & support", text: "Cross-device testing, launch assistance and an agreed support period." },
    ],
  },
  {
    id: "growth",
    index: "03",
    title: "Digital Marketing & Growth",
    short: "Growth",
    headline: "Campaigns built around business outcomes.",
    summary:
      "Meta advertising, social media, content and landing pages planned around clear objectives — with transparent reporting so you always know what is working.",
    process: [
      { title: "Audit & goals", text: "We review your current channels, audience and data, and agree measurable objectives." },
      { title: "Strategy & plan", text: "Channels, messaging, budget split and a content or campaign calendar." },
      { title: "Creative & launch", text: "Ad creatives, copy and tracking are prepared and campaigns go live." },
      { title: "Measure & optimize", text: "Regular reporting, testing and adjustment based on what the data shows." },
    ],
  },
  {
    id: "ai",
    index: "04",
    title: "AI Tools & Digital Solutions",
    short: "AI & Digital",
    headline: "Practical AI for real everyday work.",
    summary:
      "AI tool onboarding, workflow automation, AI-assisted content and voice production — set up inside accounts you own, with training so your team can use them confidently.",
    process: [
      { title: "Needs assessment", text: "We look at your tasks, tools and team to find where AI or automation genuinely helps." },
      { title: "Recommendation", text: "A clear recommendation of tools, plans and setup — purchased directly by you from the provider." },
      { title: "Setup & implementation", text: "Configuration, workflows and integrations inside your own accounts." },
      { title: "Training & handover", text: "Walkthrough sessions and written guides so your team can work independently." },
    ],
  },
];

const s = (
  pillar: PillarId,
  slug: string,
  title: string,
  summary: string,
  audience: string,
  deliverables: string[],
): Service => ({ pillar, slug, title, summary, audience, deliverables });

export const services: Service[] = [
  // A. Creative & Design Studio
  s("creative", "brand-identity-design", "Brand Identity Design",
    "A cohesive visual identity — mark, color, typography and imagery — built around who you are and who you want to reach.",
    "New businesses, rebrands and founders preparing to launch.",
    ["Brand discovery and positioning notes", "Logo suite and supporting graphic elements", "Color and typography system", "Brand application mockups"]),
  s("creative", "logo-design-brand-guidelines", "Logo Design & Brand Guidelines",
    "A distinctive logo with clear usage rules, so your brand stays consistent wherever it appears.",
    "Businesses that need a professional mark or want to formalize an existing one.",
    ["Logo concepts and refinement", "Primary, secondary and icon versions", "Brand guidelines document", "Export files for print and digital"]),
  s("creative", "social-media-post-design", "Social Media Post Design",
    "On-brand designs for feed posts, carousels and stories that stay consistent across every platform.",
    "Brands publishing regularly on Facebook, Instagram and LinkedIn.",
    ["Feed post and carousel designs", "Story and reel cover formats", "Editable templates on request", "Platform-ready exports"]),
  s("creative", "social-ad-creatives", "Facebook & Instagram Ad Creatives",
    "Static and carousel ad creatives designed around a single message and a clear call to action.",
    "Businesses running, or planning to run, Meta ad campaigns.",
    ["Ad concepts mapped to campaign objectives", "Size variations for feeds, stories and reels", "Variants for A/B testing", "Platform-compliant exports"]),
  s("creative", "youtube-thumbnail-design", "YouTube Thumbnail Design",
    "Clear, high-contrast thumbnails that communicate a video's idea in a fraction of a second.",
    "Creators, educators and brands publishing on YouTube.",
    ["Thumbnail concepts", "Photo editing and compositing", "Headline text styling", "Variants for thumbnail testing"]),
  s("creative", "youtube-channel-branding", "YouTube Channel Branding",
    "Banner, profile, thumbnail system and on-screen graphics that give a channel a recognizable look.",
    "New channels and creators formalizing their visual style.",
    ["Channel banner and profile image", "Reusable thumbnail template system", "End screens and lower-thirds", "Video watermark"]),
  s("creative", "amazon-listing-images", "Amazon Listing Image Design",
    "Main images, infographics and lifestyle visuals that explain your product and follow marketplace image requirements.",
    "Amazon sellers and private-label brands.",
    ["Main image retouching", "Feature and benefit infographics", "Lifestyle and comparison visuals", "Marketplace-ready exports"]),
  s("creative", "ecommerce-product-visuals", "E-commerce Product Listing Visuals",
    "Consistent product visuals for Shopify, WooCommerce, Daraz and other storefronts.",
    "Online stores and sellers listing across multiple marketplaces.",
    ["Product image editing and cleanup", "Background removal and color correction", "Feature callout graphics", "Store banners and collection headers"]),
  s("creative", "a-plus-content", "A+ Content & Enhanced Brand Content",
    "Modular A+ layouts that tell your brand story and answer buyer questions further down the listing.",
    "Brand-registered sellers on Amazon and similar marketplaces.",
    ["Module planning and layout", "Comparison charts", "Brand story modules", "Premium A+ layouts where your account is eligible"]),
  s("creative", "packaging-label-design", "Packaging & Label Design",
    "Packaging and labels designed to stand out on shelf and on screen, prepared to your printer's specifications.",
    "Product brands launching new items or refreshing existing packaging.",
    ["Concept directions", "Dieline-based artwork", "Label and variant versions", "Print-ready files"]),
  s("creative", "business-cards-stationery", "Business Cards & Corporate Stationery",
    "Business cards, letterheads, envelopes and email signatures that carry your identity into every interaction.",
    "Companies and professionals who want consistent everyday brand touchpoints.",
    ["Business card design", "Letterhead and envelope", "Email signature", "Print-ready and digital files"]),
  s("creative", "brochure-company-profile", "Brochure & Company Profile Design",
    "Company profiles and brochures that present your offer with clear structure and confident visuals.",
    "Businesses pitching to clients, partners or tenders.",
    ["Content structure and flow", "Page layout design", "Infographics and charts", "Print and interactive PDF versions"]),
  s("creative", "flyers-posters-banners", "Flyers, Posters & Banners",
    "Promotional, event and signage designs sized and prepared correctly for print or display.",
    "Events, retail promotions and seasonal campaigns.",
    ["Promotional flyer and poster design", "Roll-up, X-stand and large-format banners", "Digital display versions", "Print-ready files with bleed"]),
  s("creative", "presentation-pitch-deck", "Presentation & Pitch Deck Design",
    "Investor, sales and company decks that make complex ideas simple to follow.",
    "Founders, sales teams and organizations presenting to decision-makers.",
    ["Narrative and structure review", "Slide design system", "Charts, diagrams and icons", "Editable PowerPoint or Google Slides files"]),
  s("creative", "print-marketing-collateral", "Print & Marketing Collateral",
    "Catalogues, menus, rack cards and other printed material, consistent with your brand system.",
    "Retail, hospitality and service businesses with physical touchpoints.",
    ["Catalogue and menu layouts", "Leaflets and rack cards", "Stickers, tags and inserts", "Printer-ready files"]),
  s("creative", "personal-branding-design", "Personal Branding Visual Design",
    "A coherent visual presence for founders, professionals and creators — from profile visuals to content templates.",
    "Founders, consultants and creators building a public profile.",
    ["Personal mark or monogram", "Profile and cover visuals", "Content templates", "Mini style guide"]),
  s("creative", "digital-illustration", "Digital Illustration & Visual Assets",
    "Custom illustrations, icons and graphic assets for websites, campaigns and products.",
    "Brands that need original visuals instead of generic stock.",
    ["Illustration style exploration", "Custom illustrations", "Icon sets", "Layered source files"]),
  s("creative", "ai-assisted-creative", "AI-Assisted Creative Production",
    "Faster concepting and asset production with AI tools — always finished and quality-checked by a designer.",
    "Teams that need high creative volume without losing quality control.",
    ["Rapid concept exploration", "AI image generation and editing", "Designer refinement and retouching", "Guidance on tool usage terms"]),

  // B. Website & Technology Solutions
  s("web", "business-website", "Business Website Development",
    "A professional website that explains what you do, builds trust and makes it easy for customers to contact you.",
    "Small and growing businesses establishing or upgrading their online presence.",
    ["Sitemap and page structure", "Responsive design and development", "Contact and inquiry forms", "Basic on-page SEO setup"]),
  s("web", "corporate-website", "Corporate Website Design",
    "A structured, multi-page website for organizations that need to present several services, teams or audiences clearly.",
    "Established companies and organizations.",
    ["Information architecture", "Custom page templates", "Content management setup", "Accessibility and performance checks"]),
  s("web", "landing-page", "Landing Page Design & Development",
    "A focused page for one offer, campaign or launch — designed to guide visitors toward a single action.",
    "Campaigns, product launches and lead generation.",
    ["Conversion-focused layout", "Copy structure guidance", "Form or WhatsApp integration", "Analytics event setup"]),
  s("web", "ecommerce-website", "E-commerce Website Development",
    "An online store that is simple to browse, simple to manage and set up for the payment and delivery options available to you.",
    "Retailers and brands selling online in Bangladesh or internationally.",
    ["Store setup and product structure", "Product, cart and checkout pages", "Payment gateway integration (subject to provider approval)", "Order management training"]),
  s("web", "portfolio-website", "Portfolio Websites",
    "A clean, image-first website that lets your work speak for itself.",
    "Designers, photographers, architects and creative professionals.",
    ["Portfolio structure", "Project page templates", "Image optimization", "Contact and social links"]),
  s("web", "custom-web-app", "Custom Web Applications",
    "Scoped web tools — dashboards, booking systems, internal tools — built around a defined business process.",
    "Businesses with a specific workflow that off-the-shelf tools don't fit.",
    ["Requirements and scope document", "UX flows and interface design", "Development in agreed phases", "Testing and handover documentation"]),
  s("web", "website-redesign", "Website Redesign",
    "A modern redesign of an existing website that improves clarity, speed and usability while keeping what already works.",
    "Businesses whose current website looks dated or no longer fits their offer.",
    ["Current-site review", "Updated structure and design", "Content migration", "Redirects to protect existing search traffic"]),
  s("web", "ui-ux-design", "UI/UX Design",
    "Interface and experience design for websites and apps — from user flows and wireframes to polished, developer-ready screens.",
    "Startups and teams building digital products.",
    ["User flows", "Wireframes", "High-fidelity interface design", "Clickable prototype and design handoff"]),
  s("web", "responsive-development", "Responsive Web Development",
    "Front-end development that turns designs into fast, accessible pages that work on every screen size.",
    "Teams that have a design and need it built properly.",
    ["Responsive front-end build", "Cross-browser testing", "Accessibility basics", "Performance optimization"]),
  s("web", "website-maintenance", "Website Maintenance",
    "Ongoing updates, backups, content changes and monitoring, so your website stays secure and current.",
    "Businesses without an in-house web team.",
    ["Scheduled updates and backups", "Content edits", "Uptime and error monitoring", "Monthly summary"]),
  s("web", "speed-optimization", "Website Speed Optimization",
    "A performance review and practical fixes to make your website load faster and feel more responsive.",
    "Websites with slow load times or weak Core Web Vitals.",
    ["Performance audit", "Image and asset optimization", "Caching and loading improvements", "Before-and-after measurements"]),
  s("web", "technical-seo-setup", "Basic Technical SEO Setup",
    "The technical foundations that help search engines find and understand your website.",
    "New websites and sites that have never had an SEO review.",
    ["Titles, descriptions and headings", "Sitemap and robots configuration", "Search Console setup", "Structured data basics"]),
  s("web", "hosting-domain-setup", "Hosting & Domain Setup Assistance",
    "Help choosing, purchasing and configuring a domain, hosting and business email — registered in your name.",
    "Businesses going online for the first time.",
    ["Domain and hosting recommendations", "DNS configuration", "SSL certificate setup", "Business email setup"]),
  s("web", "ai-website-features", "AI-Assisted Website Features",
    "Practical AI features such as smart search, content assistants or inquiry triage, scoped to a clear use case.",
    "Businesses exploring AI inside their website or customer journey.",
    ["Use-case definition", "Provider and cost recommendation", "Feature integration", "Usage and privacy guidelines"]),
  s("web", "workflow-automation", "Workflow & Business Automation",
    "Automations that connect your website, forms, spreadsheets and messaging tools to remove repetitive manual work.",
    "Teams spending time copying data between tools.",
    ["Process mapping", "Automation design", "Tool integration and testing", "Documentation"]),

  // C. Digital Marketing & Growth
  s("growth", "meta-ads-management", "Facebook & Instagram Ads Management",
    "Ongoing management of Meta ad campaigns — targeting, budgets, creatives and optimization — against agreed objectives.",
    "Businesses ready to invest a regular advertising budget.",
    ["Campaign structure and targeting", "Budget pacing", "Creative rotation and testing", "Regular performance reports"]),
  s("growth", "meta-ads-setup", "Meta Ads Campaign Setup",
    "A clean, correctly configured Meta advertising setup — Business Manager, Pixel, events and first campaigns.",
    "Businesses starting with paid social for the first time.",
    ["Business Manager and ad account setup", "Pixel and conversion events", "Audience setup", "Launch-ready campaign structure"]),
  s("growth", "campaign-creative-design", "Campaign Creative Design",
    "A coordinated set of creatives across formats so a campaign looks and sounds consistent everywhere it runs.",
    "Seasonal campaigns, launches and promotions.",
    ["Campaign key visual", "Format adaptations", "Ad copy variations", "Creative testing plan"]),
  s("growth", "social-media-marketing", "Social Media Marketing",
    "Planned, consistent social media activity that supports specific business goals rather than posting for its own sake.",
    "Brands that want social media to support sales and awareness.",
    ["Channel strategy", "Content calendar", "Post design and copy", "Monthly insights"]),
  s("growth", "social-media-page-management", "Social Media Page Management",
    "Day-to-day management of your pages — publishing, page optimization and community basics.",
    "Businesses without time to manage their pages consistently.",
    ["Page setup and optimization", "Scheduled publishing", "Comment and message guidelines", "Monthly activity summary"]),
  s("growth", "content-strategy", "Content Strategy",
    "A clear plan for what to publish, where and why — built around your audience's questions and your business goals.",
    "Brands publishing content without a clear direction.",
    ["Audience and topic research", "Content pillars", "Format and channel plan", "Editorial calendar"]),
  s("growth", "campaign-planning", "Digital Campaign Planning",
    "End-to-end planning for a campaign: objectives, audience, channels, messaging, budget and timeline.",
    "Launches, promotions and seasonal pushes.",
    ["Campaign brief", "Channel and budget plan", "Messaging framework", "Timeline and KPIs"]),
  s("growth", "lead-generation", "Lead Generation Campaigns",
    "Campaigns designed to collect qualified inquiries through forms, landing pages or messaging apps.",
    "Service businesses, real estate, education and B2B.",
    ["Offer and audience definition", "Lead form or landing page", "Lead routing setup", "Lead quality review"]),
  s("growth", "conversion-landing-pages", "Conversion-Focused Landing Pages",
    "Campaign landing pages designed and written to turn ad clicks into inquiries or sales.",
    "Businesses sending paid traffic to a generic homepage.",
    ["Message-matched page design", "Form and tracking setup", "Speed optimization", "Testing suggestions"]),
  s("growth", "brand-marketing-strategy", "Brand Marketing Strategy",
    "Positioning, messaging and a practical marketing roadmap that connects your brand to your growth goals.",
    "Businesses entering a new market or repositioning.",
    ["Positioning statement", "Messaging framework", "Audience priorities", "Marketing roadmap"]),
  s("growth", "ad-performance-reporting", "Advertising Performance Reporting",
    "Clear, honest reports that explain results in plain language and recommend the next steps.",
    "Businesses that run ads but struggle to understand the numbers.",
    ["Tracking review", "Reporting dashboard or template", "Monthly analysis", "Recommendations"]),
  s("growth", "basic-seo", "Basic Search Engine Optimization",
    "On-page improvements and local search basics to help the right people find your business.",
    "Local businesses and new websites.",
    ["Keyword research", "On-page optimization", "Google Business Profile setup", "Progress review"]),
  s("growth", "youtube-promo-creative", "YouTube Promotional Creative Services",
    "Thumbnails, channel graphics and promotional assets that support a YouTube growth plan.",
    "Creators and brands investing in YouTube.",
    ["Thumbnail system", "Promotional banners", "Community post graphics", "Ad creative for video promotion"]),
  s("growth", "short-form-video-support", "Short-Form Video Campaign Support",
    "Concepts, scripts, covers and on-screen graphics for Reels, Shorts and TikTok-style campaigns.",
    "Brands adding short-form video to their marketing.",
    ["Content concepts and hooks", "Script outlines", "Cover and text-overlay design", "Posting plan"]),

  // D. AI Tools & Digital Solutions
  s("ai", "ai-tools-onboarding", "AI Tools Setup & Onboarding",
    "Guided setup of the AI tools that fit your work, configured inside accounts you create and own.",
    "Individuals and teams starting with AI tools.",
    ["Tool recommendation", "Account configuration guidance", "Starter prompt library", "Live onboarding session"]),
  s("ai", "chatgpt-setup", "ChatGPT Setup & Assistance",
    "Hands-on help getting productive with ChatGPT — workspace settings, custom instructions and practical workflows.",
    "Professionals and teams using, or planning to use, ChatGPT.",
    ["Workspace and settings walkthrough", "Custom instructions and projects", "Role-specific workflows", "Team usage guidelines"]),
  s("ai", "claude-setup", "Claude Setup & Assistance",
    "Practical onboarding for Claude — projects, knowledge, writing and analysis workflows tailored to your work.",
    "Professionals and teams using, or planning to use, Claude.",
    ["Workspace and settings walkthrough", "Project and knowledge setup", "Role-specific workflows", "Team usage guidelines"]),
  s("ai", "ai-workflow-implementation", "AI Workflow Implementation",
    "AI built into specific business tasks — drafting, summarizing, research or support — with clear review steps.",
    "Teams with repetitive knowledge work.",
    ["Task analysis", "Workflow design with human review", "Implementation and testing", "Documentation and training"]),
  s("ai", "ai-content-production", "AI Content Production",
    "AI-assisted drafts for blogs, social posts and product copy — edited and fact-checked by a person before delivery.",
    "Brands that need consistent content volume.",
    ["Content brief", "AI-assisted drafting", "Human editing and fact-checking", "Ready-to-publish files"]),
  s("ai", "ai-voiceover", "Premium AI Voiceover Production",
    "Natural-sounding AI voiceovers for ads, explainers and videos, produced with licensed tools.",
    "Video creators, marketers and e-learning producers.",
    ["Voice selection", "Script timing and pronunciation tuning", "Audio cleanup and mastering", "WAV and MP3 delivery"]),
  s("ai", "text-to-speech", "Text-to-Speech Services",
    "Clear text-to-speech narration for long-form content, training material and accessibility.",
    "Educators, publishers and businesses producing audio versions of content.",
    ["Voice and style selection", "Narration generation", "Chaptered audio files", "Revision round"]),
  s("ai", "ai-creative-services", "AI-Powered Creative Services",
    "Concept art, mood boards and campaign imagery produced with AI tools and refined by a designer.",
    "Brands exploring new visual directions quickly.",
    ["Mood boards", "Concept visuals", "Designer refinement", "Usage-terms guidance"]),
  s("ai", "business-automation", "Business Automation Services",
    "Automations that connect forms, spreadsheets, email and messaging to reduce manual work and errors.",
    "Small businesses handling inquiries and orders manually.",
    ["Process mapping", "Automation build", "Error handling and alerts", "Owner training"]),
  s("ai", "productivity-tools", "Digital Productivity Tools",
    "Setup and organization of productivity tools — workspaces, templates and shared systems your team will actually use.",
    "Growing teams that need better shared organization.",
    ["Tool recommendation", "Workspace structure", "Templates", "Team walkthrough"]),
  s("ai", "software-subscription-assistance", "Software & Subscription Assistance",
    "Advice on choosing the right software plan and help purchasing it directly from the official provider, in your name.",
    "Businesses unsure which tools or plans they need.",
    ["Needs review", "Plan comparison", "Purchase guidance through official channels", "Initial setup"]),
  s("ai", "licensed-digital-resources", "Licensed Digital Resources",
    "Digital resources and productivity solutions offered only where Pixel Kitz Digital holds the right to distribute them.",
    "Businesses looking for ready-to-use digital resources.",
    ["Resource recommendation", "Licensing terms explained", "Delivery and setup", "Support contact"]),
];

export function getPillar(id: PillarId): Pillar {
  return pillars.find((p) => p.id === id)!;
}

export function getService(slug: string): Service | undefined {
  return services.find((x) => x.slug === slug);
}

export function servicesByPillar(id: PillarId): Service[] {
  return services.filter((x) => x.pillar === id);
}

export function relatedServices(service: Service, count = 3): Service[] {
  // The next services in the same pillar (wrapping around), so each page links to different neighbours.
  const group = servicesByPillar(service.pillar);
  const i = group.findIndex((x) => x.slug === service.slug);
  return Array.from({ length: Math.min(count, group.length - 1) }, (_, k) => group[(i + k + 1) % group.length]);
}

export const pillarIds = pillars.map((p) => p.id);
