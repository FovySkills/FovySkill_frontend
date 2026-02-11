// app/api/auth/change-password/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/auth/change-password/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    accessToken: access,
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) return jsonFail("Change password failed", res.status, data);
  return jsonOk(data);
}
