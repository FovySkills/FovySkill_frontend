// app/api/auth/employees/[id]/delete/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { hasEmployeeAdminRole } from "@/app/lib/rbac";
import { NextRequest } from "next/server";
type Ctx = { params: { id: string } | Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, context: Ctx) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!hasEmployeeAdminRole(access)) return jsonFail("Forbidden", 403);

  const { id } = await Promise.resolve(context.params);

  const { res, data } = await gatewayFetch(
    `/api/auth/employees/${encodeURIComponent(id)}/delete/`,
    {
      baseUrl: SERVICES.auth.baseUrl,
      method: "DELETE",
      accessToken: access,
    }
  );

  if (!res.ok) return jsonFail("Delete employee failed", res.status, data);
  return jsonOk(data ?? { deleted: true });
}