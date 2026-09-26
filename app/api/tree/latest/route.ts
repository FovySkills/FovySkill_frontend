// app/api/tree/latest/route.ts — 目前使用者最新的技能地圖（身分由 tree-service 從 token 驗證，不再傳 user_id）
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  try {
    const { res, data } = await gatewayFetch("/api/v1/skillmaps/latest", {
      baseUrl: SERVICES.tree.baseUrl,
      accessToken: access,
      timeoutMs: 5000,
    });
    if (res.status === 404) return jsonFail("No skill map yet", 404);
    if (!res.ok) return jsonFail("Latest tree failed", res.status);
    return jsonOk(data?.data);
  } catch (e) {
    return jsonFail(String(e instanceof Error ? e.message : e).includes("timeout") ? "Tree service timeout" : "Tree service unreachable", 503);
  }
}
