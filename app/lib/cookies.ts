// lib/cookies.ts
import "server-only";
import { cookies } from "next/headers";
import { ENV } from "./env";

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ENV.ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(ENV.REFRESH_COOKIE)?.value ?? null;
}

export async function setAccessCookie(access: string) {
  const store = await cookies();
  store.set(ENV.ACCESS_COOKIE, access, {
    httpOnly: true,
    secure: ENV.COOKIE_SECURE,
    sameSite: "lax",
    path: "/",
  });
}

export async function setRefreshCookie(refresh: string) {
  const store = await cookies();
  store.set(ENV.REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure: ENV.COOKIE_SECURE,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.set(ENV.ACCESS_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  store.set(ENV.REFRESH_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}
