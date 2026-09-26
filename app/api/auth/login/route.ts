import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
<<<<<<< HEAD
import { setAccessCookie, setRefreshCookie } from "@/app/lib/cookies";
import { readToken } from "@/app/lib/auth";

function getErrorInfo(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      cause: error.cause instanceof Error ? error.cause.message : String(error.cause || ""),
    };
  }

  return {
    message: String(error),
    name: undefined,
    cause: "",
  };
}
=======
import { BFF_TOKEN_HEADERS, storeTokens } from "@/app/lib/auth";
>>>>>>> feat/skillmap-v2

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const identifier = String(body?.email || body?.username || "").trim();
    if (!identifier || !body?.password) return jsonFail("請輸入 Email 與密碼", 400);

    const { res, data } = await gatewayFetch("/api/auth/login/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
<<<<<<< HEAD
      body: JSON.stringify(body),
      timeoutMs: 3000,
=======
      headers: BFF_TOKEN_HEADERS,
      body: JSON.stringify({ username: identifier, password: body.password }),
      timeoutMs: 5000,
>>>>>>> feat/skillmap-v2
    });

    if (res.status === 401) return jsonFail("Email 或密碼錯誤", 401);
    if (!res.ok) return jsonFail("登入失敗", res.status, data);
    if (!data?.access) return jsonFail("Invalid token response", 502);

<<<<<<< HEAD
    const access = readToken(data, ["access", "access_token", "token"]);
    const refresh = readToken(data, ["refresh", "refresh_token"]);

    if (!access) return jsonFail("Invalid token response", 502, data);

    await setAccessCookie(access);
    if (refresh) {
      await setRefreshCookie(refresh);
    }

    const profile = await gatewayFetch("/api/auth/me/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "GET",
      accessToken: access,
      timeoutMs: 3000,
    }).catch(() => null);

    return jsonOk({ loggedIn: true, user: profile?.data ?? null });
  } catch (e: unknown) {
    const error = getErrorInfo(e);
    return jsonFail(error.message || "Unhandled login error", 500, {
      name: error.name,
      cause: error.cause,
    });
=======
    await storeTokens(data);
    return jsonOk({ loggedIn: true, user: data.user ?? null, must_change_password: !!data.must_change_password });
  } catch (e) {
    return jsonFail(e instanceof Error ? e.message : "Unhandled login error", 500);
>>>>>>> feat/skillmap-v2
  }
}
