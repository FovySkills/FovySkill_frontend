// app/api/auth/logout/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonOk } from "@/app/lib/apiResponse";
import { clearAuthCookies, getAccessToken, getRefreshToken } from "@/app/lib/cookies";

export async function POST() {
  const access = await getAccessToken();
  const refresh = await getRefreshToken();

  // best-effort：就算後端失敗也清 cookie
  if (access) {
    await gatewayFetch("/api/auth/logout/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
      accessToken: access,
      body: refresh ? JSON.stringify({ refresh }) : undefined,
    }).catch(() => null);
  }

  await clearAuthCookies();
  return jsonOk({ loggedOut: true });
}
