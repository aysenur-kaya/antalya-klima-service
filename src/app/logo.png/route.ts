import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "400px",
          height: "100px",
          background: "#111111",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#C81E1E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            flexShrink: 0,
          }}
        >
          A
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "white", fontSize: "22px", fontWeight: "bold", lineHeight: 1.2 }}>
            Antalya <span style={{ color: "#C81E1E" }}>Servisi</span>
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "12px" }}>
            Klima &amp; Beyaz Eşya Teknik Servis
          </span>
        </div>
      </div>
    ),
    { width: 400, height: 100 }
  );
}
