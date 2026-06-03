export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  optionalString,
  requireRating,
  requireString,
} from "@/lib/api/validation";

type RouteCtx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    const body = await parseJsonBody<Record<string, unknown>>(request);
    if (isJsonParseError(body)) return body;

    const data: Record<string, unknown> = {};
    if (body.author !== undefined) {
      const err = requireString(body.author, "Müşteri adı", 1);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.author = (body.author as string).trim();
    }
    if (body.district !== undefined) {
      const err = requireString(body.district, "İlçe", 2);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.district = (body.district as string).trim();
    }
    if (body.excerpt !== undefined) {
      const err = requireString(body.excerpt, "Yorum", 5, 2000);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.excerpt = (body.excerpt as string).trim();
    }
    if (body.rating !== undefined) {
      const rating = requireRating(body.rating);
      if (rating === null) return jsonError("Puan 1–5 arasında olmalıdır.", 400, "VALIDATION");
      data.rating = rating;
    }
    const published = optionalBoolean(body.published);
    if (published !== undefined) data.published = published;
    const sortOrder = optionalInt(body.sortOrder);
    if (sortOrder !== undefined) data.sortOrder = sortOrder;

    const item = await prisma.testimonial.update({ where: { id }, data });
    return jsonSuccess({ item });
  }, { request });
}

export async function DELETE(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.testimonial.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  }, { request });
}
