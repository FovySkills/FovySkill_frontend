// app/api/activity/summary/route.ts — 個人使用頻率
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const { res, data } = await gatewayFetch("/api/activity/me/summary", { baseUrl: SERVICES.activity.baseUrl, accessToken: access });
  if (!res.ok) return jsonFail("Failed to load summary", res.status);
  return jsonOk(data?.data);
}
