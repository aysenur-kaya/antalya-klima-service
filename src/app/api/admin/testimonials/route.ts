import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { isJsonParseError, parseJsonBody } from "@/lib/api/parse";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  optionalBoolean,
  optionalInt,
  requireRating,
  requireString,
} from "@/lib/api/validation";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const items = await prisma.testimonial.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return jsonSuccess({ items, total: items.length });
  });
}

export async function POST(request: Request) {
  return runProtectedAdminRoute(async () => {
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
  });
}
