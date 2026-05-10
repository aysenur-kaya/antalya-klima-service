import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Primary entry point: sitemap index referencing all five segments.
    // Individual segment URLs are also listed so crawlers can discover them
    // directly without following the index first.
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-static.xml`,
      `${SITE_URL}/sitemap-services.xml`,
      `${SITE_URL}/sitemap-districts.xml`,
      `${SITE_URL}/sitemap-neighborhoods.xml`,
      `${SITE_URL}/sitemap-brands.xml`,
    ],
  };
}
