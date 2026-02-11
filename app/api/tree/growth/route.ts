// app/api/tree/growth/route.ts
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

export async function GET(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("user_id");
  const jobTitle = searchParams.get("job_title");

  if (!userId) return jsonFail("Missing user_id", 400);
  if (!jobTitle) return jsonFail("Missing job_title", 400);

  const upstream = await fetch(
    `${SERVICES.tree.baseUrl}/api/v1/analysis/growth?${searchParams.toString()}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
    }
  );

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return jsonFail("Growth failed", upstream.status, data);
  }

  return Response.json({ ok: true, data });
}
