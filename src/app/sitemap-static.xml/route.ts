import { buildUrlsetXml, staticSegmentUrls, xmlResponse } from "@/lib/sitemap-builder";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const urls = await staticSegmentUrls();
  return xmlResponse(buildUrlsetXml(urls, "static"));
}
