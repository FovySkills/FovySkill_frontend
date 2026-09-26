import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { BFF_TOKEN_HEADERS, storeTokens } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const identifier = String(body?.email || body?.username || "").trim();
    if (!identifier || !body?.password) return jsonFail("請輸入 Email 與密碼", 400);

    const { res, data } = await gatewayFetch("/api/auth/login/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
      headers: BFF_TOKEN_HEADERS,
      body: JSON.stringify({ username: identifier, password: body.password }),
      timeoutMs: 5000,
    });

    if (res.status === 401) return jsonFail("Email 或密碼錯誤", 401);
    if (!res.ok) return jsonFail("登入失敗", res.status, data);
    if (!data?.access) return jsonFail("Invalid token response", 502);

    await storeTokens(data);
    return jsonOk({ loggedIn: true, user: data.user ?? null, must_change_password: !!data.must_change_password });
  } catch (e) {
    return jsonFail(e instanceof Error ? e.message : "Unhandled login error", 500);
  }
}
