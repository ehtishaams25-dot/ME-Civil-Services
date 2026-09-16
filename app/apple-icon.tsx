import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1624",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
        <path d="M4 14.5 16 5l12 9.5" stroke="#f5f3ee" strokeWidth="1.6" />
        <path d="M7.5 12v15h17V12" stroke="#f5f3ee" strokeWidth="1.6" />
        <path d="M11.5 27v-8h9v8" stroke="#f5f3ee" strokeWidth="1.6" />
      </svg>
    </div>,
    size,
  );
}
