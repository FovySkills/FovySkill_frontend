// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { SERVICES } from "@/app/lib/services";
import { gatewayFetch } from "@/app/lib/gatewayFetch";
import { getValidAccessToken } from "@/app/lib/auth";

export async function GET() {
    try {
        const access = await getValidAccessToken();
        if (!access) {
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        const { res, data } = await gatewayFetch("/api/auth/me/", {
            baseUrl: SERVICES.auth.baseUrl,
            method: "GET",
            accessToken: access,
        });

        if (!res.ok) {
            return NextResponse.json(
                { ok: false, message: "Invalid session", detail: data },
                { status: res.status === 403 ? 403 : 401 }
            );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false }, { status: 401 });
    }
}
