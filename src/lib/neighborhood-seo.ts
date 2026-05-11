import type { Ilce, Mahalle } from "@/lib/data";

/** Yüksek talep ilçeler: mahalle indeks limiti + sitemap fiyat detay filtresi ile uyumlu */
export const HIGH_PRIORITY_DISTRICT_SLUGS = new Set([
  "muratpasa",
  "konyaalti",
  "kepez",
  "alanya",
  "manavgat",
  "serik",
]);

export function isHighPriorityDistrict(ilceSlug: string): boolean {
  return HIGH_PRIORITY_DISTRICT_SLUGS.has(ilceSlug);
}

/**
 * Mahalle sayfası sitemap’e ve varsayılan index stratejisine dahil edilsin mi?
 * Diğer mahalleler açık kalır; metadata’da noindex uygulanır (catch-all içinde).
 */
export function isIndexableNeighborhood(ilce: Ilce, mahalle: Mahalle): boolean {
  const limit = HIGH_PRIORITY_DISTRICT_SLUGS.has(ilce.slug) ? 3 : 1;
  const idx = ilce.mahalleler.findIndex((m) => m.slug === mahalle.slug);
  if (idx === -1) return false;
  if (idx < limit) return true;
  if (/merkez/i.test(mahalle.slug) || /merkez/i.test(mahalle.name)) return true;
  return false;
}
