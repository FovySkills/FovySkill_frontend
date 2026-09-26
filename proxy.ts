import { NextRequest, NextResponse } from "next/server"
import { ENV } from "./app/lib/env"
<<<<<<< HEAD

function isPublic(pathname: string) {
  const exactMatches = [
    "/",
    "/Login",
    "/CreateUser",
    "/Signup",
    "/contact",
    "/pricing",
    "/SwitchCareers"
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
=======
import { decodeClaims, needsOnboarding } from "./app/lib/domain/jwt"
import { decideRoute } from "./app/lib/domain/routing"
>>>>>>> feat/skillmap-v2

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
<<<<<<< HEAD
  const isLogged = isUnexpiredJwt(access) || isUnexpiredJwt(refresh)
=======
>>>>>>> feat/skillmap-v2

  // 只用來決定導頁（不是驗證）：access token 過期時 onboarded 資訊仍可讀
  const decision = decideRoute(pathname, {
    loggedIn: !!(access || refresh),
    needsOnboarding: needsOnboarding(decodeClaims(access) ?? decodeClaims(refresh)),
  })

  if (decision.action === "redirect") return NextResponse.redirect(new URL(decision.to, req.url))
  if (decision.action === "unauthorized") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
}
