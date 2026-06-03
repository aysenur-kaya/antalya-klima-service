import { prisma } from "@/lib/prisma";
import { getSessionFromCookies, type AdminSessionPayload } from "@/lib/auth/session";

export async function getCurrentAdmin(): Promise<AdminSessionPayload | null> {
  const session = await getSessionFromCookies();
  if (!session) return null;

  const user = await prisma.adminUser.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, name: true, role: true, active: true },
  });

  if (!user || !user.active) return null;

  return {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function isPublicAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth/login" ||
    pathname === "/api/admin/auth/logout"
  );
}
