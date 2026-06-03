import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, type AdminSessionPayload } from "@/lib/auth/session";
import { resolveAdminSession } from "@/lib/auth/resolve-session";

/** Node.js server — JWT + DB aktif kullanıcı ve güncel rol */
export async function getCurrentAdmin(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return resolveAdminSession(token);
}

export function isPublicAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth/login" ||
    pathname === "/api/admin/auth/logout"
  );
}
