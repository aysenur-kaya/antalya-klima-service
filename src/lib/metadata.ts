import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Sayfanın gerçek yolu (OG url için), örn. "/muratpasa/foo-klima-servisi" */
  path: string;
  /** Canonical farklı ise (alias sayfalar); yoksa path ile aynı kabul edilir */
  canonicalPath?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Antalya Servisi",
} as const;

function normalizePath(p: string): string {
  const withSlash = p.startsWith("/") ? p : `/${p}`;
  return withSlash.replace(/\/+/g, "/") || "/";
}

/**
 * Canonical, Open Graph, Twitter ve robots alanlarını tek yerden üretir.
 */
export function buildMetadata({
  title,
  description,
  path,
  canonicalPath,
  type = "website",
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const pagePath = normalizePath(path);
  const canonPath = normalizePath(canonicalPath ?? path);
  const pageUrl = `${SITE_URL}${pagePath}`;
  const canonicalUrl = `${SITE_URL}${canonPath}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type,
      locale: "tr_TR",
      url: pageUrl,
      siteName: "Antalya Servisi",
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
