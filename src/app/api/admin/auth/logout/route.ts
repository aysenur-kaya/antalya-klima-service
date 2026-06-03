export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";
import { jsonSuccess } from "@/lib/api/response";
import { runProtectedAdminRoute } from "@/lib/api/admin-auth";

export async function POST(request: NextRequest) {
  return runProtectedAdminRoute(
    async () => {
      const response = jsonSuccess({ ok: true });
      clearSessionCookie(response);
      return response;
    },
    { request }
  );
}
