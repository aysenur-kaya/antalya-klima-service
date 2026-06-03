import { CustomerRequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseIdParam, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { requireEnum } from "@/lib/api/validation";

type RouteCtx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    const body = await parseJsonBody<Record<string, unknown>>(request);
    if (isJsonParseError(body)) return body;

    const status = requireEnum(
      body.status,
      ["NEW", "IN_PROGRESS", "COMPLETED"] as const,
      "Durum"
    );
    if (!status) {
      return jsonError("Geçersiz durum (NEW, IN_PROGRESS, COMPLETED).", 400, "VALIDATION");
    }

    const item = await prisma.customerRequest.update({
      where: { id },
      data: { status: status as CustomerRequestStatus },
    });
    return jsonSuccess({ item });
  });
}

export async function DELETE(_request: Request, ctx: RouteCtx) {
  return runProtectedAdminRoute(async () => {
    const { id: rawId } = await ctx.params;
    const id = parseIdParam(rawId);
    if (!id) return jsonError("Geçersiz kayıt kimliği.", 400, "VALIDATION");

    await prisma.customerRequest.delete({ where: { id } });
    return jsonSuccess({ deleted: true });
  });
}
