import { prisma } from "@/lib/prisma";
import { verifySessionToken, type AdminSessionPayload } from "@/lib/auth/session";

/**
 * JWT + veritabanı: kullanıcı aktif mi ve güncel rol bilgisi.
 */
export async function resolveAdminSession(
  token: string | undefined
): Promise<AdminSessionPayload | null> {
  const jwtSession = await verifySessionToken(token);
  if (!jwtSession) return null;

  const user = await prisma.adminUser.findUnique({
    where: { id: jwtSession.sub },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      active: true,
    },
  });

  if (!user?.active) return null;

  return {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
