// lib/auth.ts
import "server-only";
import { SERVICES } from "./services";
import { gatewayFetch } from "./gatewayFetch";
import {
  getAccessToken,
  getRefreshToken,
  setAccessCookie,
  setRefreshCookie,
} from "./cookies";
import { ENV } from "./env";

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
  } catch (e) {
    return false;
  }
}

export async function refreshAccessTokenFromAuthService(refresh: string) {
  if (!refresh) return null;

  const { res, data } = await gatewayFetch("/api/auth/token-refresh/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify({ refresh }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  if (data?.access) {
    await setAccessCookie(data.access);
    // 若 backend 有回傳新的 refresh token（rotating refresh），也一併更新
    if (data.refresh) {
      await setRefreshCookie(data.refresh);
    }
    return data.access as string;
  }

  return null;
}

export async function getValidAccessToken() {
  let access = await getAccessToken();

  // 如果有 access token，先去 auth server 驗證是否還有效
  if (access) {
    const isValid = await verifyAccessToken(access);
    if (isValid) {
      return access;
    }
  }

  // 若無 access token 或已經過期失效，嘗試使用 refresh token 換發新憑證
  const refresh = await getRefreshToken();
  if (refresh) {
    return await refreshAccessTokenFromAuthService(refresh);
  }

  return null;
}
