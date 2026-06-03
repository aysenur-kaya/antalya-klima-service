export const runtime = "nodejs";

import { BlogPostStatus, ServiceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { blogPostSearchWhere } from "@/lib/api/admin-search";
import {
  buildPaginatedResult,
  parsePagination,
  parseSearchQuery,
} from "@/lib/api/pagination";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalInt,
  optionalString,
  requireEnum,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const statusParam = searchParams.get("status");

    const statusFilter =
      statusParam &&
      (["DRAFT", "PUBLISHED"] as const).includes(statusParam as BlogPostStatus)
        ? { status: statusParam as BlogPostStatus }
        : {};

    const where = {
      ...statusFilter,
      ...blogPostSearchWhere(q),
    };

    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        take: pagination.limit,
        skip: pagination.offset,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return jsonSuccess(buildPaginatedResult(items, total, pagination));
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(
    async () => {
      const body = await parseJsonBody<Record<string, unknown>>(request);
      if (isJsonParseError(body)) return body;

      const titleErr = requireString(body.title, "Başlık", 2);
      if (titleErr) return jsonError(titleErr, 400, "VALIDATION");

      const title = (body.title as string).trim();
      const slug = resolveSlug(body.slug, title);
      const status = requireEnum(body.status, ["DRAFT", "PUBLISHED"] as const, "Durum");
      const postStatus = (status ?? "DRAFT") as BlogPostStatus;
      const excerpt = optionalString(body.excerpt);
      const content = optionalString(body.content, 50000);
      const views = optionalInt(body.views) ?? 0;
      const category =
        requireEnum(body.category, ["KLIMA", "BEYAZ_ESYA"] as const, "Kategori") ?? "KLIMA";

      const item = await prisma.blogPost.create({
        data: {
          title,
          slug,
          status: postStatus,
          excerpt,
          content,
          category: category as ServiceType,
          views,
          publishedAt: postStatus === "PUBLISHED" ? new Date() : null,
        },
      });
      return jsonSuccess({ item }, 201);
    },
    { request }
  );
}
