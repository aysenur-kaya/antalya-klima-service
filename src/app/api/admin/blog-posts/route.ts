import { BlogPostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalInt,
  optionalString,
  requireEnum,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const items = await prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return jsonSuccess({ items, total: items.length });
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(async () => {
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

    const item = await prisma.blogPost.create({
      data: {
        title,
        slug,
        status: postStatus,
        excerpt,
        content,
        views,
        publishedAt: postStatus === "PUBLISHED" ? new Date() : null,
      },
    });
    return jsonSuccess({ item }, 201);
  });
}
