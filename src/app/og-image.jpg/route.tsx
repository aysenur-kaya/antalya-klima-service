import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            background: "#C81E1E",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "16px",
            background: "#C81E1E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "32px",
          }}
        >
          A
        </div>

        {/* Title */}
        <div
          style={{
            color: "white",
            fontSize: "64px",
            fontWeight: "bold",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Antalya <span style={{ color: "#C81E1E" }}>Servisi</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "#9CA3AF",
            fontSize: "28px",
            marginBottom: "40px",
          }}
        >
          Klima &amp; Beyaz Eşya Teknik Servisi
        </div>

        {/* Badge */}
        <div
          style={{
            background: "#C81E1E",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            padding: "10px 24px",
            borderRadius: "999px",
          }}
        >
          Antalya Geneli Aynı Gün Servis
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "#4B5563",
            fontSize: "18px",
          }}
        >
          antalya-klima-servis.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
