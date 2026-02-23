// app/api/document/delete/route.ts
import { NextRequest } from "next/server"
import { SERVICES } from "@/app/lib/services"
import { gatewayFetch } from "@/app/lib/gatewayFetch"
import { getValidAccessToken } from "@/app/lib/auth"
import { jsonFail, jsonOk } from "@/app/lib/apiResponse"

export async function DELETE(req: NextRequest) {
  const access = await getValidAccessToken()
  if (!access) return jsonFail("Unauthorized", 401)

  const id = req.nextUrl.searchParams.get("id")
  if (!id) return jsonFail("Missing document ID", 400)

  const { res, data } = await gatewayFetch(`/api/document/documents/${id}/`, {
    baseUrl: SERVICES.document.baseUrl,
    method: "DELETE",
    accessToken: access,
  })

  if (!res.ok) return jsonFail("Delete failed", res.status, data)
  return jsonOk(data)
}