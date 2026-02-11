// app/api/auth/employees/[id]/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { hasEmployeeAdminRole } from "@/app/lib/rbac";

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!hasEmployeeAdminRole(access)) return jsonFail("Forbidden", 403);

  const { res, data } = await gatewayFetch(`/api/auth/employees/${encodeURIComponent(ctx.params.id)}/`, {
    baseUrl: SERVICES.auth.baseUrl,
    method: "GET",
    accessToken: access,
  });

  if (!res.ok) return jsonFail("Fetch employee failed", res.status, data);
  return jsonOk(data);
}
