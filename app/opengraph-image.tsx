import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1624",
        color: "#f5f3ee",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
          <path d="M4 14.5 16 5l12 9.5" stroke="#f5f3ee" strokeWidth="1.6" />
          <path d="M7.5 12v15h17V12" stroke="#f5f3ee" strokeWidth="1.6" />
          <path d="M11.5 27v-8h9v8" stroke="#f5f3ee" strokeWidth="1.6" />
        </svg>
        <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>M.E. Civil Services</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>
          Plumbing &amp; Painting, Executed With Precision.
        </div>
        <div style={{ display: "flex", marginTop: 36, width: 96, height: 2, background: "#b79a63" }} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(245,243,238,0.65)",
        }}
      >
        <div>{site.positioning}</div>
        <div style={{ color: "#b79a63" }}>{site.city}</div>
      </div>
    </div>,
    size,
  );
}
