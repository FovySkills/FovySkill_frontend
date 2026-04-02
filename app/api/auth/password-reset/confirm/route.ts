// app/api/auth/password-reset/confirm/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/auth/password-reset/confirm/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });

  if (!res.ok) return jsonFail("Password reset confirm failed", res.status, data);
  return jsonOk(data);
}
