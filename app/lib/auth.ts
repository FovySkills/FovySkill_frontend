// lib/auth.ts
import "server-only";
import { SERVICES } from "./services";
import { gatewayFetch } from "./gatewayFetch";
import {
  getAccessToken,
  getRefreshToken,
  setAccessCookie,
} from "./cookies";
import { ENV } from "./env";

export async function verifyAccessToken(access: string) {
  const { res } = await gatewayFetch("/api/auth/token/verify/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify({ token: access }),
  });
  return res.ok;
}

export async function refreshAccessTokenFromAuthService(refresh: string) {
  if (!refresh) return null;

  const { res, data } = await gatewayFetch("/api/auth/token-refresh/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: {
      body: `refresh_token=${encodeURIComponent(refresh)}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  if (data?.access) {
    await setAccessCookie(data.access);
    return data.access as string;
  }

  return null;
}

export async function getValidAccessToken() {
  const access = await getAccessToken();
  return access;
}
