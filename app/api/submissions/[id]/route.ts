// app/api/submissions/[id]/route.ts — 提交狀態（前端 polling）
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const { id } = await ctx.params;
  if (!/^[0-9a-fA-F-]{32,36}$/.test(id)) return jsonFail("Not found", 404);

  const { res, data } = await gatewayFetch(`/api/document/submissions/${id}/`, {
    baseUrl: SERVICES.document.baseUrl,
    accessToken: access,
    timeoutMs: 5000,
  });
  if (!res.ok) return jsonFail("Not found", res.status);
  return jsonOk(data?.data);
}
