import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getValidAccessToken } from "@/app/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { userId } = await context.params;

  const { res, data } = await gatewayFetch(
    `/api/v1/tree/latest/${encodeURIComponent(userId)}`,
    {
      baseUrl: SERVICES.tree.baseUrl,
      method: "GET",
      accessToken: access,
      timeoutMs: 15000,
    }
  );

  if (!res.ok) return jsonFail("Latest tree failed", res.status, data);
  return jsonOk(data);
}
