// app/api/submissions/route.ts
// GET：我的提交紀錄
// （上傳不經過這裡：Vercel Function body 上限 4.5MB → 瀏覽器先拿 /api/submissions/ticket，再直接上傳到 document-service）
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);
  const { res, data } = await gatewayFetch("/api/document/submissions/?limit=50", {
    baseUrl: SERVICES.document.baseUrl,
    accessToken: access,
  });
  if (!res.ok) return jsonFail("Failed to load submissions", res.status);
  return jsonOk(data?.data ?? []);
}
