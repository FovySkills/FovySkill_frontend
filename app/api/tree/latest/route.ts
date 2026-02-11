// app/api/tree/latest/route.ts (Tree 已改版)
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const upstream = await fetch(`${SERVICES.tree.baseUrl}/api/v1/tree/latest`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access}` },
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok) return jsonFail("Latest tree failed", upstream.status, data);

  return Response.json({ ok: true, data });
}
