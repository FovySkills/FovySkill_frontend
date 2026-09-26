"use client"

// 使用紀錄：個人時間軸（誰上傳了什麼、生成了什麼）＋使用頻率＋歷次技能地圖
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { useSkillmapStore } from "@/app/lib/skillmapStore"

type TimelineItem = { event_id: string; type: string; occurred_at: string; text: string; subject_id: string; payload: Record<string, unknown> }
// 使用頻率＝修改技能樹的次數＝上傳次數
type Summary = {
  window_days: number
  uploads_total: number
  uploads_last_7d: number
  uploads_in_window: number
  upload_days_in_window: number
  avg_days_between_uploads: number | null
  last_upload: string | null
  weekly: { week_start: string; uploads: number }[]
  skillmaps_generated: number
  skillmaps_failed: number
}
type MapItem = { id: string; created_at: string; domain: string | null; proposed_domain: string | null; owned_nodes: number; recommended_nodes: number; mode: string }

const TYPE_DOT: Record<string, string> = {
  "submission.created": "bg-blue-400",
  "skillmap.generated": "bg-emerald-400",
  "skillmap.failed": "bg-red-400",
  "submission.failed": "bg-red-400",
  "skillmap.viewed": "bg-zinc-500",
  "user.logged_in": "bg-zinc-400",
  "user.registered": "bg-violet-400",
  "user.onboarded": "bg-violet-400",
}

async function fetchTimeline(before: string | null): Promise<{ items: TimelineItem[]; next_before: string | null }> {
  const qs = new URLSearchParams({ limit: "30" })
  if (before) qs.set("before", before)
  const res = await fetch(`/api/activity/me?${qs}`, { cache: "no-store" })
  if (!res.ok) throw new Error("無法載入使用紀錄")
  const json = await res.json()
  return json.data
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
}

export default function HistoryPage() {
  const router = useRouter()
  const setGraphData = useSkillmapStore((s) => s.setGraphData)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [items, setItems] = useState<TimelineItem[]>([])
  const [nextBefore, setNextBefore] = useState<string | null>(null)
  const [maps, setMaps] = useState<MapItem[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const loadMore = useCallback(async (before: string) => {
    try {
      const page = await fetchTimeline(before)
      setItems((prev) => [...prev, ...page.items])
      setNextBefore(page.next_before)
    } catch {
      setError("載入失敗")
    }
  }, [])

  useEffect(() => {
    let alive = true
    Promise.all([
      fetch("/api/activity/summary", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
      fetch("/api/tree/maps", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
      fetchTimeline(null),
    ])
      .then(([s, m, page]) => {
        if (!alive) return
        setSummary(s?.data ?? null)
        setMaps(m?.data ?? [])
        setItems(page.items)
        setNextBefore(page.next_before)
      })
      .catch((e) => alive && setError(e instanceof Error ? e.message : "載入失敗"))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  async function openMap(id: string) {
    const res = await fetch(`/api/tree/maps/${id}`, { cache: "no-store" })
    const json = await res.json().catch(() => null)
    if (!res.ok || !json?.data?.graph) {
      setError("無法開啟這份技能地圖")
      return
    }
    setGraphData(JSON.stringify(json.data.graph))
    router.push("/Growth")
  }

  return (
    <div className="min-h-screen w-full bg-[#232323] text-zinc-200 px-6 md:px-16 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl text-white tracking-wide">使用紀錄</h1>
          <button onClick={() => router.push("/Growth")} className="rounded-full border border-white/40 px-4 py-1.5 text-sm hover:bg-white/10">
            回到技能地圖
          </button>
        </div>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        {loading && <p className="text-sm text-zinc-400">載入中…</p>}

        {summary && (
          <section className="mb-10">
            <h2 className="text-sm text-zinc-400 mb-3">使用頻率（修改技能樹＝上傳次數）</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <Stat label="總上傳次數" value={summary.uploads_total} />
              <Stat label="近 7 天" value={summary.uploads_last_7d} />
              <Stat label={`近 ${summary.window_days} 天`} value={summary.uploads_in_window} />
              <Stat
                label="平均間隔"
                value={summary.avg_days_between_uploads === null ? "—" : `${summary.avg_days_between_uploads} 天`}
              />
            </div>
            <WeeklyBars weekly={summary.weekly} />
            <p className="mt-2 text-xs text-zinc-500">
              生成成功 {summary.skillmaps_generated} 次、失敗 {summary.skillmaps_failed} 次
              {summary.last_upload ? `；最後上傳 ${fmt(summary.last_upload)}` : ""}
            </p>
          </section>
        )}

        <div className="grid md:grid-cols-[1fr_320px] gap-10">
          <section>
            <h2 className="text-sm text-zinc-400 mb-3">時間軸</h2>
            {items.length === 0 && !loading && <p className="text-sm text-zinc-500">還沒有任何紀錄。</p>}
            <ol className="relative border-l border-zinc-700 ml-2">
              {items.map((it) => (
                <li key={it.event_id} className="ml-5 mb-5">
                  <span className={`absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full ${TYPE_DOT[it.type] ?? "bg-zinc-500"}`} />
                  <div className="text-xs text-zinc-500">{fmt(it.occurred_at)}</div>
                  <div className="text-sm">
                    {it.text}
                    {it.type === "skillmap.generated" && typeof it.payload?.map_id === "string" && (
                      <button onClick={() => openMap(String(it.payload.map_id))} className="ml-2 text-xs text-blue-400 underline">
                        查看
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {nextBefore && (
              <button onClick={() => loadMore(nextBefore)} className="text-xs text-zinc-400 underline">
                載入更多
              </button>
            )}
          </section>

          <section>
            <h2 className="text-sm text-zinc-400 mb-3">歷次技能地圖</h2>
            <div className="space-y-2">
              {maps.length === 0 && !loading && <p className="text-sm text-zinc-500">尚未生成。</p>}
              {maps.map((m) => (
                <button
                  key={m.id}
                  onClick={() => openMap(m.id)}
                  className="w-full text-left rounded-xl border border-zinc-700 px-4 py-3 hover:border-zinc-500 hover:bg-white/5"
                >
                  <div className="text-xs text-zinc-500">{fmt(m.created_at)}</div>
                  <div className="text-sm text-white">{m.domain ?? m.proposed_domain ?? "新領域"}</div>
                  <div className="text-xs text-zinc-400">
                    {m.owned_nodes} 項技能 · {m.recommended_nodes} 項成長建議{m.mode === "open" ? " · AI 自訂分類" : ""}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function WeeklyBars({ weekly }: { weekly: Summary["weekly"] }) {
  const max = Math.max(1, ...weekly.map((w) => w.uploads))
  return (
    <div className="rounded-xl border border-zinc-700 px-4 pt-3 pb-2">
      <div className="text-xs text-zinc-400 mb-2">最近 8 週每週上傳次數</div>
      <div className="flex items-end gap-2 h-20">
        {weekly.map((w) => (
          <div key={w.week_start} className="flex-1 flex flex-col items-center justify-end h-full" title={`${w.week_start} 起：${w.uploads} 次`}>
            <span className="text-[10px] text-zinc-400 tabular-nums">{w.uploads || ""}</span>
            <div className="w-full rounded-t bg-blue-400/80" style={{ height: `${(w.uploads / max) * 100}%`, minHeight: w.uploads ? 4 : 1 }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        {weekly.map((w) => (
          <span key={w.week_start} className="flex-1 text-center text-[10px] text-zinc-500">{w.week_start.slice(5)}</span>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-zinc-700 px-4 py-3">
      <div className="text-2xl text-white tabular-nums">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  )
}
