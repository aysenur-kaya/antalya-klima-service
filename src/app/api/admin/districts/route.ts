export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { districtSearchWhere, neighborhoodFilterWhere } from "@/lib/api/admin-search";
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
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const landingParam = searchParams.get("landingActive");

    const where = {
      ...districtSearchWhere(q),
      ...(landingParam === "true"
        ? { landingActive: true }
        : landingParam === "false"
          ? { landingActive: false }
          : {}),
    };

    const neighborhoodWhere = neighborhoodFilterWhere(q);

    const [items, total] = await Promise.all([
      prisma.district.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        take: pagination.limit,
        skip: pagination.offset,
        include: {
          neighborhoods: {
            where: neighborhoodWhere,
            orderBy: { name: "asc" },
            take: q ? 50 : undefined,
          },
          _count: { select: { neighborhoods: true } },
        },
      }),
      prisma.district.count({ where }),
    ]);

    return jsonSuccess(buildPaginatedResult(items, total, pagination));
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(
    async () => {
      const body = await parseJsonBody<Record<string, unknown>>(request);
      if (isJsonParseError(body)) return body;

      const nameErr = requireString(body.name, "İlçe adı", 2);
      if (nameErr) return jsonError(nameErr, 400, "VALIDATION");

      const name = (body.name as string).trim();
      const slug = resolveSlug(body.slug, name);
      const landingActive = optionalBoolean(body.landingActive) ?? false;
      const sortOrder = optionalInt(body.sortOrder) ?? 0;

      const item = await prisma.district.create({
        data: { name, slug, landingActive, sortOrder },
        include: { neighborhoods: true, _count: { select: { neighborhoods: true } } },
      });
      return jsonSuccess({ item }, 201);
    },
    { request }
  );
}
