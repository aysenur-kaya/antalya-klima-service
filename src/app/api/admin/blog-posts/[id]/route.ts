import { BlogPostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
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

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return jsonError("Yazı bulunamadı.", 404, "NOT_FOUND");

    const data: {
      title?: string;
      slug?: string;
      status?: BlogPostStatus;
      excerpt?: string | null;
      content?: string | null;
      views?: number;
      publishedAt?: Date | null;
    } = {};

    if (body.title !== undefined) {
      const err = requireString(body.title, "Başlık", 2);
      if (err) return jsonError(err, 400, "VALIDATION");
      data.title = (body.title as string).trim();
    }
    if (body.slug !== undefined || body.title !== undefined) {
      data.slug = resolveSlug(body.slug, (data.title ?? existing.title) as string);
    }
    if (body.status !== undefined) {
      const status = requireEnum(body.status, ["DRAFT", "PUBLISHED"] as const, "Durum");
      if (!status) return jsonError("Geçersiz durum.", 400, "VALIDATION");
      data.status = status;
      data.publishedAt =
        status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null;
    }
    if (body.excerpt !== undefined) data.excerpt = optionalString(body.excerpt) ?? null;
    if (body.content !== undefined) data.content = optionalString(body.content, 50000) ?? null;
    const views = optionalInt(body.views);
    if (views !== undefined) data.views = views;

    const item = await prisma.blogPost.update({ where: { id }, data });
    return jsonSuccess({ item });
  });
}

export async function DELETE(_request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.blogPost.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  });
}
