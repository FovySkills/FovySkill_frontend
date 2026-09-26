// lib/auth.ts
import "server-only";
import { SERVICES } from "./services";
import { gatewayFetch } from "./gatewayFetch";
import { getAccessToken, getRefreshToken, setAccessCookie, setRefreshCookie } from "./cookies";
import { decodeClaims, isExpired } from "./domain/jwt";

/** BFF 呼叫 auth-service 時帶這個 header，refresh token 會出現在 response body（由 BFF 寫成 HttpOnly cookie）。 */
export const BFF_TOKEN_HEADERS = { "X-Token-Transport": "body" } as const;

export async function verifyAccessToken(access: string) {
  // 只檢查格式與到期時間；簽章由各後端服務透過 auth-service 驗證
  return !isExpired(decodeClaims(access), Math.floor(Date.now() / 1000));
}

/** 把 auth-service 回傳的 access / refresh 寫進 HttpOnly cookie。 */
export async function storeTokens(data: { access?: string; refresh?: string } | null | undefined) {
  if (data?.access) await setAccessCookie(data.access);
  if (data?.refresh) await setRefreshCookie(data.refresh);
}

export async function refreshAccessTokenFromAuthService(refresh: string) {
  if (!refresh) return null;

  const { res, data } = await gatewayFetch("/api/auth/token-refresh/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: BFF_TOKEN_HEADERS,
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });

  if (!res.ok || !data?.access) return null;
  await storeTokens(data); // rotating refresh token 也一併更新
  return data.access as string;
}

export async function getValidAccessToken() {
  const access = await getAccessToken();
  if (access && (await verifyAccessToken(access))) return access;

  const refresh = await getRefreshToken();
  if (refresh) return await refreshAccessTokenFromAuthService(refresh);
  return null;
}

/** 目前使用者 id（僅供 BFF 日誌／顯示；後端一律自行從 token 驗證身分，不接受前端傳 user_id）。 */
export function userIdFromAccess(access: string): string | null {
  const id = decodeClaims(access)?.user_id;
  return id === undefined || id === null ? null : String(id);
}
