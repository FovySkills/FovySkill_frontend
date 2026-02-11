// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { ENV } from "./app/lib/env";


function isPublic(pathname: string) {
  return (
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/check-username") ||
    pathname.startsWith("/api/auth/password-reset") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const access = req.cookies.get(ENV.ACCESS_COOKIE)?.value;
  const refresh = req.cookies.get(ENV.REFRESH_COOKIE)?.value;

  const hasAnyToken = Boolean(access || refresh);
  if (hasAnyToken) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
