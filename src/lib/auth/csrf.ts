import type { NextRequest } from "next/server";

const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

function buildAllowedOrigins(request: NextRequest): string[] {
  const host = request.headers.get("host");
  if (!host) return [];

  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.") || host.startsWith("192.168.")
      ? "http"
      : "https");

  const origins = new Set<string>([`${proto}://${host}`]);

  if (process.env.NODE_ENV !== "production") {
    origins.add(`http://${host}`);
    origins.add(`https://${host}`);
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  const extra = process.env.ADMIN_ALLOWED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  extra?.forEach((o) => origins.add(o));

  return [...origins];
}

export function isMutatingMethod(method: string): boolean {
  return MUTATING_METHODS.has(method.toUpperCase());
}

/**
 * Same-origin istek doğrulama (Origin / Referer).
 * Geliştirmede LAN IP ve localhost esnekliği korunur.
 */
export function verifyAdminRequestOrigin(request: NextRequest | Request): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const allowed = buildAllowedOrigins(request as NextRequest);
  if (allowed.length === 0) return false;

  const origin = request.headers.get("origin");
  if (origin && allowed.includes(origin)) {
    return true;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    return allowed.some((a) => referer.startsWith(a));
  }

  return false;
}
