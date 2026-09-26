// app/api/auth/google/route.ts — Google ID token → 我們自己的 JWT
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { BFF_TOKEN_HEADERS, storeTokens } from "@/app/lib/auth";

const REJECT_MESSAGE: Record<string, string> = {
  email_not_verified: "這個 Google 帳號的 Email 尚未驗證",
  email_bound_to_another_google_account: "這個 Email 已綁定另一個 Google 帳號",
  account_disabled: "帳號已停用，請聯絡管理者",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const credential = String(body?.credential || "");
  if (!credential) return jsonFail("Missing credential", 400);

  const { res, data } = await gatewayFetch("/api/auth/google/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: BFF_TOKEN_HEADERS,
    body: JSON.stringify({ credential }),
  });

  if (!res.ok) {
    const reason = typeof data?.error === "string" ? data.error : "";
    return jsonFail(REJECT_MESSAGE[reason] || "Google 登入失敗", res.status);
  }
  await storeTokens(data);
  return jsonOk({ loggedIn: true, needs_onboarding: !!data?.needs_onboarding, user: data?.user ?? null });
}
