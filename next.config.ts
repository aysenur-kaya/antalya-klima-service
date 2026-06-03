import type { NextConfig } from "next";

const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  // Mobil/LAN: telefondan http://192.168.x.x:3000 ile erişim
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.14",
    "192.168.1.31",
    ...extraDevOrigins,
  ],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/admin/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
