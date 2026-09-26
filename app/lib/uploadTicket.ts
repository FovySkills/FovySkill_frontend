// lib/uploadTicket.ts — 簽發上傳票（只在伺服器端執行）
// 格式與 document-service/src/domain/upload_ticket.py 相同，見 shared/contracts/upload-ticket.md
import { createHmac } from "node:crypto";

export const TICKET_TTL_S = 300;

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString("base64url");
}

export function signUploadTicket(args: { userId: string; jti: string; nowS: number; secret: string; ttlS?: number }): string {
  const { userId, jti, nowS, secret, ttlS = TICKET_TTL_S } = args;
  if (!secret) throw new Error("UPLOAD_TICKET_SECRET is not set");
  // key 依字母排序、無空白（與 Python json.dumps(sort_keys=True, separators=(",", ":")) 一致）
  const payload = { exp: nowS + ttlS, iat: nowS, jti, scope: "submission:create", sub: String(userId) };
  const payloadB64 = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret).update(`v1.${payloadB64}`).digest("base64url");
  return `v1.${payloadB64}.${sig}`;
}
