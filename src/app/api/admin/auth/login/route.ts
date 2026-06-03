import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth/session";
import { withApiHandler } from "@/lib/api/handler";
import { jsonError, jsonSuccess } from "@/lib/api/response";

export async function POST(request: NextRequest) {
  const result = await withApiHandler(async () => {
    let body: { email?: string; password?: string };
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("[auth/login] JSON parse hatası:", parseError);
      return jsonError("Geçersiz istek gövdesi.", 400, "INVALID_BODY");
    }

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return jsonError("E-posta ve şifre zorunludur.", 400, "VALIDATION");
    }

    console.log("[auth/login] Giriş denemesi:", email);

    let user;
    try {
      user = await prisma.adminUser.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error("[auth/login] Prisma findUnique hatası:", dbError);
      throw dbError;
    }

    if (!user) {
      console.warn("[auth/login] Kullanıcı bulunamadı:", email);
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    if (!user.active) {
      console.warn("[auth/login] Hesap pasif:", email);
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    if (!user.passwordHash?.startsWith("$2")) {
      console.error(
        "[auth/login] Geçersiz passwordHash (bcrypt değil). npm run db:seed çalıştırın:",
        email
      );
      return jsonError(
        "Admin şifresi yapılandırılmamış. Sunucuda npm run db:seed çalıştırın.",
        503,
        "PASSWORD_NOT_HASHED"
      );
    }

    let valid = false;
    try {
      valid = await verifyPassword(password, user.passwordHash);
    } catch (bcryptError) {
      console.error("[auth/login] bcrypt doğrulama hatası:", bcryptError);
      throw bcryptError;
    }

    if (!valid) {
      console.warn("[auth/login] Şifre eşleşmedi:", email);
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    let token: string;
    try {
      token = await createSessionToken({
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (sessionError) {
      console.error("[auth/login] Oturum token oluşturulamadı:", sessionError);
      throw sessionError;
    }

    const response = jsonSuccess({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    setSessionCookie(response, token);
    console.log("[auth/login] Başarılı giriş:", email);
    return response;
  });

  return result;
}
