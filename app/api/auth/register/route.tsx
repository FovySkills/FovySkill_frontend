// app/api/auth/register/route.ts — Email 註冊（成功後直接登入）
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { BFF_TOKEN_HEADERS, storeTokens } from "@/app/lib/auth";

<<<<<<< HEAD
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonFail("Invalid JSON body", 400);
=======
function firstError(err: unknown): string | null {
  if (!err || typeof err !== "object") return typeof err === "string" ? err : null;
  for (const v of Object.values(err as Record<string, unknown>)) {
    if (Array.isArray(v) && v.length) return String(v[0]);
    if (typeof v === "string") return v;
>>>>>>> feat/skillmap-v2
  }
  return null;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim();
  const password = String(body?.password || "");
  const display_name = String(body?.display_name || "").trim();
  if (!email || !password || !display_name) return jsonFail("請填寫名字、Email 與密碼", 400);

<<<<<<< HEAD
  const { username, email, password, user_type } = body as {
    username?: string;
    email?: string;
    password?: string;
    user_type?: string;
  };

  if (!username || !email || !password || !user_type) {
    return jsonFail("Missing required fields", 400);
  }

  if (!["employee", "manager"].includes(user_type)) {
    return jsonFail("Invalid user_type", 400);
  }

  // 4️⃣ 转发到 auth service
  const { res, data } = await gatewayFetch("/api/auth/test-register/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      user_type,
      department_id: 1,
      department_name: "1",
    }),
    headers: { "Content-Type": "application/json" },
=======
  const { res, data } = await gatewayFetch("/api/auth/register/", {
    baseUrl: SERVICES.auth.baseUrl,
    method: "POST",
    headers: BFF_TOKEN_HEADERS,
    body: JSON.stringify({ email, password, display_name }),
>>>>>>> feat/skillmap-v2
  });

  if (!res.ok) return jsonFail(firstError(data?.error) || "註冊失敗", res.status, data);
  await storeTokens(data);
  return jsonOk({ loggedIn: true, user: data?.user ?? null });
}
