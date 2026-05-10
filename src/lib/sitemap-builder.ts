/**
 * Sitemap builder utilities and URL generators for each segment.
 *
 * Architecture:
 *   /sitemap.xml              → sitemap index (app/sitemap.xml/route.ts)
 *   /sitemap-static.xml       → hub, directory, legal pages
 *   /sitemap-services.xml     → /hizmetler/* + /antalya-* geo landings
 *   /sitemap-districts.xml    → ilçe landings + /bolgeler/* + pricing
 *   /sitemap-neighborhoods.xml → mahalle landings
 *   /sitemap-brands.xml       → /servis/* canonical brand pages
 *
 * Canonical alignment:
 *   - /antalya/[brand]-* and /[brand]-* (no district) are EXCLUDED because
 *     those pages carry canonical → /servis/* — including them would submit
 *     non-canonical URLs to search engines.
 *   - Pure service-suffix pages (e.g. /klima-servisi) are EXCLUDED because
 *     they carry canonical → /hizmetler/*.
 */

import { SITE_URL } from "@/lib/constants";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";
import { allServicePages, klimaServicePages } from "@/lib/services";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const SITEMAP_LAST_MODIFIED = "2024-05-09";

export const SEGMENT_URLS = {
  static:        `${SITE_URL}/sitemap-static.xml`,
  services:      `${SITE_URL}/sitemap-services.xml`,
  districts:     `${SITE_URL}/sitemap-districts.xml`,
  neighborhoods: `${SITE_URL}/sitemap-neighborhoods.xml`,
  brands:        `${SITE_URL}/sitemap-brands.xml`,
} as const;

// Antalya-level geo landings: canonical = themselves (distinct geo-modified
// intent from /hizmetler/* editorial pages).
const ANTALYA_LANDING_SUFFIXES = Array.from(
  new Set([
    ...allServicePages.map((s) => s.landingSlug),
    "klima-ariza-servisi",
    "bulasik-makinesi-servisi",
    "firin-servisi",
    "derin-dondurucu-servisi",
    "kurutma-makinesi-servisi",
  ])
);

// Highest-intent ilçe×service pairs. All canonical to themselves.
const DISTRICT_SERVICE_SUFFIXES = [
  "klima-servisi",
  "klima-bakim-servisi",
  "klima-tamir-servisi",
  "beyaz-esya-servisi",
  "buzdolabi-servisi",
  "camasir-makinesi-servisi",
];

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

interface UrlEntry {
  path: string;
  priority: number;
  changefreq?: string;
}

function u(path: string, priority: number, changefreq = "weekly"): UrlEntry {
  return { path, priority, changefreq };
}

function toUrlTag({ path, priority, changefreq = "weekly" }: UrlEntry): string {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${path}</loc>`,
    `    <lastmod>${SITEMAP_LAST_MODIFIED}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(2)}</priority>`,
    "  </url>",
  ].join("\n");
}

export function buildUrlsetXml(entries: UrlEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(toUrlTag),
    "</urlset>",
  ].join("\n");
}

export function buildSitemapIndexXml(urls: string[]): string {
  const items = urls.map(
    (loc) =>
      `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${SITEMAP_LAST_MODIFIED}</lastmod>\n  </sitemap>`
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...items,
    "</sitemapindex>",
  ].join("\n");
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

// ---------------------------------------------------------------------------
// URL generators — one per sitemap segment
// ---------------------------------------------------------------------------

export function staticSegmentUrls(): UrlEntry[] {
  return [
    u("/", 1.0),
    u("/antalya", 0.9),
    u("/hizmetler", 0.9),
    u("/servis", 0.9),
    u("/bolgeler", 0.8),
    u("/klima-markalari", 0.7, "monthly"),
    u("/beyaz-esya-markalari", 0.7, "monthly"),
    u("/iletisim", 0.7, "monthly"),
    u("/kvkk", 0.4, "monthly"),
    u("/gizlilik-politikasi", 0.4, "monthly"),
    u("/kullanim-sartlari", 0.4, "monthly"),
  ];
}

export function servicesSegmentUrls(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  // Editorial service pages — authoritative canonical source for each topic
  for (const service of allServicePages) {
    entries.push(u(`/hizmetler/${service.slug}`, 0.9));
  }

  // Antalya-level geo landings — unique canonical, high commercial intent
  for (const suffix of ANTALYA_LANDING_SUFFIXES) {
    entries.push(u(`/antalya-${suffix}`, 0.85));
  }

  return entries;
}

export function districtsSegmentUrls(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  for (const ilce of ilceler) {
    // District directory & pricing
    entries.push(u(`/bolgeler/${ilce.slug}`, 0.7));
    entries.push(u(`/bolgeler/${ilce.slug}/fiyatlar`, 0.6, "monthly"));

    for (const service of klimaServicePages.filter((s) => s.slug !== "klima-servisi")) {
      entries.push(u(`/bolgeler/${ilce.slug}/fiyatlar/${service.slug}`, 0.5, "monthly"));
    }

    // High-intent ilçe landing pages
    for (const suffix of DISTRICT_SERVICE_SUFFIXES) {
      entries.push(u(`/${ilce.slug}-${suffix}`, 0.8));
    }
  }

  return entries;
}

export function neighborhoodsSegmentUrls(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  for (const ilce of ilceler) {
    for (const mahalle of ilce.mahalleler) {
      entries.push(u(`/${ilce.slug}/${mahalle.slug}-klima-servisi`, 0.6, "monthly"));
      entries.push(u(`/${ilce.slug}/${mahalle.slug}-beyaz-esya-servisi`, 0.55, "monthly"));
    }
  }

  return entries;
}

export function brandsSegmentUrls(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  // Authoritative brand pages — canonical targets for all brand-level traffic.
  // /antalya/[brand]-* and /[brand]-* (no district) are intentionally excluded:
  // those catch-all pages set canonical → /servis/* so submitting them would
  // ask Google to index URLs we've already told it not to treat as primary.
  for (const brand of klimaMarkalari) {
    entries.push(u(`/servis/${brand.slug}-klima-servisi`, 0.8));
  }
  for (const brand of beyazEsyaMarkalari) {
    entries.push(u(`/servis/${brand.slug}-beyaz-esya-servisi`, 0.8));
  }

  return entries;
}
