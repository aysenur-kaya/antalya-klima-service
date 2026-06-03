export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";
import { jsonSuccess } from "@/lib/api/response";

export async function GET(request: Request) {
  return runProtectedAdminRoute(async () => {
    void request;
    const [
      totalRequests,
      newRequests,
      totalServices,
      activeServices,
      totalBlogPosts,
      publishedBlogPosts,
    ] = await Promise.all([
      prisma.customerRequest.count(),
      prisma.customerRequest.count({ where: { status: "NEW" } }),
      prisma.service.count(),
      prisma.service.count({ where: { active: true } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    ]);

    return jsonSuccess({
      customerRequests: {
        total: totalRequests,
        newCount: newRequests,
      },
      services: {
        total: totalServices,
        activeCount: activeServices,
      },
      blogPosts: {
        total: totalBlogPosts,
        publishedCount: publishedBlogPosts,
      },
    });
  });
}
