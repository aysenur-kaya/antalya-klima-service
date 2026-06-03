export const runtime = "nodejs";

import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { runAdminGlobalSearch } from "@/lib/api/admin-global-search";
import { parseSearchQuery } from "@/lib/api/pagination";
import { jsonSuccess } from "@/lib/api/response";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const q = parseSearchQuery(searchParams);
    const result = await runAdminGlobalSearch(q);
    return jsonSuccess(result);
  }, { request });
}
