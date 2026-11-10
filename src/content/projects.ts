/**
 * Portfolio projects.
 *
 * Selected from the founder's public Behance portfolio (https://www.behance.net/Imran-H-bhuiyan).
 * Images live in /public/work/<slug>/ (web-optimised copies of the Behance originals).
 * Descriptions only state what the published work shows — no invented clients, results or metrics.
 * Add `challenge` / `solution` only when you have a real brief to describe.
 */

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  year?: string;
  cover: ProjectImage;
  summary: string;
  challenge?: string;
  solution?: string;
  deliverables: string[];
  tools?: string[];
  gallery: ProjectImage[];
  externalUrl?: string;
};

export const projectCategories = [
  "Branding",
  "Social Media",
  "Advertising",
  "YouTube",
  "E-commerce",
  "Web",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

const BEHANCE = "https://www.behance.net/gallery";
const PS = "Adobe Photoshop";
const AI = "Adobe Illustrator";

/** Builds a gallery from /public/work/<slug>/<n>.webp with known pixel sizes. */
function gallery(slug: string, label: string, sizes: [number, number][]): ProjectImage[] {
  return sizes.map(([width, height], i) => ({
    src: `/work/${slug}/${i + 1}.webp`,
    alt: `${label} — design ${i + 1}`,
    width,
    height,
  }));
}

function cover(slug: string, alt: string): ProjectImage {
  return { src: `/work/${slug}/cover.webp`, alt, width: 808, height: 632 };
}

export const projects: Project[] = [
  {
    slug: "software-engineer-thumbnails-social",
    title: "Thumbnails & Social Media for a Software Engineer",
    category: "YouTube",
    cover: cover("software-engineer-thumbnails-social", "Collage of Bangla YouTube thumbnails about tech careers"),
    summary: "A consistent thumbnail and social system for a Bangla tech-career creator.",
    deliverables: ["YouTube thumbnails", "Social media banners", "Bangla typography"],
    tools: [PS],
    gallery: gallery("software-engineer-thumbnails-social", "Tech career thumbnail", [
      [1600, 1058], [1200, 675], [1200, 675], [1200, 675], [1200, 675], [1600, 702],
    ]),
    externalUrl: `${BEHANCE}/220601383/Thumbnail-Social-Media-Design-for-a-Software-Engineer`,
  },
  {
    slug: "pin-board-youtube-thumbnails",
    title: "Pin Board YouTube Thumbnails",
    category: "YouTube",
    cover: cover("pin-board-youtube-thumbnails", "Investigation pin-board style YouTube thumbnail"),
    summary: "A detective pin-board visual series built for true-crime storytelling.",
    deliverables: ["YouTube thumbnail series", "Photo compositing"],
    tools: [PS],
    gallery: gallery("pin-board-youtube-thumbnails", "Pin-board thumbnail", [
      [1600, 900], [1600, 900], [1200, 675],
    ]),
    externalUrl: `${BEHANCE}/235928195/Pin-Board-YouTube-Thumbnail-Design`,
  },
  {
    slug: "youtube-thumbnails-client-work",
    title: "YouTube Thumbnails — Client Work",
    client: "Various creators",
    category: "YouTube",
    cover: cover("youtube-thumbnails-client-work", "Grid of bold YouTube thumbnails for creators"),
    summary: "High-contrast thumbnails for creators covering social platforms and online income.",
    deliverables: ["YouTube thumbnails", "Photo manipulation", "Iconography"],
    tools: [PS],
    gallery: gallery("youtube-thumbnails-client-work", "Client thumbnail", [
      [1600, 1251], [1600, 900], [1600, 900], [1600, 900], [1600, 900], [1600, 900],
    ]),
    externalUrl: `${BEHANCE}/180276185/YouTube-Thumbnail-design-For-Clients`,
  },
  {
    slug: "social-media-ad-design",
    title: "Social Media Ad Design — Courses",
    category: "Social Media",
    cover: cover("social-media-ad-design", "Purple social media ad collage for online courses"),
    summary: "Bangla ad creatives promoting freelancing courses and e-books.",
    deliverables: ["Facebook & Instagram ads", "Bangla headline design", "Campaign set"],
    tools: [PS],
    gallery: gallery("social-media-ad-design", "Course ad creative", [
      [1600, 1251], [1600, 1600], [1600, 1600], [1600, 1600], [1600, 1600], [1600, 1600],
    ]),
    externalUrl: `${BEHANCE}/185901279/Social-Media-Ad-Design`,
  },
  {
    slug: "food-social-media-banners",
    title: "Food Social Media Banners",
    category: "Social Media",
    cover: cover("food-social-media-banners", "Burger and food social media post designs"),
    summary: "Appetite-first promotional posts for burgers, biryani and honey.",
    deliverables: ["Instagram posts", "Offer banners", "Product cut-outs"],
    tools: [PS, AI],
    gallery: gallery("food-social-media-banners", "Food promotion post", [
      [1600, 1018], [1600, 1600], [1600, 1600], [1600, 1600], [1600, 1600], [1600, 1600],
    ]),
    externalUrl: `${BEHANCE}/161868651/Food-Social-Media-Banner-Design`,
  },
  {
    slug: "minimal-instagram-ads",
    title: "Minimal Instagram Ads — Audio",
    category: "Advertising",
    cover: cover("minimal-instagram-ads", "Minimal product ads for headphones and earbuds"),
    summary: "Clean, product-led ads for headphones and wireless earbuds.",
    deliverables: ["Instagram ads", "Product layouts", "Feature callouts"],
    tools: [PS],
    gallery: gallery("minimal-instagram-ads", "Audio product ad", [
      [1600, 1251], [1600, 1680], [1600, 1680], [1600, 1680], [1600, 1680],
    ]),
    externalUrl: `${BEHANCE}/163051171/Minimal-social-media-banner-design-Instagram-ads`,
  },
  {
    slug: "gaming-youtube-thumbnails",
    title: "Gaming YouTube Thumbnails",
    category: "YouTube",
    cover: cover("gaming-youtube-thumbnails", "Collage of gaming YouTube thumbnails"),
    summary: "Expressive, story-driven thumbnails for gaming and entertainment videos.",
    deliverables: ["YouTube thumbnails", "Character compositing"],
    tools: [PS],
    gallery: gallery("gaming-youtube-thumbnails", "Gaming thumbnail", [
      [1200, 939], [1600, 900], [1600, 900], [1600, 900], [1600, 900],
    ]),
    externalUrl: `${BEHANCE}/164490061/Gaming-YouTube-Thumbnails`,
  },
  {
    slug: "youtube-thumbnails-set-2",
    title: "Educational YouTube Thumbnails",
    category: "YouTube",
    cover: cover("youtube-thumbnails-set-2", "Bangla educational YouTube thumbnails"),
    summary: "Bilingual thumbnails for HSC/SSC lessons and tech tips.",
    deliverables: ["YouTube thumbnails", "Bangla typography", "Series templates"],
    tools: [PS, AI],
    gallery: gallery("youtube-thumbnails-set-2", "Educational thumbnail", [
      [1600, 1251], [1600, 904], [1600, 900], [1600, 900], [1600, 900], [1600, 900],
    ]),
    externalUrl: `${BEHANCE}/159562309/YouTube-Thumbnails-Channel-Banner-Set-2`,
  },
  {
    slug: "gadget-social-media-posts",
    title: "Gadget Social Media Posts",
    category: "E-commerce",
    cover: cover("gadget-social-media-posts", "Social media post designs for gadgets"),
    summary: "Product posts for smartwatches, earbuds and phones with clear pricing space.",
    deliverables: ["Product posts", "Spec layouts", "Price tags"],
    tools: [PS],
    gallery: gallery("gadget-social-media-posts", "Gadget product post", [
      [1600, 1067], [1600, 1600], [1600, 1680], [1600, 1638], [1600, 1673],
    ]),
    externalUrl: `${BEHANCE}/157310653/Gadget-social-media-post-design`,
  },
  {
    slug: "travel-instagram-post-design",
    title: "Travel & Real-Estate Instagram Posts",
    category: "Advertising",
    cover: cover("travel-instagram-post-design", "Travel package Instagram post for Sajek Valley"),
    summary: "Offer-driven posts for travel packages, study abroad and property listings.",
    deliverables: ["Instagram posts", "Offer layouts"],
    tools: [PS, AI],
    gallery: gallery("travel-instagram-post-design", "Instagram post", [
      [1600, 1067], [1600, 1067], [1600, 1067], [1600, 1600], [1600, 1067],
    ]),
    externalUrl: `${BEHANCE}/157931137/Social-Media-Banner-Design-Instagram-Post`,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Every image across all projects, for the animated showcase. */
export function showcaseImages(): (ProjectImage & { slug: string })[] {
  return projects.flatMap((p) => p.gallery.map((g) => ({ ...g, slug: p.slug })));
}
