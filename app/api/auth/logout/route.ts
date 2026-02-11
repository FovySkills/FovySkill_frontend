// app/api/auth/logout/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonOk } from "@/app/lib/apiResponse";
import { clearAuthCookies, getAccessToken } from "@/app/lib/cookies";

export async function POST() {
  const access =await getAccessToken();

  // best-effort：就算後端失敗也清 cookie
  if (access) {
    await gatewayFetch("/api/auth/logout/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
      accessToken: access,
    }).catch(() => null);
  }

  clearAuthCookies();
  return jsonOk({ loggedOut: true });
}
