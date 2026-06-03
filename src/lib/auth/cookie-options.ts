/**
 * Admin oturum çerezi — localhost ve LAN IP (ör. 192.168.x.x) ile uyumlu.
 * Domain atanmaz; böylece host ne olursa olsun çerez o host’a bağlanır.
 */
export function isSecureSessionCookie(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getSessionCookieSameSite(): "lax" | "strict" | "none" {
  if (isSecureSessionCookie()) {
    return "lax";
  }
  return "lax";
}

export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: isSecureSessionCookie(),
    sameSite: getSessionCookieSameSite(),
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  } as const;
}
