import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

import {
  getSessionCookieOptions,
  SESSION_MAX_AGE_SEC,
} from "@/lib/auth/cookie-options";

export const ADMIN_SESSION_COOKIE = "izmir_admin_session";
export { SESSION_MAX_AGE_SEC };

export type AdminSessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

const DEV_FALLBACK_SECRET =
  "dev-only-izmir-admin-session-secret-min-32-chars";

export function resolveSessionSecret(): string {
  const fromEnv = process.env.SESSION_SECRET?.trim();

  if (fromEnv && fromEnv.length >= 32) {
    return fromEnv;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[auth] SESSION_SECRET eksik veya kısa (<32). Geliştirme ortamı geçici anahtar kullanıyor. " +
        ".env dosyanıza en az 32 karakterlik SESSION_SECRET ekleyin."
    );
    return DEV_FALLBACK_SECRET;
  }

  throw new Error(
    "SESSION_SECRET tanımlı değil veya çok kısa (en az 32 karakter gerekli)."
  );
}

function getSessionSecret(): Uint8Array {
  return new TextEncoder().encode(resolveSessionSecret());
}

export async function createSessionToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(
  token: string | undefined
): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      algorithms: ["HS256"],
    });

    const sub = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const role = payload.role;

    if (
      typeof sub !== "string" ||
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof role !== "string"
    ) {
      return null;
    }

    return { sub, email, name, role };
  } catch {
    return null;
  }
}

export { getSessionCookieOptions } from "@/lib/auth/cookie-options";

export function setSessionCookie(response: NextResponse, token: string) {
  const options = getSessionCookieOptions();
  response.cookies.set(ADMIN_SESSION_COOKIE, token, options);
  if (process.env.NODE_ENV === "development") {
    console.log("[auth] Oturum çerezi ayarlandı", {
      secure: options.secure,
      sameSite: options.sameSite,
      path: options.path,
    });
  }
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
}

export async function getSessionFromRequest(
  request: NextRequest
): Promise<AdminSessionPayload | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function getSessionFromCookies(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
