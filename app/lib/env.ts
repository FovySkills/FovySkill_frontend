// lib/env.ts
export const ENV = {
  AUTH_BASE: process.env.AUTH_SVC_BASE_URL!,
  DOC_BASE: process.env.DOCUMENT_SVC_BASE_URL!,
  TREE_BASE: process.env.TREE_SVC_BASE_URL!,

  ACCESS_COOKIE: process.env.ACCESS_COOKIE || "access_token",
  REFRESH_COOKIE: process.env.REFRESH_COOKIE || "refresh_token",

  COOKIE_SECURE: (process.env.COOKIE_SECURE || "false") === "true",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

function assertEnv() {
  const required = ["AUTH_SVC_BASE_URL", "DOCUMENT_SVC_BASE_URL", "TREE_SVC_BASE_URL"];
  for (const k of required) {
    if (!process.env[k]) throw new Error(`Missing env: ${k}`);
  }
}
assertEnv();
