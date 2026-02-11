// app/api/document/status/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { res, data } = await gatewayFetch("/api/document/status/", {
    baseUrl: SERVICES.document.baseUrl,
    method: "GET",
    accessToken: access,
  });

  if (!res.ok) return jsonFail("Fetch status failed", res.status, data);
  return jsonOk(data);
}
