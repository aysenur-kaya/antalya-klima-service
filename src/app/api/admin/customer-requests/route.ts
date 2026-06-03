export const runtime = "nodejs";

import { CustomerRequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { customerRequestSearchWhere } from "@/lib/api/admin-search";
import {
  buildPaginatedResult,
  parsePagination,
  parseSearchQuery,
} from "@/lib/api/pagination";
import { jsonSuccess } from "@/lib/api/response";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const q = parseSearchQuery(searchParams);
    const statusParam = searchParams.get("status");

    const statusFilter =
      statusParam &&
      (["NEW", "IN_PROGRESS", "COMPLETED"] as const).includes(
        statusParam as CustomerRequestStatus
      )
        ? { status: statusParam as CustomerRequestStatus }
        : {};

    const and: Record<string, unknown>[] = [];
    if (Object.keys(statusFilter).length) and.push(statusFilter);
    const search = customerRequestSearchWhere(q);
    if (Object.keys(search).length) and.push(search);
    const where = and.length > 0 ? { AND: and } : {};

    const [items, total] = await Promise.all([
      prisma.customerRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: pagination.limit,
        skip: pagination.offset,
      }),
      prisma.customerRequest.count({ where }),
    ]);

    return jsonSuccess(buildPaginatedResult(items, total, pagination));
  });
}
