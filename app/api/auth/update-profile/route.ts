// app/api/auth/update-profile/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";

export async function PUT(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/auth/update-profile/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "PUT",
    accessToken: access,
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) return jsonFail("Update profile failed", res.status, data);
  return jsonOk(data);
}
