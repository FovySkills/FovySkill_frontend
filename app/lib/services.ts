// lib/services.ts
import { ENV } from "./env";

export const SERVICES = {
  auth: { baseUrl: ENV.AUTH_BASE, healthPath: "/health/" },
  document: { baseUrl: ENV.DOC_BASE, healthPath: "/api/document/health/" },
  tree: { baseUrl: ENV.TREE_BASE, healthPath: "/health/" },
} as const;
