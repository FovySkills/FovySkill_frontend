// lib/apiResponse.ts
import { NextResponse } from "next/server";

export function jsonOk(data: unknown, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonFail(message: string, status = 400, detail?: unknown) {
  return NextResponse.json({ ok: false, message, detail }, { status });
}
