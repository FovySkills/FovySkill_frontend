// app/api/auth/register/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // 1️⃣ 解析 JSON
  console.log("[register route] hit");
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

  const { username, password, user_type } = body as {
    username?: string;
    password?: string;
    user_type?: string;
  };

  // 3️⃣ 必填字段校验
  if (!username || !password || !user_type) {
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
      password,
      user_type,
    }),
    // 如果 gatewayFetch 没自动设置 header，就加：
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return jsonFail("Register failed", res.status, data);
  }

  return jsonOk(data);
}
