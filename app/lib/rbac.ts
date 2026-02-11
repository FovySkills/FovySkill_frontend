// lib/rbac.ts
import "server-only";

function base64urlDecode(str: string) {
  // Node 可用 Buffer
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const s = (str + pad).replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(s, "base64").toString("utf8");
}

export function decodeJwtPayload(token: string): any | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(base64urlDecode(parts[1]));
  } catch {
    return null;
  }
}

export function hasEmployeeAdminRole(accessToken: string) {
  const payload = decodeJwtPayload(accessToken);
  const role = payload?.role;
  const roles = payload?.roles;
  const set = new Set<string>([
    ...(Array.isArray(roles) ? roles : []),
    ...(typeof role === "string" ? [role] : []),
  ]);
  return set.has("org_admin") || set.has("manager");
}
