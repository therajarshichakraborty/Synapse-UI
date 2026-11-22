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
        background: "#0b0b0c",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 32 32">
        <path
          d="M20.5 10.5c-1-1-2.6-1.5-4.4-1.5-3 0-5 1.5-5 3.7 0 4.9 9.4 2.7 9.4 7 0 2.1-2 3.8-5.1 3.8-2 0-3.8-.7-4.9-1.9"
          fill="none"
          stroke="#ededef"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size,
  );
}
