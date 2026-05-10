import { MetadataRoute } from "next";
import { 
  ilceler, 
  klimaMarkalari, 
  beyazEsyaMarkalari 
} from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { allServicePages, klimaServicePages } from "@/lib/services";

const baseUrl = SITE_URL;
const lastModified = new Date("2024-05-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Ana Sayfa
  routes.push({
    url: `${baseUrl}/`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // 2. Ana Hizmet Sayfaları (Antalya Geneli)
  routes.push({
    url: `${baseUrl}/hizmetler`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  allServicePages.forEach((service) => {
    routes.push({
      url: `${baseUrl}/hizmetler/${service.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  const legacyServiceSlugs = [
    "klima-ariza-servisi",
    "bulasik-makinesi-servisi",
    "firin-servisi",
    "derin-dondurucu-servisi",
    "kurutma-makinesi-servisi"
  ];
  const mainServices = Array.from(new Set([...allServicePages.map((service) => service.landingSlug), ...legacyServiceSlugs]));

  mainServices.forEach((service) => {
    routes.push({
      url: `${baseUrl}/antalya-${service}`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // 3. Marka Sayfaları (Antalya Geneli)
  routes.push({
    url: `${baseUrl}/servis`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  klimaMarkalari.forEach((brand) => {
    routes.push({
      url: `${baseUrl}/servis/${brand.slug}-klima-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    routes.push({
      url: `${baseUrl}/antalya/${brand.slug}-klima-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  beyazEsyaMarkalari.forEach((brand) => {
    routes.push({
      url: `${baseUrl}/servis/${brand.slug}-beyaz-esya-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    routes.push({
      url: `${baseUrl}/antalya/${brand.slug}-beyaz-esya-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // 4. İlçe Sayfaları (Genel ve Servis Bazlı)
  ilceler.forEach((ilce) => {
    // İlçe Genel
    routes.push({
      url: `${baseUrl}/${ilce.slug}-klima-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    routes.push({
      url: `${baseUrl}/${ilce.slug}-beyaz-esya-servisi`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // İlçe + Ana Hizmetler (Opsiyonel: Sadece en önemli olanlar)
    const importantServices = ["klima-bakim-servisi", "klima-tamir-servisi", "buzdolabi-servisi", "camasir-makinesi-servisi"];
    importantServices.forEach(service => {
      routes.push({
        url: `${baseUrl}/${ilce.slug}-${service}`,
        lastModified: lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    // 5. Mahalle Sayfaları (Sadece Genel Servisler)
    ilce.mahalleler.forEach((mahalle) => {
      routes.push({
        url: `${baseUrl}/${ilce.slug}/${mahalle.slug}-klima-servisi`,
        lastModified: lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
      routes.push({
        url: `${baseUrl}/${ilce.slug}/${mahalle.slug}-beyaz-esya-servisi`,
        lastModified: lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  // 6. Bölgeler Dizini
  routes.push({
    url: `${baseUrl}/antalya`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  routes.push({
    url: `${baseUrl}/bolgeler`,
    lastModified: lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  ilceler.forEach((ilce) => {
    routes.push({
      url: `${baseUrl}/bolgeler/${ilce.slug}`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    routes.push({
      url: `${baseUrl}/bolgeler/${ilce.slug}/fiyatlar`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    });
    klimaServicePages
      .filter((service) => service.slug !== "klima-servisi")
      .forEach((service) => {
        routes.push({
          url: `${baseUrl}/bolgeler/${ilce.slug}/fiyatlar/${service.slug}`,
          lastModified: lastModified,
          changeFrequency: "monthly",
          priority: 0.5,
        });
      });
  });

  // 7. Statik Sayfalar
  const staticPages = ["kvkk", "gizlilik-politikasi", "kullanim-sartlari", "iletisim", "klima-markalari", "beyaz-esya-markalari"];
  staticPages.forEach(page => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return routes;
}
