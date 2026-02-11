// app/api/auth/check-username/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.username) return jsonFail("Missing username", 400);

  const { res, data } = await gatewayFetch("/api/auth/check-username/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) return jsonFail("Check username failed", res.status, data);
  return jsonOk(data);
}
