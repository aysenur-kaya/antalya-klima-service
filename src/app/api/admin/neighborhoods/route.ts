export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { neighborhoodFilterWhere } from "@/lib/api/admin-search";
import {
  buildPaginatedResult,
  parsePagination,
  parseSearchQuery,
} from "@/lib/api/pagination";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const districtId = searchParams.get("districtId") ?? undefined;

    const where = {
      ...(districtId ? { districtId } : {}),
      ...(neighborhoodFilterWhere(q) ?? {}),
    };

    const [items, total] = await Promise.all([
      prisma.neighborhood.findMany({
        where,
        orderBy: { name: "asc" },
        take: pagination.limit,
        skip: pagination.offset,
        include: { district: { select: { id: true, name: true, slug: true } } },
      }),
      prisma.neighborhood.count({ where }),
    ]);

    return jsonSuccess(buildPaginatedResult(items, total, pagination));
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(
    async () => {
      const body = await parseJsonBody<Record<string, unknown>>(request);
      if (isJsonParseError(body)) return body;

      const districtErr = requireString(body.districtId, "İlçe");
      if (districtErr) return jsonError("İlçe seçimi zorunludur.", 400, "VALIDATION");

      const districtId = (body.districtId as string).trim();
      const district = await prisma.district.findUnique({ where: { id: districtId } });
      if (!district) return jsonError("İlçe bulunamadı.", 404, "NOT_FOUND");

      const nameErr = requireString(body.name, "Mahalle adı", 2);
      if (nameErr) return jsonError(nameErr, 400, "VALIDATION");

      const name = (body.name as string).trim();
      const slug = resolveSlug(body.slug, name);
      const active = optionalBoolean(body.active) ?? true;

      const item = await prisma.neighborhood.create({
        data: { name, slug, districtId, active },
        include: { district: { select: { id: true, name: true, slug: true } } },
      });
      return jsonSuccess({ item }, 201);
    },
    { request }
  );
}
