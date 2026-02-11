// app/api/document/download/route.ts
import { SERVICES } from "@/app/lib/services";
import { getValidAccessToken } from "@/app/lib/auth";
import { jsonFail } from "@/app/lib/apiResponse";

export async function GET() {
  const access = await getValidAccessToken();
  if (!access) return jsonFail("Unauthorized", 401);

  const res = await fetch(
    `${SERVICES.document.baseUrl}/api/document/download/`,
    {
      headers: { Authorization: `Bearer ${access}` },
    }
  );

  if (!res.ok) {
    return jsonFail("Download failed", res.status);
  }

  const blob = await res.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/pdf",
      "Content-Disposition": "attachment; filename=document.pdf",
    },
  });
}
