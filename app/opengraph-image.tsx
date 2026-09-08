import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Ratatune — Harmonica Bend Accuracy";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "hsl(220, 20%, 8%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "hsl(160, 70%, 50%)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "block",
          }}
        >
          Ratatune
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "hsl(0, 0%, 95%)",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Finally hear whether</span>
          <span>
            your bends are{" "}
            <span style={{ color: "hsl(160, 70%, 50%)" }}>
              actually in tune.
            </span>
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "hsl(0, 0%, 65%)",
            textAlign: "center",
            lineHeight: 1.4,
            display: "block",
          }}
        >
          AI-powered harmonica bend accuracy
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}