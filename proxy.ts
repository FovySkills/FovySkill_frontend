import { NextRequest, NextResponse } from "next/server"
import { ENV } from "./app/lib/env"
import { decodeClaims, needsOnboarding } from "./app/lib/domain/jwt"
import { decideRoute } from "./app/lib/domain/routing"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const access = req.cookies.get(ENV.ACCESS_COOKIE)?.value
  const refresh = req.cookies.get(ENV.REFRESH_COOKIE)?.value

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
