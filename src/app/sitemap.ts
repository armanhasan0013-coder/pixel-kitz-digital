import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/work", "/solutions", "/about", "/insights", "/contact", "/privacy", "/terms", "/delivery-refund-policy"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.6 })),
    ...solutions.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), priority: 0.6 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), priority: 0.6 })),
    // Sample (unapproved) articles are excluded until published.
    ...insights.filter((i) => i.status === "published").map((i) => ({ url: absoluteUrl(`/insights/${i.slug}`), lastModified: i.date, priority: 0.5 })),
  ];
}
