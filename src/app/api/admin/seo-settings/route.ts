export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { optionalBoolean, optionalString, requireString } from "@/lib/api/validation";

const DEFAULT_ID = "default";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const item = await prisma.seoSetting.findUnique({ where: { id: DEFAULT_ID } });
    if (!item) {
      return jsonError("SEO ayarları bulunamadı. npm run db:seed çalıştırın.", 404, "NOT_FOUND");
    }
    return jsonSuccess({ item });
  });
}

export async function PATCH(request: Request) {
  return runProtectedAdminRoute(async () => {
    const body = await parseJsonBody<Record<string, unknown>>(request);
    if (isJsonParseError(body)) return body;

    const data: Record<string, unknown> = {};

    if (body.siteTitle !== undefined) {
      const err = requireString(body.siteTitle, "Site başlığı", 2, 200);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.siteTitle = (body.siteTitle as string).trim();
    }
    if (body.metaDescription !== undefined) {
      const err = requireString(body.metaDescription, "Meta açıklama", 10, 5000);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.metaDescription = (body.metaDescription as string).trim();
    }
    if (body.canonicalUrl !== undefined) {
      const err = requireString(body.canonicalUrl, "Canonical URL", 8, 500);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.canonicalUrl = (body.canonicalUrl as string).trim();
    }
    if (body.googleVerification !== undefined) {
      data.googleVerification = optionalString(body.googleVerification, 200) ?? null;
    }
    const robotsIndex = optionalBoolean(body.robotsIndex);
    if (robotsIndex !== undefined) data.robotsIndex = robotsIndex;

    if (Object.keys(data).length === 0) {
      return jsonError("Güncellenecek alan yok.", 400, "VALIDATION");
    }

    const item = await prisma.seoSetting.upsert({
      where: { id: DEFAULT_ID },
      update: data,
      create: {
        id: DEFAULT_ID,
        siteTitle: (data.siteTitle as string) ?? "İzmir Servisi",
        metaDescription: (data.metaDescription as string) ?? "",
        canonicalUrl: (data.canonicalUrl as string) ?? "https://izmir-klima-servis.com",
        googleVerification: (data.googleVerification as string | null) ?? null,
        robotsIndex: (data.robotsIndex as boolean) ?? true,
      },
    });
    return jsonSuccess({ item });
  }, { request, permission: "seo" });
}
