import { SERVICES } from "@/app/lib/services"
import { getValidAccessToken } from "@/app/lib/auth"
import { jsonFail, jsonOk } from "@/app/lib/apiResponse"

export async function POST(req: Request) {
  const access = await getValidAccessToken()
  if (!access) return jsonFail("Unauthorized", 401)

  const incoming = await req.formData()

  // 前端傳給 Document Service 的欄位通常是 pdf_file
  const pdf = incoming.get("pdf_file") as File | null
  if (!pdf) return jsonFail("Missing pdf_file", 400)

  // （可選）如果你也有 name 欄位
  const name = incoming.get("name")

  // STEP 1: 存 Document Service（用 pdf_file）
  const docForm = new FormData()
  docForm.append("pdf_file", pdf, pdf.name)
  if (name) docForm.append("name", String(name))

  const docRes = await fetch(`${SERVICES.document.baseUrl}/api/document/documents/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
    body: docForm,
  })

  if (!docRes.ok) {
    // console.log("docRes.status", docRes.status)
    const raw = await docRes.text().catch(() => "")
return jsonFail("File storage failed", docRes.status, { raw })
  }

  // STEP 2: 轉發給 Tree Service 生成（欄位要叫 file）
  const treeForm = new FormData()
  treeForm.append("file", pdf, pdf.name)

  const generateRes = await fetch(
    `${SERVICES.tree.baseUrl}/api/v1/tree/generate?job_type=computerScience`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${access}` },
      body: treeForm,
    }
  )

  if (!generateRes.ok) {
    const errorData = await generateRes.json().catch(() => null)
    return jsonFail("AI generation failed", generateRes.status, errorData)
  }

  const result = await generateRes.json()
  return jsonOk(result)
}