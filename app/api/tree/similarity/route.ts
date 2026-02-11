// app/api/tree/similarity/route.ts
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

export async function GET(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { searchParams } = new URL(req.url);

  const res = await fetch(
    `${SERVICES.tree.baseUrl}/api/v1/analysis/similarity?${searchParams}`,
    {
      headers: { Authorization: `Bearer ${access}` },
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) return jsonFail("Similarity failed", res.status, data);

  return Response.json({ ok: true, data });
}
