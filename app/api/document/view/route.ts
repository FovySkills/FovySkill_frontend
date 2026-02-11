import { NextRequest } from "next/server";
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

export async function GET(_req: NextRequest) {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  // 直接向 document service 取檔
  const upstream = await fetch(`${SERVICES.document.baseUrl}/api/document/view/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    cache: "no-store",
  });

  if (!upstream.ok) {
    return jsonFail("View document failed", upstream.status);
  }

  const blob = await upstream.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "application/pdf",
      // inline: 直接在瀏覽器預覽
      "Content-Disposition": "inline; filename=document.pdf",
    },
  });
}
