import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import { ilceler } from "@/lib/data";
import type { FaqItem } from "@/lib/faqs";

/** Sokak adresi yok; yalnızca şehir düzeyi */
export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: CONTACT_INFO.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 400,
      height: 100,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_INFO.phone,
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
  };
}

function areaServedList(): Array<Record<string, unknown>> {
  const city: Record<string, unknown> = {
    "@type": "City",
    name: "Antalya",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Antalya",
      containedInPlace: {
        "@type": "Country",
        name: "Turkey",
      },
    },
  };
  const districts = ilceler.map((ilce) => ({
    "@type": "AdministrativeArea",
    name: `${ilce.name}, Antalya`,
  }));
  return [city, ...districts];
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HVACBusiness"],
    "@id": `${SITE_URL}/#local-business`,
    name: `${CONTACT_INFO.name} - Klima ve Beyaz Eşya Teknik Servisi`,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT_INFO.city,
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.8841,
      longitude: 30.7056,
    },
    areaServed: areaServedList(),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:30",
      closes: "19:30",
    },
  };
}

export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: CONTACT_INFO.name,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${SITE_URL}${it.path.startsWith("/") ? it.path : `/${it.path}`}`,
    })),
  };
}

export function buildServiceSchema(args: {
  name: string;
  description: string;
  areaName: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#local-business`,
      name: CONTACT_INFO.name,
      telephone: CONTACT_INFO.phone,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: args.areaName,
    },
  };
}

export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(args: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}${args.path.startsWith("/") ? args.path : `/${args.path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    inLanguage: "tr-TR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    image: `${SITE_URL}/og-image.jpg`,
  };
}
