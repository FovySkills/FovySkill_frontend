"use client"

// Google 新使用者第一次登入：確認在整個平台顯示的名字（與 Email 註冊時填的名字對齊）
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function OnboardingPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // 預填 Google 提供的名字
    fetch("/api/auth/me/", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const user = json?.data?.data?.user
        if (user) {
          setDisplayName(user.display_name || "")
          setCompanyName(user.company_name || "")
          setEmail(user.email || "")
        }
      })
      .catch(() => {})
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!displayName.trim()) {
      setError("請輸入名字")
      return
    }
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: displayName.trim(), company_name: companyName.trim() }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) {
        setError(json?.message || "儲存失敗")
        return
      }
      router.replace("/Growth")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#212121] text-zinc-300">
      <div className="w-[460px] h-[460px] rounded-full shadow-[0_0_80px_20px_rgba(255,255,255,0.25)] flex flex-col items-center justify-center px-16">
        <h1 className="text-2xl text-white tracking-wide mb-2">歡迎來到 FOVY</h1>
        <p className="text-xs text-zinc-400 mb-6 text-center">
          {email ? <>已使用 {email} 登入。<br /></> : null}
          請確認你在平台上顯示的名字
        </p>
        <form onSubmit={submit} className="w-full flex flex-col items-center gap-4">
          <input
            autoFocus
            required
            maxLength={50}
            placeholder="名字"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-transparent border border-zinc-700 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-zinc-500"
          />
          <input
            maxLength={100}
            placeholder="公司／學校（選填）"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-transparent border border-zinc-700 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-2 w-[200px] rounded-full bg-zinc-300 text-black font-medium py-3 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-white transition-all disabled:opacity-50"
          >
            {saving ? "儲存中…" : "開始使用"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  )
}
