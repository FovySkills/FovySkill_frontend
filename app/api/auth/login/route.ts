import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { setAccessCookie, setRefreshCookie } from "@/app/lib/cookies";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body?.username || !body?.password) return jsonFail("Missing username/password", 400);

    const { res, data } = await gatewayFetch("/api/auth/login/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
      body: JSON.stringify(body),
      timeoutMs: 3000, // ✅ 測試先縮短，不要每次卡 8 秒
    });

    if (!res.ok) return jsonFail("Login failed", res.status, data);

    if (!data?.access) return jsonFail("Invalid token response", 502, data);

    await setAccessCookie(data.access);
    await setRefreshCookie(data.refresh);

    return jsonOk({ loggedIn: true ,user: data.user ?? null,});
  } catch (e: any) {
    return jsonFail(e?.message || "Unhandled login error", 500, {
      name: e?.name,
      
      cause: e?.cause?.message || String(e?.cause || ""),
    });
  }
}
