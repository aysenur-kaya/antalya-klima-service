export const runtime = "nodejs";

import { ServiceType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { serviceSearchWhere } from "@/lib/api/admin-search";
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
  requireEnum,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const activeParam = searchParams.get("active");

    const where = {
      ...serviceSearchWhere(q),
      ...(activeParam === "true" ? { active: true } : activeParam === "false" ? { active: false } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
        take: pagination.limit,
        skip: pagination.offset,
      }),
      prisma.service.count({ where }),
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
      const type = requireEnum(body.type, ["KLIMA", "BEYAZ_ESYA"] as const, "Kategori");
      if (!type) return jsonError("Geçerli kategori seçin (KLIMA veya BEYAZ_ESYA).", 400, "VALIDATION");

      const slug = resolveSlug(body.slug, title);
      const active = optionalBoolean(body.active) ?? true;
      const sortOrder = optionalInt(body.sortOrder) ?? 0;
      const summary = typeof body.summary === "string" ? body.summary.trim() : undefined;

      const item = await prisma.service.create({
        data: { title, slug, type: type as ServiceType, active, sortOrder, summary },
      });
      return jsonSuccess({ item }, 201);
    },
    { request }
  );
}
