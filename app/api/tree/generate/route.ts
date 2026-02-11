// app/api/tree/generate/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function POST(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/v1/tree/generate", {
    baseUrl: SERVICES.tree.baseUrl,
    method: "POST",
    accessToken: access,
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) return jsonFail("Generate failed", res.status, data);
  return jsonOk(data);
}
