// app/api/auth/register/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonFail("Invalid JSON body", 400);
  }

  // 2️⃣ 基本结构校验
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return jsonFail("Body must be a JSON object", 400);
  }

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
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return jsonFail("Register failed", res.status, data);
  }

  return jsonOk(data);
}
