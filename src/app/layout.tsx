import type { Metadata } from "next";
import "./globals.css";
import ConditionalSiteChrome from "@/components/layout/ConditionalSiteChrome";
import { SITE_URL } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/schema";

const systemFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "İzmir Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    template: "%s | İzmir Servisi"
  },
  description: "İzmir bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek. 7/24 profesyonel ekip ve uzman çözümler.",
  keywords: ["izmir klima servisi", "izmir beyaz eşya servisi", "klima tamiri", "buzdolabı servisi", "çamaşır makinesi servisi"],
  authors: [{ name: "İzmir Servisi" }],
  creator: "İzmir Servisi",
  publisher: "İzmir Servisi",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "İzmir Servisi",
    title: "İzmir Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    description: "İzmir bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "İzmir Servisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İzmir Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    description: "İzmir bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "MwzSgDXu_x4ylgE8xGrHxqNSvXiBcHjx3A5rmBrA_S4",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildLocalBusinessSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-white text-brand-dark flex flex-col"
        style={{ fontFamily: systemFontStack }}
      >
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
