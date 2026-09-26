"use client"

import { useActionState, useEffect, useState, startTransition } from "react"
import { useRouter } from "next/navigation"
import SelectionCard from "./Component/SelectionCard"
import UserProperty from "./Component/UserProperty"
import UserBar from "./Component/UserBar"

export default function Dashboard() {
  const router = useRouter()
  const [isVisible, setVisible] = useState<boolean>(false)
  const [me, dispatchMe, isPending] = useActionState(getMyData, null)

  async function getMyData(previousState: any) {
    try {
      let empRes = await fetch(`/api/auth/me/`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })

      if (empRes.status === 401) {
        const refreshRes = await fetch("/api/auth/token-refresh", {
          method: "POST",
          credentials: "include",
        })

        if (!refreshRes.ok) {
          router.replace("/")
          return previousState
        }

        empRes = await fetch(`/api/auth/me/`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        })

        if (!empRes.ok) {
          router.replace("/")
          return previousState
        }
      }

      if (!empRes.ok) {
        return previousState
      }

      const empJson = await empRes.json()
      return empJson["data"]["data"]["user"]
    } catch (err) {
      router.replace("/")
      return previousState
    }
  }

  useEffect(() => {
    startTransition(() => {
      dispatchMe()
    })
  }, [])

  function RedirectToPage(pageName: string) {
    router.push(pageName)
  }

  return (
    <div className="grid grid-cols-1 w-full h-screen">
      <div className="w-full max-w-[1000px] h-full mx-auto flex">
      <SelectionCard
        title="我要成長"
        description="技能提升"
        icon="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        image="./graphLeft.svg"
        ButtonAction={() => RedirectToPage("/Growth")}
        buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]"
        subtitle="上傳履歷 生成技能地圖 看見成長路徑"
      />
      </div>

      <button
        type="button"
        onClick={() => RedirectToPage("/History")}
        className="fixed bottom-8 right-8 rounded-full border border-white/40 px-5 py-2 text-sm text-white/90 shadow-[0_0_24px_rgba(0,0,0,0.8)] hover:bg-white/10"
      >
        使用紀錄
      </button>

      {!isVisible && <UserBar setVisible={setVisible} />}

      {!isPending && me && (
        <UserProperty isVisible={isVisible} setVisible={setVisible} me={me} />
      )}
    </div>
  )
}