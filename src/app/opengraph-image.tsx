import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/brand/logo";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#101014",
          color: "#EEECEE",
          backgroundImage:
            "linear-gradient(to right, rgba(233,231,233,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,231,233,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="145 100 103 102">
            {MARK_PATHS.map((d) => (
              <path key={d} d={d} fill="#E9E7E9" />
            ))}
            <circle cx="196.4" cy="151.58" r="8.91" fill="#D9453E" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 34, fontWeight: 600, lineHeight: 1.05 }}>
            <span>Pixel KitZ</span>
            <span>Digital</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, letterSpacing: -3, lineHeight: 1, display: "flex", flexDirection: "column" }}>
            <span>Creative Thinking.</span>
            <span>Digital Execution.</span>
            <span style={{ color: "#A3A0A9" }}>Limitless Possibilities.</span>
          </div>
          <div style={{ marginTop: 36, fontSize: 22, color: "#A3A0A9", letterSpacing: 4, textTransform: "uppercase" }}>
            Ideas / Design / Digital Growth
          </div>
        </div>
      </div>
    ),
    size,
  );
}
