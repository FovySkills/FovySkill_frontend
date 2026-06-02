"use client"

import { ArrowLeft, Building2, Home } from "lucide-react"
import { useRouter } from "next/navigation"

type OrgNode = {
  name: string
  children?: OrgNode[]
}

const organization: OrgNode = {
  name: "金融控股總部",
  children: [
    {
      name: "企業金融事業群",
      children: [
        { name: "授信審查部" },
        { name: "法金業務部" },
        { name: "風險管理部" },
      ],
    },
    {
      name: "個人金融事業群",
      children: [
        { name: "財富管理部" },
        { name: "信用卡部" },
        { name: "數位銀行部" },
      ],
    },
    {
      name: "投資與市場事業群",
      children: [
        { name: "資產管理部" },
        { name: "金融市場部" },
        { name: "研究策略部" },
      ],
    },
  ],
}

function OrgCard({ name, isRoot = false }: { name: string; isRoot?: boolean }) {
  return (
    <div
      className={`
        mx-auto flex min-h-14 w-[170px] max-w-[170px] items-center justify-center gap-2 rounded-[18px]
        border border-white/15 bg-[#333333] px-4 py-3 text-center text-white
        shadow-[0_0_22px_rgba(0,0,0,0.72)]
        sm:w-[190px] sm:max-w-[190px]
        ${isRoot ? "w-[220px] max-w-[220px] bg-[#3a3a3a] shadow-[0_0_32px_rgba(120,160,255,0.26)] sm:w-[240px] sm:max-w-[240px]" : ""}
      `}
    >
      {isRoot && <Building2 className="h-4 w-4 shrink-0 text-white/75" />}
      <span className="min-w-0 break-words text-xs font-medium leading-snug tracking-wide sm:text-sm">
        {name}
      </span>
    </div>
  )
}

function OrgTree({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
  const children = node.children ?? []
  const branchMinWidth = children.length > 0 ? children.length * 230 : 190

  return (
    <div
      className="flex flex-col items-center"
      style={{ minWidth: isRoot ? Math.max(branchMinWidth, 760) : branchMinWidth }}
    >
      <OrgCard name={node.name} isRoot={isRoot} />

      {children.length > 0 && (
        <>
          <div className="h-6 w-px bg-white/25 sm:h-8" />
          <div
            className="relative grid w-full grid-cols-1 justify-items-center gap-7 md:gap-10 lg:gap-14"
            style={{
              gridTemplateColumns:
                children.length > 1
                  ? `repeat(${children.length}, minmax(190px, 1fr))`
                  : "minmax(190px, 1fr)",
            }}
          >
            <div className="absolute top-0 hidden h-px w-[68%] bg-white/20 md:block" />
            {children.map((child) => (
              <div key={child.name} className="relative flex min-w-[210px] flex-col items-center">
                <div className="hidden h-8 w-px bg-white/20 md:block" />
                <OrgTree node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function SwitchCareers() {
  const router = useRouter()

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#232323] text-zinc-200">
      <div className="pointer-events-none absolute left-[-22rem] top-[-26rem] h-[680px] w-[680px] rounded-full shadow-[0_0_120px_40px_rgba(255,255,255,0.14)]" />
      <div className="pointer-events-none absolute right-[-9rem] top-[18%] h-[240px] w-[240px] rounded-full bg-[rgb(35,35,35)] shadow-[0_0_90px_24px_rgba(120,160,255,0.18)]" />

      <section className="relative z-10 grid h-screen w-full grid-rows-[72px_1fr_72px]">
        <header className="flex items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={() => router.push("/Dashboard")}
            className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>
          <div className="text-sm tracking-[0.32em] text-white/35">FOVY</div>
        </header>

        <section className="min-h-0 overflow-hidden px-4 sm:px-8">
          <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-4">
            <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[30px] font-semibold tracking-wide text-white md:text-[38px]">
              職涯探索
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55 md:text-base">
              從金融機構組織架構快速瀏覽可能的轉職方向。
            </p>
            </div>

            <div className="min-h-0 overflow-auto rounded-[24px] border border-white/5 bg-[rgba(51,51,51,0.62)] px-4 py-8 shadow-[0_0_34px_rgba(0,0,0,0.72)] sm:px-8">
              <div className="mx-auto flex min-h-full min-w-max items-center justify-center">
                <div className="w-max">
                  <OrgTree node={organization} isRoot />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push("/Dashboard")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white shadow-[0_0_24px_rgba(0,0,0,0.8)] transition duration-300 hover:scale-110 active:scale-95"
            title="Return Dashboard"
            aria-label="Return Dashboard"
          >
            <Home className="h-5 w-5" />
          </button>
        </footer>
      </section>
    </main>
  )
}
