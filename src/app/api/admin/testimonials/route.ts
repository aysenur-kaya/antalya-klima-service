export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { testimonialSearchWhere } from "@/lib/api/admin-search";
import {
  buildPaginatedResult,
  parsePagination,
  parseSearchQuery,
} from "@/lib/api/pagination";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  requireRating,
  requireString,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const publishedParam = searchParams.get("published");

    const where = {
      ...testimonialSearchWhere(q),
      ...(publishedParam === "true"
        ? { published: true }
        : publishedParam === "false"
          ? { published: false }
          : {}),
    };

    const [items, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: pagination.limit,
        skip: pagination.offset,
      }),
      prisma.testimonial.count({ where }),
    ]);

    return jsonSuccess(buildPaginatedResult(items, total, pagination));
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(
    async () => {
      const body = await parseJsonBody<Record<string, unknown>>(request);
      if (isJsonParseError(body)) return body;

      const authorErr = requireString(body.author, "Müşteri adı", 1);
      if (authorErr) return jsonError(authorErr, 400, "VALIDATION");
      const districtErr = requireString(body.district, "İlçe", 2);
      if (districtErr) return jsonError(districtErr, 400, "VALIDATION");
      const excerptErr = requireString(body.excerpt, "Yorum", 5, 2000);
      if (excerptErr) return jsonError(excerptErr, 400, "VALIDATION");

      const rating = requireRating(body.rating);
      if (rating === null) return jsonError("Puan 1–5 arasında olmalıdır.", 400, "VALIDATION");

      const item = await prisma.testimonial.create({
        data: {
          author: (body.author as string).trim(),
          district: (body.district as string).trim(),
          excerpt: (body.excerpt as string).trim(),
          rating,
          published: optionalBoolean(body.published) ?? false,
          sortOrder: optionalInt(body.sortOrder) ?? 0,
        },
      });
      return jsonSuccess({ item }, 201);
    },
    { request }
  );
}
