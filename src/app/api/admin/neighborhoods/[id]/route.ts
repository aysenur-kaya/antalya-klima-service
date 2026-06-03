export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
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

    const existing = await prisma.neighborhood.findUnique({ where: { id } });
    if (!existing) return jsonError("Mahalle bulunamadı.", 404, "NOT_FOUND");

    const data: Record<string, unknown> = {};
    if (body.name !== undefined) {
      const err = requireString(body.name, "Mahalle adı", 2);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.name = (body.name as string).trim();
    }
    if (body.slug !== undefined || body.name !== undefined) {
      data.slug = resolveSlug(body.slug, (data.name as string) ?? existing.name);
    }
    const active = optionalBoolean(body.active);
    if (active !== undefined) data.active = active;

    const item = await prisma.neighborhood.update({
      where: { id },
      data,
      include: { district: { select: { id: true, name: true, slug: true } } },
    });
    return jsonSuccess({ item });
  }, { request });
}

export async function DELETE(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.neighborhood.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  }, { request });
}
