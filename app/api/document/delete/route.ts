// app/api/document/delete/route.ts
import { SERVICES } from "@/app/lib/services"
import { gatewayFetch } from "@/app/lib/gatewayFetch"
import { getValidAccessToken } from "@/app/lib/auth"
import { jsonFail, jsonOk } from "@/app/lib/apiResponse"

export async function DELETE() {
  const access = await getValidAccessToken()
  if (!access) return jsonFail("Unauthorized", 401)

  const status = await gatewayFetch("/api/document/documents/status/", {
    baseUrl: SERVICES.document.baseUrl,
    method: "GET",
    accessToken: access,
  })

  if (!status.res.ok) {
    return jsonFail("Fetch document status failed", status.res.status, status.data)
  }

  const documentId =
    status.data && typeof status.data === "object" && "id" in status.data
      ? (status.data as { id?: unknown }).id
      : null

  if (typeof documentId !== "number" && typeof documentId !== "string") {
    return jsonFail("No active document to delete", 404, status.data)
  }

  const { res, data } = await gatewayFetch(`/api/document/documents/${encodeURIComponent(String(documentId))}/`, {
    baseUrl: SERVICES.document.baseUrl,
    method: "DELETE",
    accessToken: access,
  })

  if (!res.ok) return jsonFail("Delete failed", res.status, data)
  return jsonOk(data ?? { deleted: true, id: documentId })
}
