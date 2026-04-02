import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

function decodeJwtPayload(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT");
  return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
}

export async function GET() {
  const access = await getValidAccessToken(); // ✅ 会自动 refresh
  if (!access) return jsonFail("Unauthorized", 401);

  let userId: string | number | undefined;
  try {
    const payload = decodeJwtPayload(access);
    userId = payload.user_id;
  } catch (e: any) {
    return jsonFail("Bad token", 400, { message: e?.message });
  }

  if (!userId) return jsonFail("Missing user_id", 401);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  let upstream: Response;
  try {
    upstream = await fetch(
      `${SERVICES.tree.baseUrl}/api/v1/tree/latest/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
        cache: "no-store",
        signal: controller.signal,
      }
    );
  } catch (e: any) {
    const isTimeout = e?.name === "AbortError";
    return jsonFail(isTimeout ? "Tree service timeout" : "Tree service unreachable", 503);
  } finally {
    clearTimeout(timer);
  }

  const data = await upstream.json().catch(() => null);
  if (!upstream.ok) return jsonFail("Latest tree failed", upstream.status, data);

  return Response.json({ ok: true, data });
}
