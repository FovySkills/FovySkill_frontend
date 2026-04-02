import { NextResponse } from "next/server"
import { SERVICES } from "@/app/lib/services"
import { gatewayFetch } from "@/app/lib/gatewayFetch"
import { getValidAccessToken } from "@/app/lib/auth"

export async function GET() {
  try {
    const access = await getValidAccessToken()

    if (!access) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const data = await gatewayFetch("/api/auth/me/", {
      baseUrl: SERVICES.auth.baseUrl,
      method: "GET",
      accessToken: access,
    }).catch(() => null)

    if (!data) {
      return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}