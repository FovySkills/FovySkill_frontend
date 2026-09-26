// lib/env.ts
// 服務位址一律由環境變數提供（本機 .env.local、部署時由平台設定），不再寫死 IP。
function url(name: string, fallback: string) {
  return (process.env[name] || fallback).replace(/\/+$/, "");
}

export const ENV = {
<<<<<<< HEAD
  // AUTH_BASE: process.env.AUTH_SVC_BASE_URL!,
  // DOC_BASE: process.env.DOCUMENT_SVC_BASE_URL!,
  // TREE_BASE: process.env.TREE_SVC_BASE_URL!,
  AUTH_BASE: "http://34.63.132.167:8001",
  DOC_BASE: "http://34.63.132.167:8003",
  TREE_BASE: "http://34.63.132.167:8002",
=======
  AUTH_BASE: url("AUTH_SVC_BASE_URL", "http://localhost:8001"),
  DOC_BASE: url("DOCUMENT_SVC_BASE_URL", "http://localhost:8003"),
  TREE_BASE: url("TREE_SVC_BASE_URL", "http://localhost:8002"),
  ACTIVITY_BASE: url("ACTIVITY_SVC_BASE_URL", "http://localhost:8004"),

  // 瀏覽器直接上傳檔案用的 document-service 公開網址（正式環境為 https://api.你的網域）
  DOCUMENT_PUBLIC_URL: url("DOCUMENT_PUBLIC_URL", process.env.DOCUMENT_SVC_BASE_URL || "http://localhost:8003"),
  // 與 document-service 的 UPLOAD_TICKET_SECRET 相同
  UPLOAD_TICKET_SECRET: process.env.UPLOAD_TICKET_SECRET || "",
>>>>>>> feat/skillmap-v2

  ACCESS_COOKIE: process.env.ACCESS_COOKIE || "access_token",
  REFRESH_COOKIE: process.env.REFRESH_COOKIE || "refresh_token",

  COOKIE_SECURE: (process.env.COOKIE_SECURE || "false") === "true" && process.env.NODE_ENV === "production",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

// 前端可見（Google Identity Services 需要 client id）
export const PUBLIC_ENV = {
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
} as const;
