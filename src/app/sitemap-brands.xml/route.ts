import { buildUrlsetXml, brandsSegmentUrls, xmlResponse } from "@/lib/sitemap-builder";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(buildUrlsetXml(brandsSegmentUrls(), "brands"));
}
