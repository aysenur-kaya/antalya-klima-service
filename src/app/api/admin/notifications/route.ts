export const runtime = "nodejs";

import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { fetchAdminNotifications } from "@/lib/admin/notifications";
import { jsonSuccess } from "@/lib/api/response";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    const { searchParams } = new URL(request.url);
    const limitRaw = Number.parseInt(searchParams.get("limit") ?? "20", 10);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 20;
    const items = await fetchAdminNotifications(limit);
    const unreadCount = items.filter((n) => n.unread).length;
    return jsonSuccess({ items, unreadCount });
  }, { request });
}
