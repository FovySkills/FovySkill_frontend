// app/api/submissions/ticket/route.ts
// 簽發上傳票：Vercel Function 的 request body 上限 4.5MB，檔案改由瀏覽器直接上傳到 document-service。
// 這裡只做兩件事：向 auth-service 確認 token 真的有效（不能只 decode cookie），再簽一張 5 分鐘的票。
import { randomUUID } from "node:crypto";
import { SERVICES } from "@/app/lib/services";
import { ENV } from "@/app/lib/env";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";
import { signUploadTicket, TICKET_TTL_S } from "@/app/lib/uploadTicket";

export async function POST() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  if (!ENV.UPLOAD_TICKET_SECRET) return jsonFail("Upload is not configured", 500);

  const { res, data } = await gatewayFetch("/api/auth/me/", {
    baseUrl: SERVICES.auth.baseUrl,
    accessToken: access,
    timeoutMs: 5000,
  });
  const userId = data?.user?.id;
  if (!res.ok || userId === undefined || userId === null) return jsonFail("Unauthorized", 401);

  const ticket = signUploadTicket({
    userId: String(userId),
    jti: randomUUID().replace(/-/g, ""),
    nowS: Math.floor(Date.now() / 1000),
    secret: ENV.UPLOAD_TICKET_SECRET,
  });
  return jsonOk({
    ticket,
    upload_url: `${ENV.DOCUMENT_PUBLIC_URL}/api/document/submissions/`,
    expires_in: TICKET_TTL_S,
  });
}
