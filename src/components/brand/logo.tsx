import type { SVGProps } from "react";

/**
 * Faithful reproduction of the supplied logo (public/brand/pixel-kitz-logo-original.svg):
 * identical mark geometry, colors and Inter SemiBold wordmark positioning — only the
 * dark background rectangle is omitted so the logo sits on the page background.
 */

export const MARK_PATHS = [
  "M193.51,102.35v24.44a21,21,0,0,1-20.93,20.93H147.3V136.36h25.28a8.88,8.88,0,0,0,1.15-.07l-24.59-24.58,8.32-9.36h.07L182.15,127V102.35Z",
  "M199.78,102.35v24.44a21,21,0,0,0,20.93,20.93H246V136.36H220.71a8.88,8.88,0,0,1-1.15-.07l24.59-24.58-8.32-9.36h-.07L211.14,127V102.35Z",
  "M199.78,199.54V175.1a21,21,0,0,1,20.93-20.93H246v11.36H220.71a8.88,8.88,0,0,0-1.15.07l24.59,24.58-8.32,9.36h-.07l-24.62-24.62v24.62Z",
  "M193.51,199.54V175.1a21,21,0,0,0-20.93-20.93H147.3v11.36h25.28a8.88,8.88,0,0,1,1.15.07l-24.59,24.58,8.32,9.36h.07l24.62-24.62v24.62Z",
] as const;

export const BRAND = { light: "#E9E7E9", red: "#D9453E", dark: "#171717" } as const;

type Props = SVGProps<SVGSVGElement> & { title?: string };

export function Logo({ title = "Pixel Kitz Digital", ...props }: Props) {
  return (
    <svg viewBox="145 99 366 108" role="img" aria-label={title} {...props}>
      {MARK_PATHS.map((d) => (
        <path key={d} d={d} fill={BRAND.light} />
      ))}
      <circle cx="196.4" cy="151.58" r="8.91" fill={BRAND.red} />
      <g
        fill={BRAND.light}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontWeight: 600, fontSize: "53.74px" }}
      >
        <text x="262.39" y="145.64">
          Pixel KitZ
        </text>
        <text x="262.17" y="191.72">
          Digital
        </text>
      </g>
    </svg>
  );
}

export function LogoMark({ title, ...props }: Props) {
  return (
    <svg viewBox="145 100 103 102" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} {...props}>
      {MARK_PATHS.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
      <circle cx="196.4" cy="151.58" r="8.91" fill={BRAND.red} />
    </svg>
  );
}
