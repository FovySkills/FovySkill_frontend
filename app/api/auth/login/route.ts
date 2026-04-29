import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { setAccessCookie, setRefreshCookie } from "@/app/lib/cookies";

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

function readToken(data: unknown, keys: string[]) {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) return value;
  }

  if (record.data && typeof record.data === "object") {
    return readToken(record.data, keys);
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body?.username || !body?.password) return jsonFail("Missing username/password", 400);

    const { res, data } = await gatewayFetch("/api/auth/login/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "POST",
      body: JSON.stringify(body),
      timeoutMs: 3000, // ✅ 測試先縮短，不要每次卡 8 秒
    });

    if (!res.ok) return jsonFail("Login failed", res.status, data);

    const access = readToken(data, ["access", "access_token", "token"]);
    const refresh = readToken(data, ["refresh", "refresh_token"]);

    if (!access) return jsonFail("Invalid token response", 502, data);

    await setAccessCookie(access);
    if (refresh) {
      await setRefreshCookie(refresh);
    }

    return jsonOk({ loggedIn: true ,user: data.user ?? null,});
  } catch (e: unknown) {
    const error = getErrorInfo(e);
    return jsonFail(error.message || "Unhandled login error", 500, {
      name: error.name,
      cause: error.cause,
    });
  }
}
