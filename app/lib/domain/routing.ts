// proxy.ts 的導頁規則 — 純函式（輸入路徑與登入狀態，輸出動作），方便單元測試

export type Session = { loggedIn: boolean; needsOnboarding: boolean };
export type RouteDecision =
  | { action: "next" }
  | { action: "redirect"; to: string }
  | { action: "unauthorized" };

const PUBLIC_EXACT = new Set(["/", "/Login", "/CreateUser", "/Signup", "/contact", "/pricing"]);
const PUBLIC_PREFIX = [
  "/api/auth/login",
  "/api/auth/google",
  "/api/auth/check-username",
  "/api/auth/password-reset",
  "/api/auth/register",
  "/api/auth/token-refresh",
  "/api/health",
  "/public",
];
const AUTH_PAGES = new Set(["/Login", "/Signup", "/CreateUser"]);
// 還沒完成 onboarding 也能用的路徑
const ONBOARDING_ALLOWED_PREFIX = ["/Onboarding", "/api/auth/"];

export const HOME_AFTER_LOGIN = "/Growth";

export function isPublic(pathname: string): boolean {
  return PUBLIC_EXACT.has(pathname) || PUBLIC_PREFIX.some((p) => pathname.startsWith(p));
}

export function decideRoute(pathname: string, session: Session): RouteDecision {
  if (session.loggedIn) {
    if (session.needsOnboarding && !ONBOARDING_ALLOWED_PREFIX.some((p) => pathname.startsWith(p))) {
      return pathname.startsWith("/api/") ? { action: "unauthorized" } : { action: "redirect", to: "/Onboarding" };
    }
    if (AUTH_PAGES.has(pathname)) return { action: "redirect", to: HOME_AFTER_LOGIN };
    if (pathname === "/Onboarding" && !session.needsOnboarding) return { action: "redirect", to: HOME_AFTER_LOGIN };
    return { action: "next" };
  }
  if (isPublic(pathname)) return { action: "next" };
  if (pathname.startsWith("/api/")) return { action: "unauthorized" };
  return { action: "redirect", to: "/Login" };
}
