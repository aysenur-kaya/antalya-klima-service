import type { Brand, Ilce, Mahalle } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { getServicePageBySlug } from "@/lib/services";
import { isIndexableNeighborhood } from "@/lib/neighborhood-seo";

export type CatchAllParsedLike = {
  ilce: Ilce | undefined;
  mahalle: Mahalle | undefined;
  marka: Brand | undefined;
  serviceType: "klima" | "beyaz-esya";
};

function normalizeRel(path: string): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/+/g, "/") || "/";
}

/**
 * Catch-all landing sayfalarında metadata ile birebir aynı indeksleme kararı.
 * FAQ JSON-LD ve diğer işaretler için tek kaynak.
 */
export function computeCatchAllIndexing(
  parsed: CatchAllParsedLike,
  slugSegments: string[],
  slugPath: string
): {
  noindex: boolean;
  /** buildMetadata `path` argümanı */
  pagePath: string;
  /** buildMetadata `canonicalPath`; kendisi ile aynıysa undefined döner */
  canonicalPath?: string;
} {
  const { ilce, mahalle, marka, serviceType } = parsed;
  const pagePath = normalizeRel(slugPath);
  const pageUrl = `${SITE_URL}${pagePath}`;

  let canonicalUrl: string;

  if (!ilce && !mahalle && marka) {
    canonicalUrl = `${SITE_URL}/servis/${marka.slug}-${serviceType}-servisi`;
  } else if (!ilce && !mahalle && !marka) {
    const isAntalyaLevel =
      (slugSegments.length === 1 && slugSegments[0].startsWith("antalya-")) ||
      (slugSegments.length === 2 && slugSegments[0] === "antalya");

    if (!isAntalyaLevel) {
      const hizmetlerPage = getServicePageBySlug(slugPath);
      canonicalUrl = hizmetlerPage
        ? `${SITE_URL}/hizmetler/${hizmetlerPage.slug}`
        : `${SITE_URL}/${slugPath}`;
    } else {
      canonicalUrl = `${SITE_URL}/${slugPath}`;
    }
  } else {
    canonicalUrl = `${SITE_URL}/${slugPath}`;
  }

  const canonicalMismatch = canonicalUrl !== pageUrl;
  const lowPriorityNeighborhood = Boolean(
    mahalle && ilce && !isIndexableNeighborhood(ilce, mahalle)
  );
  /** Mahalle + marka: genelde ince / tekrar eden niyet; indeks dışı bırak */
  const thinNeighborhoodBrand = Boolean(mahalle && marka);

  const noindex = canonicalMismatch || lowPriorityNeighborhood || thinNeighborhoodBrand;

  const canonicalRel = normalizeRel(canonicalUrl.replace(SITE_URL, "") || "/");

  return {
    noindex,
    pagePath,
    canonicalPath: canonicalRel !== pagePath ? canonicalRel : undefined,
  };
}
