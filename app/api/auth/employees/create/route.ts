// app/api/auth/employees/create/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { hasEmployeeAdminRole } from "@/app/lib/rbac";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!hasEmployeeAdminRole(access)) return jsonFail("Forbidden", 403);

  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/auth/employees/create/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    accessToken: access,
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) return jsonFail("Create employee failed", res.status, data);
  return jsonOk(data);
}