import { NextRequest, NextResponse } from "next/server"
import { ENV } from "./app/lib/env"
import { decodeClaims, isExpired, needsOnboarding } from "./app/lib/domain/jwt"
import { decideRoute } from "./app/lib/domain/routing"

// 只有「還沒過期」的 token 才算登入（避免殘留的過期 cookie 造成導頁迴圈）
function isUnexpiredJwt(token: string | undefined) {
  const claims = decodeClaims(token)
  return !!claims && typeof claims.exp === "number" && !isExpired(claims, Math.floor(Date.now() / 1000))
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const access = req.cookies.get(ENV.ACCESS_COOKIE)?.value
  const refresh = req.cookies.get(ENV.REFRESH_COOKIE)?.value

  // 只用來決定導頁（不是驗證）：access token 過期時 onboarded 資訊仍可讀
  const decision = decideRoute(pathname, {
    loggedIn: isUnexpiredJwt(access) || isUnexpiredJwt(refresh),
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
