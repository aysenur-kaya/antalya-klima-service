import { MetadataRoute } from "next";
import { ilceler, klimaMarkalari, beyazEsyaMarkalari } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { allServicePages, klimaServicePages } from "@/lib/services";

const LAST_MODIFIED = new Date("2024-05-09");

// ---------------------------------------------------------------------------
// Segment map
// Next.js generates /sitemap/[id].xml per segment and auto-creates the
// /sitemap.xml index that lists all of them. robots.ts can keep pointing to
// /sitemap.xml without any change.
// ---------------------------------------------------------------------------
const SEGMENT = {
  STATIC: 0,       // hub, directory, legal
  SERVICES: 1,     // /hizmetler/* + /antalya-* geo-landings
  DISTRICTS: 2,    // /[ilce]-* landings + /bolgeler/* directory + pricing
  NEIGHBORHOODS: 3, // /[ilce]/[mahalle]-* landings
  BRANDS: 4,       // /servis/* canonical brand pages
} as const;

export function generateSitemaps() {
  return Object.values(SEGMENT).map((id) => ({ id }));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
type Frequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function entry(
  path: string,
  priority: number,
  changeFrequency: Frequency = "weekly"
): MetadataRoute.Sitemap[number] {
  return { url: `${SITE_URL}${path}`, lastModified: LAST_MODIFIED, changeFrequency, priority };
}

// ---------------------------------------------------------------------------
// Antalya-level landing suffixes (canonical = themselves, not /hizmetler/).
// Pure service suffixes without a location prefix are excluded here because
// those pages canonicalize to /hizmetler/* and would create duplicate signals.
// ---------------------------------------------------------------------------
const ANTALYA_LANDING_SUFFIXES = Array.from(
  new Set([
    ...allServicePages.map((s) => s.landingSlug),
    // SERVICE_MAP entries not covered by allServicePages
    "klima-ariza-servisi",
    "bulasik-makinesi-servisi",
    "firin-servisi",
    "derin-dondurucu-servisi",
    "kurutma-makinesi-servisi",
  ])
);

// Highest-intent ilçe×service combinations. All have canonical = themselves.
// Omitting niche combinations keeps the district segment lean and avoids
// thin content signals from low-volume service+district pairs.
const DISTRICT_SERVICE_SUFFIXES = [
  "klima-servisi",
  "klima-bakim-servisi",
  "klima-tamir-servisi",
  "beyaz-esya-servisi",
  "buzdolabi-servisi",
  "camasir-makinesi-servisi",
];

// ---------------------------------------------------------------------------
// Segment builders
// ---------------------------------------------------------------------------
function staticSegment(): MetadataRoute.Sitemap {
  return [
    entry("/", 1.0),
    entry("/antalya", 0.9),
    entry("/hizmetler", 0.9),
    entry("/servis", 0.9),
    entry("/bolgeler", 0.8),
    entry("/klima-markalari", 0.7, "monthly"),
    entry("/beyaz-esya-markalari", 0.7, "monthly"),
    entry("/iletisim", 0.7, "monthly"),
    entry("/kvkk", 0.4, "monthly"),
    entry("/gizlilik-politikasi", 0.4, "monthly"),
    entry("/kullanim-sartlari", 0.4, "monthly"),
  ];
}

function servicesSegment(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Editorial service pages — authoritative canonical targets for their topics
  for (const service of allServicePages) {
    urls.push(entry(`/hizmetler/${service.slug}`, 0.9));
  }

  // Antalya-level geo landings — distinct geo-modified searcher intent,
  // canonical = themselves (not consolidated to /hizmetler/)
  for (const suffix of ANTALYA_LANDING_SUFFIXES) {
    urls.push(entry(`/antalya-${suffix}`, 0.85));
  }

  return urls;
}

function districtsSegment(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const ilce of ilceler) {
    // District directory & pricing pages
    urls.push(entry(`/bolgeler/${ilce.slug}`, 0.7));
    urls.push(entry(`/bolgeler/${ilce.slug}/fiyatlar`, 0.6, "monthly"));

    for (const service of klimaServicePages.filter((s) => s.slug !== "klima-servisi")) {
      urls.push(entry(`/bolgeler/${ilce.slug}/fiyatlar/${service.slug}`, 0.5, "monthly"));
    }

    // High-intent ilçe landing pages (canonical = themselves)
    for (const suffix of DISTRICT_SERVICE_SUFFIXES) {
      urls.push(entry(`/${ilce.slug}-${suffix}`, 0.8));
    }
  }

  return urls;
}

function neighborhoodsSegment(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const ilce of ilceler) {
    for (const mahalle of ilce.mahalleler) {
      urls.push(entry(`/${ilce.slug}/${mahalle.slug}-klima-servisi`, 0.6, "monthly"));
      urls.push(entry(`/${ilce.slug}/${mahalle.slug}-beyaz-esya-servisi`, 0.55, "monthly"));
    }
  }

  return urls;
}

function brandsSegment(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Authoritative brand pages — canonical targets for any brand-only catch-all pages.
  // /antalya/[brand]-* and /[brand]-* (without a district) are intentionally
  // EXCLUDED because those pages carry canonical → /servis/* and indexing them
  // separately would split authority between two URLs for identical intent.
  for (const brand of klimaMarkalari) {
    urls.push(entry(`/servis/${brand.slug}-klima-servisi`, 0.8));
  }
  for (const brand of beyazEsyaMarkalari) {
    urls.push(entry(`/servis/${brand.slug}-beyaz-esya-servisi`, 0.8));
  }

  return urls;
}

// ---------------------------------------------------------------------------
// Entry point — Next.js calls this once per segment ID
// ---------------------------------------------------------------------------
export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  switch (id) {
    case SEGMENT.STATIC:        return staticSegment();
    case SEGMENT.SERVICES:      return servicesSegment();
    case SEGMENT.DISTRICTS:     return districtsSegment();
    case SEGMENT.NEIGHBORHOODS: return neighborhoodsSegment();
    case SEGMENT.BRANDS:        return brandsSegment();
    default:                    return [];
  }
}
