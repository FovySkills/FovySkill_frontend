"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    avatarUrl?: string;
}

type SkillItem = {
    title: string;
    subtitle: string;
    count: number;
    rightHint: string;
};

type RankItem = {
    name: string;
    tag: string;
    glow: "orange" | "yellow" | "blue";
};

function SkillCard({ item }: { item: SkillItem }) {
    return (
        <div
            className="
        relative w-full
        rounded-[22px] px-4 py-3
        bg-[#3a3a3a]
        shadow-[inset_0_0_20px_rgba(0,0,0,0.55)]
        overflow-hidden
      "
        >
            <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-black/20 blur-xl" />
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-black/30 shadow-[inset_0_0_16px_rgba(0,0,0,0.65)]" />
                    <div className="min-w-0">
                        <div className="text-[11px] text-white/60 leading-tight">
                            {item.title}
                        </div>
                        <div className="text-[10px] text-white/40 mt-0.5 truncate">
                            {item.subtitle}
                        </div>
                    </div>
                </div>

                <div className="flex items-end gap-1.5 shrink-0">
                    <div className="text-right">
                        <div className="text-3xl font-semibold leading-none text-white/90">
                            {item.count}
                        </div>
                        <div className="text-[10px] text-white/55 mt-0.5">
                            {item.rightHint}
                        </div>
                    </div>
                    <div className="text-[10px] text-white/50 pb-1">次</div>
                </div>
            </div>
        </div>
    );
}

function GlowCircle({ percent }: { percent: number }) {
    return (
        <div className="relative w-44 h-44 flex items-center justify-center">
            <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 55px rgba(120, 160, 255, 0.32)" }}
            />
            <div className="absolute inset-5 rounded-full bg-[#3a3a3a] shadow-[inset_0_0_26px_rgba(0,0,0,0.6)]" />
            <div className="relative text-center">
                <div className="text-white/90 text-5xl font-semibold leading-none">
                    {percent}
                    <span className="text-sm font-normal ml-1">%</span>
                </div>
                <div className="text-white/55 text-xs mt-2">TOP</div>
            </div>
        </div>
    );
}

function RankRow({ idx, item }: { idx: number; item: RankItem }) {
    const glow =
        item.glow === "orange"
            ? "shadow-[0_0_26px_rgba(255,140,60,0.30)]"
            : item.glow === "yellow"
                ? "shadow-[0_0_26px_rgba(255,210,90,0.30)]"
                : "shadow-[0_0_26px_rgba(120,200,255,0.26)]";

    const ring =
        item.glow === "orange"
            ? "bg-orange-400/20 border-orange-300/40"
            : item.glow === "yellow"
                ? "bg-yellow-400/20 border-yellow-300/40"
                : "bg-sky-400/20 border-sky-300/40";

    return (
        <div
            className={`
        w-full rounded-full px-4 py-2.5
        bg-[#2f2f2f]
        shadow-[inset_0_0_18px_rgba(0,0,0,0.6)]
        flex items-center justify-between gap-3
        ${glow}
      `}
        >
            <div className="flex items-center gap-3 min-w-0">
                <div
                    className={`
            w-7 h-7 rounded-full border
            flex items-center justify-center
            text-xs text-white/85
            ${ring}
          `}
                >
                    {idx}
                </div>
                <div className="min-w-0">
                    <div className="text-[13px] text-white/85 truncate">{item.name}</div>
                    <div className="text-[10px] text-white/45 truncate">{item.tag}</div>
                </div>
            </div>
        </div>
    );
}

export default function Sidebar({
    showSidebar,
    setShowSidebar,
    avatarUrl,
}: SidebarProps) {
    const skills: SkillItem[] = [
        {
            title: "正在學習中的技能",
            subtitle: "整合社會能力系統  設計與建模",
            count: 5,
            rightHint: "才達到下一階",
        },
        {
            title: "還差兩項",
            subtitle: "tag to learn",
            count: 0,
            rightHint: "才達到下一階",
        },
        {
            title: "還差兩項",
            subtitle: "tag to learn",
            count: 0,
            rightHint: "才達到下一階",
        },
    ];

    const ranks: RankItem[] = [
        { name: "數位安排與交易觀察", tag: "還好", glow: "orange" },
        { name: "許軟體開發與管理", tag: "優秀", glow: "yellow" },
        { name: "API、系統整合", tag: "不錯", glow: "blue" },
    ];

    return (
        <AnimatePresence>
            {showSidebar && (
                <motion.div
                    className="fixed inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowSidebar((prev) => !prev)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="sidemenu"
                        onClick={(e) => e.stopPropagation()}
                        className="
              absolute right-0 top-0 h-full
              w-[30%] min-w-[320px] max-w-[480px]
              bg-[#3a3a3a] text-white
              shadow-[-12px_0_24px_rgba(0,0,0,0.5)]
              flex flex-col
              overflow-hidden rounded-l-[30px]
            "
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    >
                        <div className="relative h-full overflow-y-auto px-4 pt-4 pb-5">
                            {/* 右上角 X（固定） */}
                            <button
                                type="button"
                                onClick={() => setShowSidebar((prev) => !prev)}
                                className="
                  absolute top-4 right-4 z-10
                  w-9 h-9 rounded-full
                  grid place-items-center
                  text-sm text-white/80
                  bg-white/10 hover:bg-white/20 transition
                "
                                aria-label="close"
                            >
                                ✕
                            </button>

                            {/* 標題 */}
                            <div className="pt-2 text-center">
                                <div className="text-[13px] text-white/85 font-medium">
                                    正在學習中的技能
                                </div>
                            </div>


                            {/* 技能卡 */}
                            <div className="mt-4 space-y-3">
                                {skills.map((s, i) => (
                                    <SkillCard key={i} item={s} />
                                ))}
                            </div>

                            <div className="flex justify-between grid grid-cols-2">
                                <div>


                                    <div className="mt-3 flex justify-center scale-75">
                                        <GlowCircle percent={15} />
                                    </div>
                                </div>
                                <div>

                                    {/* 文案 */}
                                    <div className="mt-10 text-center text-white/75 text-[13px] leading-snug px-2">
                                        你在{" "}
                                        <span className="text-white/90 font-medium">數位金融</span>{" "}
                                        這些的
                                        <br />
                                        技能總數是前{" "}
                                        <span className="text-white/90 font-medium">15 %</span>
                                    </div>

                                    {/* 182 */}
                                    <div className="mt-3 text-center">
                                        <div className="text-white/60 text-xs">你總共有</div>
                                        <div className="mt-1 text-white/90 text-4xl font-semibold tracking-wide">
                                            182{" "}
                                            <span className="text-sm font-normal text-white/60 ml-1">
                                                個技能
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                                {/* Top3 */}
                                <div className="mt-4 space-y-2">
                                    <RankRow idx={1} item={ranks[0]} />
                                    <RankRow idx={2} item={ranks[1]} />
                                    <RankRow idx={3} item={ranks[2]} />
                                </div>
                        </div>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
