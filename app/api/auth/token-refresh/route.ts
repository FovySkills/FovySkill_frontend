// app/api/auth/token-refresh/route.ts
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { refreshAccessToken } from "@/app/lib/auth";

export async function POST() {
  const access = await refreshAccessToken();
  if (!access) return jsonFail("Refresh failed", 401);
  return jsonOk({ refreshed: true });
}
