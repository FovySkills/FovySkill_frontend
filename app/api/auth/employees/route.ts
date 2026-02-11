// app/api/auth/employees/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { hasEmployeeAdminRole } from "@/app/lib/rbac";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!hasEmployeeAdminRole(access)) return jsonFail("Forbidden", 403);

  const { res, data } = await gatewayFetch("/api/auth/employees/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "GET",
    accessToken: access,
  });

  if (!res.ok) return jsonFail("Fetch employees failed", res.status, data);
  return jsonOk(data);
}
