// app/api/activity/me/route.ts — 個人使用紀錄時間軸
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const url = new URL(req.url);
  const qs = new URLSearchParams();
  qs.set("limit", String(Math.min(Math.max(Number(url.searchParams.get("limit")) || 30, 1), 200)));
  const before = url.searchParams.get("before");
  if (before) qs.set("before", before);

  const { res, data } = await gatewayFetch(`/api/activity/me?${qs}`, { baseUrl: SERVICES.activity.baseUrl, accessToken: access });
  if (!res.ok) return jsonFail("Failed to load activity", res.status);
  return jsonOk(data?.data);
}
