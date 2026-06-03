import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const districtId = new URL(request.url).searchParams.get("districtId") ?? undefined;

    const items = await prisma.neighborhood.findMany({
      where: districtId ? { districtId } : undefined,
      orderBy: { name: "asc" },
      include: { district: { select: { id: true, name: true, slug: true } } },
    });
    return jsonSuccess({ items, total: items.length });
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(async () => {
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
  });
}
