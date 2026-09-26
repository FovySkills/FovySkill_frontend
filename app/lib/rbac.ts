// lib/rbac.ts
import "server-only";
import { decodeClaims } from "./domain/jwt";

export function decodeJwtPayload(token: string) {
  return decodeClaims(token);
}

export function hasEmployeeAdminRole(accessToken: string) {
  const payload = decodeClaims(accessToken) as (Record<string, unknown> | null);
  const role = payload?.role;
  const roles = payload?.roles;
  const userType = payload?.user_type;
  const set = new Set<string>([
    ...(Array.isArray(roles) ? (roles as string[]) : []),
    ...(typeof role === "string" ? [role] : []),
    ...(typeof userType === "string" ? [userType] : []),
  ]);
  return set.has("org_admin") || set.has("manager");
}
