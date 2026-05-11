/**
 * Catch-all route için hizmet eşlemesi (URL son segmenti → servis tipi).
 * src/app/[...slug]/page.tsx ile aynı liste; tek kaynak olması için burada tutulur.
 */

export type CatchAllServiceEntry = {
  suffix: string;
  type: "klima" | "beyaz-esya";
  name: string;
};

export const CATCH_ALL_SERVICE_MAP: CatchAllServiceEntry[] = [
  { suffix: "klima-bakim-servisi", type: "klima", name: "Klima Bakım Servisi" },
  { suffix: "klima-tamir-servisi", type: "klima", name: "Klima Tamir Servisi" },
  { suffix: "klima-montaj-servisi", type: "klima", name: "Klima Montaj Servisi" },
  { suffix: "klima-gaz-dolumu-servisi", type: "klima", name: "Klima Gaz Dolumu Servisi" },
  { suffix: "klima-gaz-dolumu", type: "klima", name: "Klima Gaz Dolumu Servisi" },
  { suffix: "klima-ariza-servisi", type: "klima", name: "Klima Arıza Servisi" },
  { suffix: "camasir-makinesi-servisi", type: "beyaz-esya", name: "Çamaşır Makinesi Servisi" },
  { suffix: "bulasik-makinesi-servisi", type: "beyaz-esya", name: "Bulaşık Makinesi Servisi" },
  { suffix: "buzdolabi-servisi", type: "beyaz-esya", name: "Buzdolabı Servisi" },
  { suffix: "firin-servisi", type: "beyaz-esya", name: "Fırın Servisi" },
  { suffix: "derin-dondurucu-servisi", type: "beyaz-esya", name: "Derin Dondurucu Servisi" },
  { suffix: "kurutma-makinesi-servisi", type: "beyaz-esya", name: "Kurutma Makinesi Servisi" },
  { suffix: "klima-servisi", type: "klima", name: "Klima Servisi" },
  { suffix: "beyaz-esya-servisi", type: "beyaz-esya", name: "Beyaz Eşya Servisi" },
];

export function matchCatchAllServiceFromLastSegment(lastPart: string): CatchAllServiceEntry | undefined {
  const withPrefix = CATCH_ALL_SERVICE_MAP.find((s) => lastPart.endsWith("-" + s.suffix));
  if (withPrefix) return withPrefix;
  return CATCH_ALL_SERVICE_MAP.find((s) => lastPart === s.suffix);
}

export function getServiceSuffixFromSlugSegments(slugSegments: string[]): string {
  if (!slugSegments.length) return "klima-servisi";
  const last = slugSegments[slugSegments.length - 1];
  const hit = matchCatchAllServiceFromLastSegment(last);
  return hit?.suffix ?? "klima-servisi";
}
