import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTALoader from "@/components/layout/MobileCTALoader";
import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

const systemFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

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
  // Tüm schema değerleri CONTACT_INFO'dan türetilir.
  // Gerçek telefon/adres girildiğinde otomatik tüm schema'lara yansır.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": CONTACT_INFO.name,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`,
      "width": 400,
      "height": 100,
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HVACBusiness"],
    "@id": `${SITE_URL}/#local-business`,
    "name": `${CONTACT_INFO.name} - Klima ve Beyaz Eşya Teknik Servisi`,
    "image": `${SITE_URL}/og-image.jpg`,
    "url": SITE_URL,
    "telephone": CONTACT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      // TODO: Gerçek sokak adresi girildiğinde burayı güncelleyin
      "streetAddress": CONTACT_INFO.addressFull,
      "addressLocality": CONTACT_INFO.city,
      "addressRegion": CONTACT_INFO.city,
      "postalCode": "07000",
      "addressCountry": "TR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8841,
      "longitude": 30.7056,
    },
    "areaServed": {
      "@type": "City",
      "name": "Antalya",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      "opens": "08:30",
      "closes": "19:30",
    },
  };

  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-brand-light text-brand-dark flex flex-col"
        style={{ fontFamily: systemFontStack }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTALoader />
      </body>
    </html>
  );
}
