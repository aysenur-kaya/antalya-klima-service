import { ServiceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  optionalString,
  requireEnum,
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

    const data: Record<string, unknown> = {};

    if (body.title !== undefined) {
      const err = requireString(body.title, "Başlık", 2);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.title = (body.title as string).trim();
    }
    if (body.slug !== undefined || body.title !== undefined) {
      const title = (data.title as string) ?? undefined;
      const existing = await prisma.service.findUnique({ where: { id } });
      if (!existing) return jsonError("Hizmet bulunamadı.", 404, "NOT_FOUND");
      data.slug = resolveSlug(body.slug, (title ?? existing.title) as string);
    }
    if (body.type !== undefined) {
      const type = requireEnum(body.type, ["KLIMA", "BEYAZ_ESYA"] as const, "Kategori");
      if (!type) return jsonError("Geçersiz kategori.", 400, "VALIDATION");
      data.type = type;
    }
    const active = optionalBoolean(body.active);
    if (active !== undefined) data.active = active;
    const sortOrder = optionalInt(body.sortOrder);
    if (sortOrder !== undefined) data.sortOrder = sortOrder;
    const summary = optionalString(body.summary, 10000);
    if (summary !== undefined) data.summary = summary;

    const item = await prisma.service.update({
      where: { id },
      data: data as {
        title?: string;
        slug?: string;
        type?: ServiceType;
        active?: boolean;
        sortOrder?: number;
        summary?: string;
      },
    });
    return jsonSuccess({ item });
  });
}

export async function DELETE(_request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.service.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  });
}
