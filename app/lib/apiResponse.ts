// lib/apiResponse.ts
import { NextResponse } from "next/server";

export function jsonOk(data: any, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonFail(message: string, status = 400, detail?: any) {
  return NextResponse.json({ ok: false, message, detail }, { status });
}
