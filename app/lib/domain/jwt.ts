// JWT payload 解析 — 純函式（只用來「導頁」，不是驗證；真正驗證在後端 auth-service）
// 可在 Edge runtime（proxy.ts）使用：不依賴 Node 的 Buffer。

export type AccessClaims = {
  user_id?: number | string;
  exp?: number;
  onboarded?: boolean;
  user_type?: string;
  role?: string;
  name?: string;
};

function base64UrlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function decodeClaims(token: string | null | undefined): AccessClaims | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload && typeof payload === "object" ? (payload as AccessClaims) : null;
  } catch {
    return null;
  }
}

export function isExpired(claims: AccessClaims | null, nowSec: number, skewSec = 10): boolean {
  if (!claims?.exp) return true;
  return claims.exp - skewSec < nowSec;
}

/** 舊 token 沒有 onboarded claim → 視為已完成（不影響既有使用者）。 */
export function needsOnboarding(claims: AccessClaims | null): boolean {
  return claims?.onboarded === false;
}
