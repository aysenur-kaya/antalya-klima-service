import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { optionalBoolean, optionalString, requireString } from "@/lib/api/validation";

const DEFAULT_ID = "default";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const item = await prisma.siteSetting.findUnique({ where: { id: DEFAULT_ID } });
    if (!item) {
      return jsonError("Site ayarları bulunamadı. npm run db:seed çalıştırın.", 404, "NOT_FOUND");
    }
    return jsonSuccess({ item });
  });
}

export async function PATCH(request: Request) {
  return runProtectedAdminRoute(async () => {
    const body = await parseJsonBody<Record<string, unknown>>(request);
    if (isJsonParseError(body)) return body;

    const data: Record<string, unknown> = {};

    if (body.siteName !== undefined) {
      const err = requireString(body.siteName, "Site adı", 2, 120);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.siteName = (body.siteName as string).trim();
    }
    if (body.defaultCity !== undefined) {
      const err = requireString(body.defaultCity, "Şehir", 2, 80);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.defaultCity = (body.defaultCity as string).trim();
    }
    if (body.phone !== undefined) {
      const err = requireString(body.phone, "Telefon (E.164)", 8, 30);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.phone = (body.phone as string).trim();
    }
    if (body.phoneFormatted !== undefined) {
      const err = requireString(body.phoneFormatted, "Görünen telefon", 8, 40);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.phoneFormatted = (body.phoneFormatted as string).trim();
    }
    if (body.whatsappUrl !== undefined) {
      const err = requireString(body.whatsappUrl, "WhatsApp URL", 10, 500);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.whatsappUrl = (body.whatsappUrl as string).trim();
    }
    if (body.workingHours !== undefined) {
      const err = requireString(body.workingHours, "Çalışma saatleri", 3, 120);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.workingHours = (body.workingHours as string).trim();
    }

    const sticky = optionalBoolean(body.stickyCtaEnabled);
    if (sticky !== undefined) data.stickyCtaEnabled = sticky;
    const maintenance = optionalBoolean(body.maintenanceMode);
    if (maintenance !== undefined) data.maintenanceMode = maintenance;
    const showTestimonials = optionalBoolean(body.showTestimonials);
    if (showTestimonials !== undefined) data.showTestimonials = showTestimonials;
    const analytics = optionalBoolean(body.analyticsEnabled);
    if (analytics !== undefined) data.analyticsEnabled = analytics;

    if (Object.keys(data).length === 0) {
      return jsonError("Güncellenecek alan yok.", 400, "VALIDATION");
    }

    const item = await prisma.siteSetting.update({
      where: { id: DEFAULT_ID },
      data,
    });
    return jsonSuccess({ item });
  });
}
