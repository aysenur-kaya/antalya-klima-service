export const runtime = "nodejs";

import { getPublishedRehberBySlug } from "@/lib/blog/public";
import { jsonError, jsonSuccess } from "@/lib/api/response";

type RouteCtx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: RouteCtx) {
  const { slug } = await ctx.params;
  const item = await getPublishedRehberBySlug(slug);
  if (!item) return jsonError("Rehber bulunamadı.", 404, "NOT_FOUND");
  return jsonSuccess({ item });
}
