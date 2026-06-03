export const runtime = "nodejs";

import { getPublishedRehberList } from "@/lib/blog/public";
import { jsonSuccess } from "@/lib/api/response";

export async function GET() {
  const items = await getPublishedRehberList();
  return jsonSuccess({ items });
}
