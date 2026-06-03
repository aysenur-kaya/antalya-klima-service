import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, ADMIN_SESSION_COOKIE, type AdminSessionPayload } from "@/lib/auth/session";
import { jsonError } from "@/lib/api/response";
import { withApiHandler } from "@/lib/api/handler";

export async function getAdminSessionFromCookies(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;

  const user = await prisma.adminUser.findUnique({
    where: { id: session.sub },
    select: { id: true, active: true },
  });

  if (!user?.active) return null;
  return session;
}

/** Middleware yedek: API route içinde oturum doğrulama */
export async function runProtectedAdminRoute<T>(
  handler: (session: AdminSessionPayload) => Promise<T>
): Promise<T | ReturnType<typeof jsonError>> {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    return jsonError("Oturum gerekli. Lütfen tekrar giriş yapın.", 401, "UNAUTHORIZED");
  }
  return withApiHandler(() => handler(session));
}
