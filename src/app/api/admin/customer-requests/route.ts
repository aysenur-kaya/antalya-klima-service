import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { jsonSuccess } from "@/lib/api/response";

export async function GET() {
  return runProtectedAdminRoute(async () => {
    const items = await prisma.customerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonSuccess({ items, total: items.length });
  });
}
