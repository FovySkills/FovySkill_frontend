// app/api/document/preview/route.ts
import { SERVICES } from "@/app/lib/services"
import { getValidAccessToken } from "@/app/lib/auth"
import { jsonFail } from "@/app/lib/apiResponse"

export async function GET() {
  const access = await getValidAccessToken()
  if (!access) return jsonFail("Unauthorized", 401)

  const upstream = await fetch(`${SERVICES.document.baseUrl}/api/document/documents/preview/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    cache: "no-store",
  })

  if (!upstream.ok) {
    return jsonFail("View document failed", upstream.status)
  }

  const blob = await upstream.blob()

  return new Response(blob, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "application/pdf",
      "Content-Disposition": "inline; filename=document.pdf",
    },
  })
}
