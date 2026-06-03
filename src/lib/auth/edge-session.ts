import type { NextRequest } from "next/server";
import { verifySessionToken, type AdminSessionPayload } from "@/lib/auth/session";

/** Edge/middleware için — Prisma yok, yalnızca JWT + çerez */
export function getSessionTokenFromCookieHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(/(?:^|;\s*)izmir_admin_session=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function getJwtSessionFromRequest(
  request: NextRequest
): Promise<AdminSessionPayload | null> {
  const token = getSessionTokenFromCookieHeader(request.headers.get("cookie"));
  return verifySessionToken(token);
}
