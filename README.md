# Pixel Kitz Digital — Website

Production website for **Pixel Kitz Digital**, a 360° creative, technology and digital growth agency.
Built with Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS 4.

Source code: https://github.com/armanhasan0013-coder/pixel-kitz-digital

## Use this project on any computer

You need [Node.js](https://nodejs.org) 20 or newer and [Git](https://git-scm.com/downloads).

```bash
git clone https://github.com/armanhasan0013-coder/pixel-kitz-digital.git
cd pixel-kitz-digital
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev                  # http://localhost:3000
```

No Git? Use **Code → Download ZIP** on the GitHub page, unzip, then run the last three commands in the folder.
The site runs with an empty `.env.local`; fill in contact details and an inquiry channel when you have them.

To get the latest version later: `git pull`, then `npm install`.

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npx tsc --noEmit`.

## Automatic GitHub updates

On the owner's computer, `scripts/auto-sync.ps1` commits and pushes every change to GitHub. Claude Code runs it
through a `Stop` hook after each editing turn, so the repository always matches the latest edit. After each
successful push it also redeploys the live site (`vercel deploy --prod`, in the background). Run it by hand
after manual edits: `powershell -ExecutionPolicy Bypass -File scripts\auto-sync.ps1`.
Files in `.gitignore` (`.env.local`, `node_modules`, `.next`, `.data`) are never uploaded.

## Where to edit things

| What | File |
| --- | --- |
| Contact details, socials, founder links, budget/timeline options | `src/config/site.ts` (+ env vars) |
| Services (4 pillars, 59 services, process steps) | `src/content/services.ts` |
| Digital Solutions catalog (pricing, availability, terms) | `src/content/solutions.ts` |
| Portfolio projects (10, selected from the founder's Behance) | `src/content/projects.ts` + images in `public/work/<slug>/` |
| Insights articles | `src/content/insights.ts` (`status: "sample"` → `"published"` when approved) |
| Legal drafts | `src/app/privacy`, `src/app/terms`, `src/app/delivery-refund-policy` |
| Design tokens (colors, type, motion) | `src/app/globals.css` |
| Logo | `src/components/brand/logo.tsx` (exact reproduction of `public/brand/pixel-kitz-logo-original.svg`) |

Every page, filter, sitemap entry and the inquiry form read from these files — no code changes needed to add a service or listing.

## Inquiry form

`POST /api/inquiry` validates on the server (Zod, shared with the client), rejects bots (honeypot + minimum fill time),
rate-limits per IP, then delivers through whichever channels are configured:

- **Resend email** — `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`
- **Webhook** — `INQUIRY_WEBHOOK_URL` (+ optional `INQUIRY_WEBHOOK_SECRET` sent as `X-Webhook-Secret`)
- **Local file** — `INQUIRY_STORE=file` writes `.data/inquiries.jsonl` (dev/self-hosted only)

The visitor sees a success message **only** when at least one channel confirms delivery. With nothing configured,
the API returns 503 and the form tells the visitor plainly that the message was not sent, with direct contact options.

The rate limiter is in-memory (per server instance). For multi-instance production, move it to a shared store
(e.g. Upstash Redis or Supabase).

## Design notes

- Palette derived from the logo: ink `#101014`, off-white `#EEECEE`/paper `#F6F4EF`, brand red `#D9453E`
  (accessible variants `#C93A33` for buttons with white text and `#F2665C` for small text on dark).
- Type: Geist (UI/display), Geist Mono (labels), Inter SemiBold (wordmark only — the logo's typeface).
- Signature graphic: the logo's four arms converge on the red dot — the four service pillars meeting at one focus.
  Pure SVG + CSS.
- Motion: CSS-only (scroll-driven reveals, load animations, magnetic buttons). All motion is disabled under
  `prefers-reduced-motion`; browsers without scroll-timeline support simply show content.

## Configuration checklist (before launch)

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain (drives canonical URLs, sitemap, OG tags)
- [ ] Verified business email, phone, WhatsApp number, address and legal entity name in env vars
- [ ] At least one inquiry delivery channel configured and tested on the deployed site
- [ ] Founder portrait added (`public/images/…`) and set in `siteConfig.founder.portrait`
- [ ] Real portfolio projects (with client permission) added to `src/content/projects.ts`
- [ ] Insights articles reviewed; set `status: "published"` (sample articles are `noindex` and excluded from the sitemap)
- [ ] Legal pages reviewed by a lawyer; all `[bracketed]` placeholders completed; update `legal.lastUpdated`
- [ ] Digital Solutions pricing approved (currently all "Request pricing")
- [ ] Company social profiles (if separate from the founder's) added to `siteConfig.social`
- [ ] Analytics/cookies — if added, update the Privacy Policy

## Deployment checklist (Vercel)

1. Push the repository to GitHub and import it in Vercel (framework preset: Next.js).
2. Add all env vars from `.env.example` for Production (and Preview if wanted). Don't use `INQUIRY_STORE=file` on Vercel.
3. Deploy a preview, submit a real test inquiry, confirm it arrives.
4. Connect the custom domain; confirm `/sitemap.xml` and `/robots.txt` show the real domain.
5. Submit the sitemap in Google Search Console.

Currently deployed (Vercel, free Hobby plan) at https://pixel-kitz-digital.vercel.app via `npx vercel deploy --prod`.
No paid service is connected and no inquiry delivery channel is configured yet. Redeploy after changes with the same command.

## Phase 2 roadmap

**Admin panel** — recommended: Supabase (Postgres + Auth + Row Level Security) with a protected `/admin` area.
Migrate `src/content/*.ts` to tables with the same shapes; store inquiries in an `inquiries` table (RLS: admins only)
in addition to email notification. Authentication via Supabase Auth with an admin role; all writes through server actions.

**Commerce** — add only with authorized products and a verified payment provider (Bangladesh: SSLCommerz/bKash/Nagad;
international: Stripe/Paddle where available). Planned tables: `orders`, `order_items`, `customers`, `invoices`,
`coupons`, `support_tickets`. The `Solution` type already carries `price`, `availability` and `options` for this.

**Bangla localization** — all copy lives in `src/content` and `src/config`; add `src/content/bn/*` and a `[locale]`
route segment (see Next.js internationalization guide) when ready.
