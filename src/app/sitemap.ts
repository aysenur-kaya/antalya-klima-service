import { MetadataRoute } from "next";
import { 
  ilceler, 
  klimaMarkalari, 
  beyazEsyaMarkalari 
} from "@/lib/data";

const baseUrl = "https://antalya-klima-service.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Ana Sayfa
  routes.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // 2. Ana Hizmet Sayfaları
  const mainServices = [
    "klima-servisi",
    "beyaz-esya-servisi",
    "klima-bakim-servisi",
    "klima-tamir-servisi",
    "klima-montaj-servisi",
    "klima-gaz-dolumu-servisi",
    "klima-ariza-servisi",
    "camasir-makinesi-servisi",
    "bulasik-makinesi-servisi",
    "buzdolabi-servisi",
    "firin-servisi",
    "derin-dondurucu-servisi",
    "kurutma-makinesi-servisi"
  ];

  mainServices.forEach((service) => {
    routes.push({
      url: `${baseUrl}/antalya-${service}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    // Add generic ones
    routes.push({
      url: `${baseUrl}/${service}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // 3. Marka Sayfaları (Antalya Geneli)
  klimaMarkalari.forEach((brand) => {
    routes.push({
      url: `${baseUrl}/antalya/${brand.slug}-klima-servisi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  beyazEsyaMarkalari.forEach((brand) => {
    routes.push({
      url: `${baseUrl}/antalya/${brand.slug}-beyaz-esya-servisi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // 4. İlçe Sayfaları (Klima ve Beyaz Eşya)
  ilceler.forEach((ilce) => {
    routes.push({
      url: `${baseUrl}/${ilce.slug}-klima-servisi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    routes.push({
      url: `${baseUrl}/${ilce.slug}-beyaz-esya-servisi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // 5. Mahalle Sayfaları (İlçe Bazlı Sadece Genel Servis)
    // Limits the total URLs generated to avoid timeout and 50k limit issues
    ilce.mahalleler.forEach((mahalle) => {
      routes.push({
        url: `${baseUrl}/${ilce.slug}/${mahalle.slug}-klima-servisi`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
      routes.push({
        url: `${baseUrl}/${ilce.slug}/${mahalle.slug}-beyaz-esya-servisi`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return routes;
}
