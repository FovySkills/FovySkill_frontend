// app/api/auth/onboarding/route.ts — 確認顯示名稱（Google 新使用者第一次登入）
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { BFF_TOKEN_HEADERS, getValidAccessToken, storeTokens } from "@/app/lib/auth";

export async function POST(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const body = await req.json().catch(() => null);

  const { res, data } = await gatewayFetch("/api/auth/onboarding/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    accessToken: access,
    headers: BFF_TOKEN_HEADERS,
    body: JSON.stringify({ display_name: body?.display_name ?? "", company_name: body?.company_name ?? "" }),
  });
  if (!res.ok) {
    const msg = data?.error?.display_name?.[0] || "儲存失敗";
    return jsonFail(msg, res.status, data);
  }
  await storeTokens(data); // 新 token：onboarded=true
  return jsonOk({ user: data?.user ?? null });
}
