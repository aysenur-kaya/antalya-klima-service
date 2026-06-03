import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicAdminPath } from "@/lib/auth/admin";
import { getJwtSessionFromRequest } from "@/lib/auth/edge-session";

/**
 * Edge-safe: yalnızca JWT/çerez doğrulama.
 * Aktif kullanıcı ve rol kontrolü Node.js admin API route'larında (resolveAdminSession).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    const url = new URL("/admin/login", request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return NextResponse.redirect(url);
  }

  const isAdminUi = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminUi && !isAdminApi) {
    return NextResponse.next();
  }

  const jwtSession = await getJwtSessionFromRequest(request);

  if (isPublicAdminPath(pathname)) {
    if (jwtSession && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!jwtSession) {
    if (isAdminApi) {
      return NextResponse.json(
        { success: false, error: "Oturum gerekli.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin", "/admin/:path*", "/api/admin/:path*"],
};
