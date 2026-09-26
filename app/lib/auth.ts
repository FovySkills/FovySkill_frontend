// lib/auth.ts
import "server-only";
import { SERVICES } from "./services";
import { gatewayFetch } from "./gatewayFetch";
<<<<<<< HEAD
import {
  getAccessToken,
  getRefreshToken,
  setAccessCookie,
  setRefreshCookie,
} from "./cookies";

export function readToken(data: unknown, keys: string[]) {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) return value;
  }

  if (record.data && typeof record.data === "object") {
    return readToken(record.data, keys);
  }

  return null;
}

export async function verifyAccessToken(access: string) {
  try {
    const parts = access.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    
    // Check if token is expired (giving a 10 second buffer)
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp - 10 < currentTime) {
      return false; // Expired
    }
    return true; // Still conceptually valid
  } catch {
    return false;
  }
=======
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
>>>>>>> feat/skillmap-v2
}

export async function refreshAccessTokenFromAuthService(refresh: string) {
  if (!refresh) return null;

  const { res, data } = await gatewayFetch("/api/auth/token/refresh/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: BFF_TOKEN_HEADERS,
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });

<<<<<<< HEAD
  if (!res.ok) return null;

  const nextAccess = readToken(data, ["access", "access_token", "token"]);
  const nextRefresh = readToken(data, ["refresh", "refresh_token"]);

  if (nextAccess) {
    await setAccessCookie(nextAccess);
    // 若 backend 有回傳新的 refresh token（rotating refresh），也一併更新
    if (nextRefresh) {
      await setRefreshCookie(nextRefresh);
    }
    return nextAccess;
  }

  return null;
=======
  if (!res.ok || !data?.access) return null;
  await storeTokens(data); // rotating refresh token 也一併更新
  return data.access as string;
>>>>>>> feat/skillmap-v2
}

export async function getValidAccessToken() {
  const access = await getAccessToken();
<<<<<<< HEAD
=======
  if (access && (await verifyAccessToken(access))) return access;
>>>>>>> feat/skillmap-v2

  const refresh = await getRefreshToken();
  if (refresh) return await refreshAccessTokenFromAuthService(refresh);
  return null;
}

/** 目前使用者 id（僅供 BFF 日誌／顯示；後端一律自行從 token 驗證身分，不接受前端傳 user_id）。 */
export function userIdFromAccess(access: string): string | null {
  const id = decodeClaims(access)?.user_id;
  return id === undefined || id === null ? null : String(id);
}
