export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

type RouteCtx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    const body = await parseJsonBody<Record<string, unknown>>(request);
    if (isJsonParseError(body)) return body;

    const existing = await prisma.district.findUnique({ where: { id } });
    if (!existing) return jsonError("İlçe bulunamadı.", 404, "NOT_FOUND");

    const data: Record<string, unknown> = {};
    if (body.name !== undefined) {
      const err = requireString(body.name, "İlçe adı", 2);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.name = (body.name as string).trim();
    }
    if (body.slug !== undefined || body.name !== undefined) {
      data.slug = resolveSlug(body.slug, (data.name as string) ?? existing.name);
    }
    const landingActive = optionalBoolean(body.landingActive);
    if (landingActive !== undefined) data.landingActive = landingActive;
    const sortOrder = optionalInt(body.sortOrder);
    if (sortOrder !== undefined) data.sortOrder = sortOrder;

    const item = await prisma.district.update({
      where: { id },
      data,
      include: { neighborhoods: true, _count: { select: { neighborhoods: true } } },
    });
    return jsonSuccess({ item });
  }, { request });
}

export async function DELETE(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.district.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  }, { request });
}
