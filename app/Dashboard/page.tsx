"use client"

import { useActionState, useEffect, useState, startTransition } from "react"
import { useRouter } from "next/navigation"
import SelectionCard from "./Component/SelectionCard"
import UserProperty from "./Component/UserProperty"
import UserBar from "./Component/UserBar"
import DashboardButton from "./Component/DashboardButton"

const MANAGER_TEAM_ROUTE = "/TeamManagement"

type UserProfile = {
  username?: string
  position?: string
  department_name?: string
  email?: string
  user_type?: "employee" | "manager" | string
}

type MeResponse = {
  user_type?: string
  data?: {
    user_type?: string
    username?: string
    position?: string
    department_name?: string
    email?: string
    user?: UserProfile
    data?: {
      user_type?: string
      username?: string
      position?: string
      department_name?: string
      email?: string
      user?: UserProfile
    }
  }
}

function getUserProfile(payload: MeResponse, previousState: UserProfile | null) {
  const user =
    payload?.data?.user ??
    payload?.data?.data?.user ??
    payload?.data?.data ??
    payload?.data ??
    previousState

  if (!user) return previousState

  const userType =
    user.user_type ??
    payload?.data?.user_type ??
    payload?.data?.data?.user_type ??
    payload?.user_type

  return { ...user, user_type: userType }
}

export default function Dashboard() {
  const router = useRouter()
  const [isVisible, setVisible] = useState<boolean>(false)
  const [me, dispatchMe, isPending] = useActionState(getMyData, null)

  async function getMyData(previousState: UserProfile | null) {
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

      const empJson = await empRes.json() as MeResponse
      return getUserProfile(empJson, previousState)
    } catch {
      router.replace("/")
      return previousState
    }
  }

  useEffect(() => {
    startTransition(() => {
      dispatchMe()
    })
  }, [dispatchMe])

  function RedirectToPage(pageName: string) {
    router.push(pageName)
  }

  const isManager = String(me?.user_type ?? "").toLowerCase() === "manager"

  const growthCard = (
    <SelectionCard
      title="我要成長"
      description="技能提升"
      icon="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
      image="./graphLeft.svg"
      ButtonAction={() => RedirectToPage("/Growth")}
      buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]"
      subtitle="上傳履歷 生成技能地圖 看見成長路徑"
    />
  )

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {isManager ? (
        <div className="grid min-h-screen w-full grid-cols-1 gap-y-6 py-8 md:grid-cols-2 md:gap-y-0 md:py-0">
          <ManagerTeamButton onClick={() => RedirectToPage(MANAGER_TEAM_ROUTE)} />
          {growthCard}
        </div>
      ) : (
        <div className="grid min-h-screen w-full grid-cols-1">
          <div className="w-full max-w-[1000px] h-full mx-auto flex">{growthCard}</div>
        </div>
      )}

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

function ManagerTeamButton({ onClick }: { onClick: () => void }) {
  return (
    <section className="w-[90%] min-h-[260px] h-auto md:h-[78%] m-auto rounded-[20px] bg-[rgba(51,51,51,1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] text-white grid grid-rows-[minmax(0,1fr)_auto] overflow-visible">
      <div className="flex min-h-0 flex-col justify-center px-8 lg:px-12 py-6">
        <h1 className="text-[26px] lg:text-[34px] font-semibold mb-3 leading-tight">建立與追蹤團隊</h1>
        <p className="text-white/85 text-[18px] lg:text-[24px] mb-4 leading-tight">成員管理 檢視夥伴技能樹</p>
        <p className="text-white/55 text-[13px] lg:text-[15px] leading-relaxed">
          指派，管理團隊成員賬號，檢視團隊成員個人技能樹，追蹤伙伴成長
        </p>
      </div>

      <div className="w-full px-8 lg:px-12 pb-5 lg:pb-8 overflow-visible">
        <DashboardButton
          title="管理團隊"
          ButtonAction={onClick}
          buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]"
          wrapperClassName="justify-end"
        />
      </div>
    </section>
  )
}
