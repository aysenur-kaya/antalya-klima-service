export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { withApiHandler } from "@/lib/api/handler";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { checkRateLimit, getClientIp, resetRateLimit } from "@/lib/auth/rate-limit";
import { authLog, maskEmail } from "@/lib/auth/safe-log";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateKey = `login:${ip}`;
  const limit = checkRateLimit(rateKey);

  if (!limit.allowed) {
    authLog("warn", "[auth/login] Rate limit aşıldı", { ip, retryAfterSec: limit.retryAfterSec });
    return NextResponse.json(
      {
        success: false,
        error: `Çok fazla deneme. ${limit.retryAfterSec} saniye sonra tekrar deneyin.`,
        code: "RATE_LIMITED",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      }
    );
  }

  const result = await withApiHandler(async () => {
    let body: { email?: string; password?: string };
    try {
      body = await request.json();
    } catch {
      authLog("error", "[auth/login] JSON parse hatası");
      return jsonError("Geçersiz istek gövdesi.", 400, "INVALID_BODY");
    }

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return jsonError("E-posta ve şifre zorunludur.", 400, "VALIDATION");
    }

    authLog("log", "[auth/login] Giriş denemesi", { email: maskEmail(email) });

    let user;
    try {
      user = await prisma.adminUser.findUnique({
        where: { email },
      });
    } catch (dbError) {
      authLog("error", "[auth/login] Veritabanı hatası");
      throw dbError;
    }

    if (!user) {
      authLog("warn", "[auth/login] Geçersiz kimlik bilgileri");
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    if (!user.active) {
      authLog("warn", "[auth/login] Pasif hesap", { userId: user.id });
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    if (!user.passwordHash?.startsWith("$2")) {
      authLog("error", "[auth/login] passwordHash yapılandırılmamış", { userId: user.id });
      return jsonError(
        "Admin şifresi yapılandırılmamış. Sunucuda npm run db:seed çalıştırın.",
        503,
        "PASSWORD_NOT_HASHED"
      );
    }

    let valid = false;
    try {
      valid = await verifyPassword(password, user.passwordHash);
    } catch {
      authLog("error", "[auth/login] Şifre doğrulama hatası");
      throw new Error("Password verification failed");
    }

    if (!valid) {
      authLog("warn", "[auth/login] Geçersiz kimlik bilgileri");
      return jsonError("E-posta veya şifre hatalı.", 401, "INVALID_CREDENTIALS");
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = jsonSuccess({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    setSessionCookie(response, token);
    resetRateLimit(rateKey);
    authLog("log", "[auth/login] Başarılı giriş", {
      userId: user.id,
      role: user.role,
      host: request.headers.get("host"),
    });
    return response;
  });

  return result;
}
