"use client";

import React from "react";
import {
  normalizeSkillScore,
  skillScoreDots,
  skillScoreLevel,
} from "@/app/lib/skillScore";

export type Metric = {
  label: string;
  value: number;
};

function Dot({ kind }: { kind: "filled" | "half" | "empty" }) {
  // half 用線性漸層做「半月」
  const base = "w-3.5 h-3.5 rounded-full";
  if (kind === "filled") return <span className={`${base} bg-white/85`} />;
  if (kind === "empty") return <span className={`${base} bg-white/15`} />;
  return (
    <span
      className={`${base}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.15) 50%)",
      }}
    />
  );
}

export default function DetailCard({
  title,
  score,
  metrics = [{ label: "技能分數", value: score }],
}: {
  title: string;
  score: number;
  metrics?: Metric[];
}) {
  const scoreInfo = normalizeSkillScore(score);
  const level = skillScoreLevel(score);

  return (
    <div
      className="
        w-[min(420px,calc(100vw-2rem))] rounded-[44px] p-6
        bg-[#2f2f2f]
        shadow-[0_0_40px_rgba(0,0,0,0.65)]
        relative
      "
    >
      {/* 外層柔和亮邊（像圖的 glow） */}
      <div className="pointer-events-none absolute inset-0 rounded-[44px] shadow-[0_0_30px_rgba(255,255,255,0.15)]" />

      {/* 標題 */}
      <div className="text-center text-white/90 text-lg font-medium mt-2">
        {title}
      </div>

      {/* 中央圓 */}
      <div className="mt-6 flex justify-center">
        <div className="relative">
          {/* 光暈 */}
          <div
            className="
              absolute inset-0 rounded-full
              shadow-[0_0_40px_rgba(0,210,255,0.35)]
            "
            style={{ transform: "scale(1.25)" }}
          />
          {/* 圓本體 */}
          <div
            className="
              w-44 h-44 rounded-full
              flex flex-col items-center justify-center
              relative overflow-hidden
              bg-[#3a3a3a]
              shadow-[inset_0_0_26px_rgba(0,0,0,0.58)]
            "
          >
            <div
              className="absolute inset-x-0 bottom-0 bg-white/20"
              style={{ height: `${scoreInfo.percent}%` }}
            />
            <div className="relative text-white text-5xl font-semibold leading-none">
              {scoreInfo.percent}
              <span className="text-base font-normal ml-1">%</span>
            </div>
            <div className="relative text-white/85 mt-2 text-sm">{level}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {metrics.map((m) => {
          const dots = skillScoreDots(m.value, 5);
          const percent = normalizeSkillScore(m.value).percent;
          return (
            <div
              key={m.label}
              className="
                rounded-full px-5 py-3
                bg-[#3a3a3a]
                shadow-[inset_0_0_18px_rgba(0,0,0,0.55)]
                flex items-center justify-between
              "
            >
              <div className="text-white/90 text-sm">{m.label}</div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: dots.filled }).map((_, i) => (
                    <Dot key={`f-${i}`} kind="filled" />
                  ))}
                  {dots.half === 1 && <Dot kind="half" />}
                  {Array.from({ length: dots.empty }).map((_, i) => (
                    <Dot key={`e-${i}`} kind="empty" />
                  ))}
                </div>

                <div className="text-white/80 text-sm w-10 text-right">
                  {percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
