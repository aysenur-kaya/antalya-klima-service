import { cookies } from "next/headers";
import type { AdminRole } from "@prisma/client";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, type AdminSessionPayload } from "@/lib/auth/session";
import { resolveAdminSession } from "@/lib/auth/resolve-session";
import { verifyAdminRequestOrigin, isMutatingMethod } from "@/lib/auth/csrf";
import { hasAdminPermission, requireAdminRole, type AdminPermission } from "@/lib/auth/roles";
import { jsonError } from "@/lib/api/response";
import { withApiHandler } from "@/lib/api/handler";

export type ProtectedAdminRouteOptions = {
  request?: Request | NextRequest;
  /** Belirli AdminRole listesi (ör. site ayarları) */
  roles?: AdminRole[];
  /** İnce taneli yetki (rol matrisinden) */
  permission?: AdminPermission;
};

export async function getAdminSessionFromCookies(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return resolveAdminSession(token);
}

export async function getAdminSessionFromRequest(
  request: NextRequest | Request
): Promise<AdminSessionPayload | null> {
  const token = request.headers.get("cookie")?.match(/izmir_admin_session=([^;]+)/)?.[1];
  return resolveAdminSession(token ? decodeURIComponent(token) : undefined);
}

function enforceCsrf(request: Request | NextRequest | undefined): ReturnType<typeof jsonError> | null {
  if (!request) return null;
  if (!isMutatingMethod(request.method)) return null;
  if (!verifyAdminRequestOrigin(request)) {
    return jsonError("Geçersiz istek kaynağı.", 403, "CSRF");
  }
  return null;
}

function enforceAuthorization(
  session: AdminSessionPayload,
  options?: ProtectedAdminRouteOptions
): ReturnType<typeof jsonError> | null {
  if (options?.roles && !requireAdminRole(session, options.roles)) {
    return jsonError("Bu işlem için yetkiniz yok.", 403, "FORBIDDEN");
  }
  if (options?.permission && !hasAdminPermission(session, options.permission)) {
    return jsonError("Bu işlem için yetkiniz yok.", 403, "FORBIDDEN");
  }
  return null;
}

/**
 * Korunan admin API route'ları (Node.js runtime).
 * JWT + DB: aktif kullanıcı ve güncel rol — resolveAdminSession (Prisma).
 */
export async function runProtectedAdminRoute<T>(
  handler: (session: AdminSessionPayload) => Promise<T>,
  options?: ProtectedAdminRouteOptions
): Promise<T | ReturnType<typeof jsonError>> {
  const csrfError = enforceCsrf(options?.request);
  if (csrfError) return csrfError;

  const session = await getAdminSessionFromCookies();
  if (!session) {
    return jsonError("Oturum gerekli. Lütfen tekrar giriş yapın.", 401, "UNAUTHORIZED");
  }

  const authError = enforceAuthorization(session, options);
  if (authError) return authError;

  return withApiHandler(() => handler(session));
}
