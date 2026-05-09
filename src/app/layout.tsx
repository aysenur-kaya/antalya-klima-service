import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTALoader from "@/components/layout/MobileCTALoader";
import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Antalya Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    template: "%s | Antalya Servisi"
  },
  description: "Antalya bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek. 7/24 profesyonel ekip ve uzman çözümler.",
  keywords: ["antalya klima servisi", "antalya beyaz eşya servisi", "klima tamiri", "buzdolabı servisi", "çamaşır makinesi servisi"],
  authors: [{ name: "Antalya Servisi" }],
  creator: "Antalya Servisi",
  publisher: "Antalya Servisi",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Antalya Servisi",
    title: "Antalya Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    description: "Antalya bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antalya Servisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antalya Servisi - Klima ve Beyaz Eşya Teknik Servisi",
    description: "Antalya bölgesinde klima ve beyaz eşya servisi için aynı gün garantili teknik destek.",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Antalya Servisi",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Antalya Servisi - Teknik Servis",
    "image": `${SITE_URL}/og-image.jpg`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": CONTACT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Antalya Geneli Hizmet",
      "addressLocality": "Antalya",
      "addressRegion": "Antalya",
      "postalCode": "07000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8841,
      "longitude": 30.7056
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:30",
      "closes": "19:30"
    }
  };

  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-brand-light text-brand-dark flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTALoader />
      </body>
    </html>
  );
}
