"use client"

import { useMemo, useState } from "react"

type RegisterPayload = {
  username: string
  password: string
  user_type: "manager" | "employee"
}

export default function EmployeesCreatePage() {
  const [payloadText, setPayloadText] = useState<string>(() =>
    JSON.stringify(
      {
        username: "test_user",
        password: "test_password",
        user_type: "employee",
      } satisfies RegisterPayload,
      null,
      2
    )
  )

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<number | null>(null)
  const [responseText, setResponseText] = useState<string>("")

  const isJsonValid = useMemo(() => {
    try {
      JSON.parse(payloadText)
      return true
    } catch {
      return false
    }
  }, [payloadText])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setResponseText("")
    setStatus(null)

    let bodyObj: any
    try {
      bodyObj = JSON.parse(payloadText)
    } catch {
      setResponseText("❌ JSON 格式錯誤：請修正後再送出")
      return
    }

    // （可选）前端简单校验，避免送出后才知道缺字段
    const missing: string[] = []
    if (!bodyObj?.username) missing.push("username")
    if (!bodyObj?.password) missing.push("password")
    if (!bodyObj?.user_type) missing.push("user_type")
    if (bodyObj?.user_type && !["employee", "manager"].includes(bodyObj.user_type)) {
      setResponseText('❌ user_type 只能是 "employee" 或 "manager"')
      return
    }
    if (missing.length) {
      setResponseText(`❌ 缺少必填欄位：${missing.join(", ")}`)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyObj),
        credentials: "same-origin",
      })

      setStatus(res.status)

      const ct = res.headers.get("content-type") || ""
      const data = ct.includes("application/json") ? await res.json() : await res.text()

      setResponseText(typeof data === "string" ? data : JSON.stringify(data, null, 2))
    } catch (err: any) {
      setResponseText(`❌ fetch 失敗：${err?.message || String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const prettyStatus =
    status === null ? "" : status >= 200 && status < 300 ? "✅ 成功" : "❌ 失敗"

  const resetSample = (user_type: "employee" | "manager") => {
    setPayloadText(
      JSON.stringify(
        {
          username: user_type === "manager" ? "test_manager" : "test_employee",
          password: "test_password",
          user_type,
        } satisfies RegisterPayload,
        null,
        2
      )
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Test Register Page</h1>
          <p className="mt-2 text-sm text-zinc-400">
            會呼叫 <span className="text-zinc-200">POST /api/auth/register</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Body: username / password / user_type（employee 或 manager）
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Request JSON Body</label>
              <textarea
                className="h-64 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 font-mono text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                spellCheck={false}
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className={isJsonValid ? "text-emerald-400" : "text-red-400"}>
                  {isJsonValid ? "JSON 格式 OK" : "JSON 格式有誤"}
                </span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="text-zinc-300 hover:text-white underline underline-offset-4"
                    onClick={() => resetSample("employee")}
                  >
                    Reset employee sample
                  </button>
                  <button
                    type="button"
                    className="text-zinc-300 hover:text-white underline underline-offset-4"
                    onClick={() => resetSample("manager")}
                  >
                    Reset manager sample
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isJsonValid}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send POST"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">
                Response {status !== null ? `(${status})` : ""}
              </div>
              <div className="text-xs text-zinc-400">{prettyStatus}</div>
            </div>

            <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre-wrap break-words text-sm text-zinc-200">
              {responseText || "（尚未送出）"}
            </pre>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          小提醒：如果你 middleware 目前會擋 /api/auth/register，記得把它加到 isPublic() 白名單。
        </p>
      </div>
    </div>
  )
}
