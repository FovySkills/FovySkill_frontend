// app/api/auth/employees/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";

export async function GET(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { search } = new URL(req.url);
  const { res, data } = await gatewayFetch(`/api/auth/employees/${search}`, {
    baseUrl: SERVICES.auth.baseUrl,
    method: "GET",
    accessToken: access,
  });

  if (!res.ok) return jsonFail("Fetch employees failed", res.status, data);
  return jsonOk(data);
}
