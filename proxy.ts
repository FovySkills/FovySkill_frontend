import { NextRequest, NextResponse } from "next/server"
import { ENV } from "./app/lib/env"

function isPublic(pathname: string) {
  const exactMatches = [
    "/",
    "/Login",
    "/CreateUser",
    "/Signup",
    "/contact",
    "/pricing"
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

function decodeJwtPayload(token: string): { exp?: number } | null {
  const parts = token.split(".")
  if (parts.length !== 3) return null

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

function isUnexpiredJwt(token: string | undefined) {
  if (!token) return false
  const payload = decodeJwtPayload(token)
  if (typeof payload?.exp !== "number") return false

  const now = Math.floor(Date.now() / 1000)
  return payload.exp > now + 10
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const access = req.cookies.get(ENV.ACCESS_COOKIE)?.value
  const refresh = req.cookies.get(ENV.REFRESH_COOKIE)?.value
  const isLogged = isUnexpiredJwt(access) || isUnexpiredJwt(refresh)

  // 若已登入但試圖訪問登入、註冊頁面，自動導向到 Dashboard
  if (isLogged) {
    const authPages = ["/Login", "/Signup", "/CreateUser"];
    if (authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/Dashboard", req.url));
    }
  }

  // 若為公開頁面，且不是上面攔截的登入頁面，順利放行 (例如首頁 /)
  if (isPublic(pathname)) return NextResponse.next()

  // 若非公開頁面且已登入，放行
  if (isLogged) return NextResponse.next()

  // 若為 API 路徑且未登入，回傳 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }

  // 其餘情況 (未登入且訪問需要權限的畫面)，導向登入頁面
  return NextResponse.redirect(new URL("/Login", req.url))
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
}
