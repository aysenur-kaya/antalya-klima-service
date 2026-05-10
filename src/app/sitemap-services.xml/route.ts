import { buildUrlsetXml, servicesSegmentUrls, xmlResponse } from "@/lib/sitemap-builder";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(buildUrlsetXml(servicesSegmentUrls()));
}
