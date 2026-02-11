// app/api/auth/employees/[id]/update/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { hasEmployeeAdminRole } from "@/app/lib/rbac";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!hasEmployeeAdminRole(access)) return jsonFail("Forbidden", 403);

  const { id } = await context.params;
  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch(
    `/api/auth/employees/${encodeURIComponent(id)}/update/`,
    {
      baseUrl: SERVICES.auth.baseUrl,
      method: "PUT",
      accessToken: access,
      body: JSON.stringify(body ?? {}),
    }
  );

  if (!res.ok) return jsonFail("Update employee failed", res.status, data);
  return jsonOk(data);
}