import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicAdminPath } from "@/lib/auth/admin";
import { getSessionFromRequest } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminUi = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminUi && !isAdminApi) {
    return NextResponse.next();
  }

  const session = await getSessionFromRequest(request);

  if (isPublicAdminPath(pathname)) {
    if (session && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
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
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
