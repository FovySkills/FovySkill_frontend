import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { getAccessToken } from "@/app/lib/cookies";

function decodeJwtPayload(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT");
  return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
}

export async function GET() {
  const access = await getAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  try {
    const payload = decodeJwtPayload(access);
    return jsonOk({
      user_id: payload.user_id,
      exp: payload.exp,
      iat: payload.iat,
      token_type: payload.token_type,
      raw: payload,
    });
  } catch (e: any) {
    return jsonFail("Bad token", 400, { message: e?.message });
  }
}
