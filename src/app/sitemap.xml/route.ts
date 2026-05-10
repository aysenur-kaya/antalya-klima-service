import { buildSitemapIndexXml, xmlResponse, SEGMENT_URLS } from "@/lib/sitemap-builder";

export const dynamic = "force-static";

export function GET() {
  const xml = buildSitemapIndexXml(Object.values(SEGMENT_URLS));
  return xmlResponse(xml);
}
