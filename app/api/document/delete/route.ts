// app/api/document/delete/route.ts
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail, jsonOk } from "@/app/lib/apiResponse";

export async function DELETE() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const { res, data } = await gatewayFetch("/api/document/delete/", {
    baseUrl: SERVICES.document.baseUrl,
    method: "DELETE",
    accessToken: access,
  });

  if (!res.ok) return jsonFail("Delete failed", res.status, data);
  return jsonOk(data);
}
