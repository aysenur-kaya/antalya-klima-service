import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  requireString,
  resolveSlug,
} from "@/lib/api/validation";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const items = await prisma.district.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        neighborhoods: { orderBy: { name: "asc" } },
        _count: { select: { neighborhoods: true } },
      },
    });
    return jsonSuccess({ items, total: items.length });
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(async () => {
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
  });
}
