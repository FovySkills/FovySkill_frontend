// lib/auth.ts
import "server-only";
import { SERVICES } from "./services";
import { gatewayFetch } from "./gatewayFetch";
import {
  getAccessToken,
  getRefreshToken,
  setAccessCookie,
} from "./cookies";

export async function verifyAccessToken(access: string) {
  const { res } = await gatewayFetch("/api/auth/token/verify/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify({ token: access }),
  });
  return res.ok;
}

export async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  // 🔥 重點：手動組 Cookie header
  const { res, data } = await gatewayFetch("/api/auth/token-refresh/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refresh}`,
    },
  });

  if (!res.ok) return null;

  if (data?.access) {
    setAccessCookie(data.access);
    return data.access as string;
  }

  return null;
}

export async function getValidAccessToken() {
  const access =await getAccessToken();
  if (!access) return await refreshAccessToken();

  const ok = await verifyAccessToken(access);
  if (ok) return access;

  return await refreshAccessToken();
}
