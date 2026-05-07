import antalyaData from "@/data/antalya.json";
import klimaData from "@/data/gemini-code-1778147632176.json";
import beyazEsyaData from "@/data/gemini-code-1778147674157.json";
import { slugify } from "./utils";

export interface Mahalle {
  name: string;
  slug: string;
}

export interface Ilce {
  name: string;
  slug: string;
  mahalleler: Mahalle[];
}

export interface Brand {
  name: string;
  slug: string;
  type: "klima" | "beyaz-esya";
}

// Transform Data
export const ilceler: Ilce[] = antalyaData.ilceler.map((ilce) => ({
  name: ilce.ilce,
  slug: slugify(ilce.ilce),
  mahalleler: ilce.mahalleler.map((mahalle) => ({
    name: mahalle,
    slug: slugify(mahalle),
  })),
}));

export const klimaMarkalari: Brand[] = klimaData.klima_markalari.map((marka) => ({
  name: marka,
  slug: slugify(marka),
  type: "klima"
}));

export const beyazEsyaMarkalari: Brand[] = beyazEsyaData.beyaz_esya_markalari.map((marka) => ({
  name: marka,
  slug: slugify(marka),
  type: "beyaz-esya"
}));

export const hizmetTipleri = [
  { name: "Klima Servisi", slug: "klima-servisi", type: "klima" },
  { name: "Beyaz Eşya Servisi", slug: "beyaz-esya-servisi", type: "beyaz-esya" },
];

export const allBrands = [...klimaMarkalari, ...beyazEsyaMarkalari];

// Export helpers to find objects by slug
export const getIlceBySlug = (slug: string) => ilceler.find((i) => i.slug === slug);
export const getMahalleBySlug = (ilceSlug: string, mahalleSlug: string) => {
  const ilce = getIlceBySlug(ilceSlug);
  return ilce?.mahalleler.find((m) => m.slug === mahalleSlug);
};
export const getBrandBySlug = (slug: string) => allBrands.find((b) => b.slug === slug);
export const getServiceBySlug = (slug: string) => hizmetTipleri.find((h) => h.slug === slug);
