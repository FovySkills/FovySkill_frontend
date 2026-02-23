// app/api/auth/token-refresh/route.ts
import { NextRequest } from "next/server";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { refreshAccessTokenFromAuthService } from "@/app/lib/auth";
import { getRefreshToken } from "@/app/lib/cookies"; 

export async function POST(req: NextRequest) {
  // 1. 先取得 refresh token
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return jsonFail("No refresh token found", 401);
  }

  // 2. 把 token 傳進去
  const access = await refreshAccessTokenFromAuthService(refreshToken);
  
  if (!access) return jsonFail("Refresh failed", 401);
  
  return jsonOk({ refreshed: true });
}