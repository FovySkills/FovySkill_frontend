// app/api/tree/maps/[id]/route.ts — 某一次的技能地圖
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const { id } = await ctx.params;
  if (!/^[0-9a-zA-Z-]{1,64}$/.test(id)) return jsonFail("Not found", 404);
  const { res, data } = await gatewayFetch(`/api/v1/skillmaps/${id}`, { baseUrl: SERVICES.tree.baseUrl, accessToken: access });
  if (!res.ok) return jsonFail("Not found", res.status);
  return jsonOk(data?.data);
}
