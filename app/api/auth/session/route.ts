// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ENV } from "@/app/lib/env";

export async function GET() {
    const store = await cookies();
    const access = store.get(ENV.ACCESS_COOKIE)?.value;
    const refresh = store.get(ENV.REFRESH_COOKIE)?.value;

    if (!access && !refresh) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
}
