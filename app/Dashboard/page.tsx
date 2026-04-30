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

  // const isManager = String(me?.user_type ?? "").toLowerCase() === "manager"
  const isManager = String(me?.user_type ?? "").toLowerCase() === "employee"

  return (
    <div className="relative h-screen w-full">
      <div className={isManager ? "grid grid-rows-[35%_65%] w-full h-full" : "grid grid-cols-2 w-full h-full"}>
        {isManager && (
          <ManagerTeamButton onClick={() => RedirectToPage(MANAGER_TEAM_ROUTE)} />
        )}

        <div className={isManager ? "grid grid-cols-2 w-full h-full" : "contents"}>
          <SelectionCard
            title="我要成長"
            description="技能提升"
            icon="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            image="./graphLeft.svg"
            ButtonAction={() => RedirectToPage("Growth")}
            buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]"
            subtitle="看見技能 探索學習路徑 找到您的潛力"
          />

          <SelectionCard
            title="我要轉職"
            description="職涯探索"
            icon="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            image="./graphRight.svg"
            ButtonAction={() => RedirectToPage("SwitchCareers")}
            buttonLayout="shadow-[10px_0_20px_2px_rgba(56,120,130,0.7),-10px_0_20px_rgba(84,117,78,0.6)]"
            subtitle="探索符合您技能與抱負的內部機會"
          />
        </div>
      </div>

      {!isVisible && <UserBar setVisible={setVisible} />}

      {!isPending && me && (
        <UserProperty isVisible={isVisible} setVisible={setVisible} me={me} />
      )}
    </div>
  )
}

function ManagerTeamButton({ onClick }: { onClick: () => void }) {
  return (
    <section className="w-[90%] h-[75%] m-auto rounded-[20px] bg-[rgba(51,51,51,1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] text-white grid grid-rows-[1fr_auto] overflow-hidden">
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-[34px] font-semibold mb-3">建立與追蹤團隊</h1>
        <p className="text-white/85 text-[24px] mb-4">成員管理 檢視夥伴技能樹</p>
        <p className="text-white/55 text-[15px] leading-relaxed">
          指派，管理團隊成員賬號，檢視團隊成員個人技能樹，追蹤伙伴成長
        </p>
      </div>

      <div className="w-full flex justify-end pr-12 pb-8">
        <DashboardButton
          title="管理團隊"
          ButtonAction={onClick}
          buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]"
        />
      </div>
    </section>
  )
}
