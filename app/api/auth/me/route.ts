import { SERVICES } from "@/app/lib/services"
import { gatewayFetch } from "@/app/lib/gatewayFetch"
import { getValidAccessToken } from "@/app/lib/auth"
import { jsonFail, jsonOk } from "@/app/lib/apiResponse"

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

export async function GET() {
  try {
    const access = await getValidAccessToken()

    if (!access) {
      return jsonFail("Unauthorized", 401)
    }

    const { res, data } = await gatewayFetch("/api/auth/me/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "GET",
      accessToken: access,
    })

    if (!res.ok) {
      return jsonFail("Failed to fetch profile", res.status, data)
    }

    return jsonOk(data)

  } catch (error: unknown) {
    return jsonFail(getErrorMessage(error) || "Internal Server Error", 500)
  }
}
