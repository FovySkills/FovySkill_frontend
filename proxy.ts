import { NextRequest, NextResponse } from "next/server"
import { ENV } from "./app/lib/env"

function isPublic(pathname: string) {
  const exactMatches = [
    "/",
    "/Login",
    "/CreateUser",
    "/Signup"
  ]
  if (exactMatches.includes(pathname)) return true

  const prefixMatches = [
    "/api/auth/login",
    "/api/auth/check-username",
    "/api/auth/password-reset",
    "/api/auth/register",
    "/api/health",
    "/public"
  ]
  return prefixMatches.some((prefix) => pathname.startsWith(prefix))
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isPublic(pathname)) return NextResponse.next()

  const access = req.cookies.get(ENV.ACCESS_COOKIE)?.value
  const refresh = req.cookies.get(ENV.REFRESH_COOKIE)?.value

  if (access || refresh) return NextResponse.next()

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.redirect(new URL("/Login", req.url))
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
}