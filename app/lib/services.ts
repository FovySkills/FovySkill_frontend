// lib/services.ts
import { ENV } from "./env";

export const SERVICES = {
  auth: { baseUrl: ENV.AUTH_BASE, healthPath: "/health/" },
  document: { baseUrl: ENV.DOC_BASE, healthPath: "/health/" },
  tree: { baseUrl: ENV.TREE_BASE, healthPath: "/health/" },
} as const;
