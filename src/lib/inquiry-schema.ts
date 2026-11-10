import { z } from "zod";
import { siteConfig } from "@/config/site";
import { pillars } from "@/content/services";

/** Shared by the client form (instant feedback) and the API route (authoritative validation). */

const pillarIds = pillars.map((p) => p.id) as [string, ...string[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string().trim().max(200).pipe(z.email("Please enter a valid email address.")),
  phone: optionalText(30).refine((v) => !v || /^[+\d][\d\s()-]{5,29}$/.test(v), "Please enter a valid phone or WhatsApp number."),
  company: optionalText(120),
  category: z.enum(pillarIds, { error: "Please choose a service category." }),
  service: optionalText(160),
  budget: z.enum(siteConfig.inquiry.budgets as unknown as [string, ...string[]], { error: "Please choose a budget range." }),
  timeline: z.enum(siteConfig.inquiry.timelines as unknown as [string, ...string[]], { error: "Please choose a timeline." }),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(4000, "Please keep the description under 4,000 characters."),
  reference: optionalText(200),
  consent: z.literal(true, { error: "Please confirm you agree so we can respond." }),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

/** Anti-spam fields — validated separately so they never appear in user-facing errors. */
export const antiSpamSchema = z.object({
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().positive(),
});

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
