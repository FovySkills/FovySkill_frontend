// lib/services.ts
// healthPath 都放在各服務的 API 前綴底下：正式環境四個 baseUrl 相同（https://api…），由 Caddy 依路徑轉發
import { ENV } from "./env";

export const SERVICES = {
  auth: { baseUrl: ENV.AUTH_BASE, healthPath: "/api/auth/health/" },
  document: { baseUrl: ENV.DOC_BASE, healthPath: "/api/document/health/" },
  tree: { baseUrl: ENV.TREE_BASE, healthPath: "/api/v1/health" },
  activity: { baseUrl: ENV.ACTIVITY_BASE, healthPath: "/api/activity/health" },
} as const;
