// app/api/document/upload/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function POST(req: Request) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const formData = await req.formData();

  const { res, data } = await gatewayFetch("/api/document/upload/", {
    baseUrl: SERVICES.document.baseUrl,
    method: "POST",
    accessToken: access,
    body: formData, // ⚠️ 不要 JSON.stringify
  });

  if (!res.ok) return jsonFail("Upload failed", res.status, data);
  return jsonOk(data);
}
