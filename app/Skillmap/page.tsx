"use client";

import React, { useState } from 'react';
import { Home, Trash2, Plus, RotateCw } from 'lucide-react';
import { useRouter } from 'next/router';

export default function SkillMapPage() {

  const router=useRouter()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen max-h-screen bg-[#1a1a1a] text-white flex overflow-hidden relative font-sans">
      
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[35%] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 flex flex-col relative z-10 transition-all duration-500">
        
        <nav className="flex justify-between items-center p-8">
          <div className="flex gap-6 items-center">
            <button className="px-5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold tracking-widest hover:bg-white/25 transition-all">
              SKILLMAP
            </button>
            <button className="text-gray-500 text-xs font-bold tracking-widest hover:text-white transition-colors">
              GROWTH
            </button>
            <button className="text-gray-500 text-xs font-bold tracking-widest hover:text-white transition-colors">
              COMPARE
            </button>
          </div>
          <button className="px-6 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-all">
            Me <span className="ml-1 text-[10px] opacity-50">▼</span>
          </button>
        </nav>

        <div className="flex-1 flex items-center justify-center -mt-24">
          <div className="w-[520px] py-16 px-12 rounded-[80px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 text-center backdrop-blur-md shadow-2xl">
            <h1 className="text-4xl font-bold mb-6 tracking-tight">嗨 Jack！</h1>
            <p className="text-gray-400 leading-relaxed text-sm">
              歡迎來到你的技能地圖，點按「<span className="text-white">+</span>」上傳你的專案，<br/>
              開始探索技能與成長吧！
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-10">
          <button className="w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 hover:bg-white/15 hover:scale-105 transition-all group shadow-2xl">
            <Home size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button className="w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 hover:bg-white/15 hover:scale-105 transition-all group shadow-xl">
            <Trash2 size={24} className="text-gray-400 group-hover:text-red-400 transition-colors" />
          </button>

          <div className="flex items-center bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 p-1.5 shadow-xl">
            <button className="flex items-center justify-center w-14 h-11 hover:bg-white/10 rounded-l-full transition-all group border-r border-white/5">
              <Plus size={28} className="text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <button className="flex items-center justify-center w-14 h-11 hover:bg-white/10 rounded-r-full transition-all group">
              <RotateCw size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </main>

      <aside className={`
          fixed top-0 right-0 h-full w-[380px] 
          bg-black/60 backdrop-blur-[40px] border-l border-white/10 
          rounded-l-[60px] shadow-[-20px_0_50px_rgba(0,0,0,0.5)]
          transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50
          ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-20px)]"}
        `}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-0 top-1/2 -translate-x-full bg-[#2a2a2a] w-7 h-14 flex items-center justify-center rounded-l-2xl border border-r-0 border-white/10 transition-colors shadow-lg"
        >
          <span className={`text-[10px] transition-transform duration-500 ${isOpen ? "rotate-0" : "rotate-180"}`}>▶</span>
        </button>

        <div className="p-8 h-full flex flex-col justify-between overflow-hidden">
          
          <section>
            <h3 className="text-[10px] font-bold text-gray-500 mb-2 tracking-[0.2em] uppercase px-2">正在學習中的技能</h3>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group flex items-center gap-5 bg-white/5 p-5 rounded-[45px] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                  <div className="w-14 h-14 rounded-full border-2 border-gray-700 flex items-center justify-center text-xs text-gray-400 shrink-0 group-hover:border-blue-500/50 transition-colors">
                    0%
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-wide">tag to learn</span>
                    <span className="text-[11px] text-gray-500 mt-0.5">訓練直到下一階</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col items-center text-center py-2">
            <div className="relative w-32 h-32 flex items-center justify-center mb-1">
              <svg className="absolute w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="364" strokeDashoffset="309" strokeLinecap="round" className="text-blue-500" />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">15<span className="text-xs ml-0.5">%</span></span>
                <span className="text-[9px] text-gray-500 font-bold tracking-tighter uppercase">Top</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 leading-tight">
                你在 <span className="text-white font-bold">數位金融處</span> 的<br/>
                技能總數量前 <span className="text-blue-400 font-bold">15 %</span>
            </p>
          </section>

          <section className="pt-2 border-t border-white/5">
            <div className="mb-4 px-2">
                <h4 className="text-[11px] text-gray-400">你總共有 <span className="text-white text-lg font-bold mx-1">182</span> 個技能</h4>
            </div>
            
            <div className="space-y-2">
              {[
                { name: "數位支付與展示", rank: "極好", score: "1" },
                { name: "詐欺監測與服務", rank: "優秀", score: "2" },
                { name: "API 系統整合", rank: "不錯", score: "3" }
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-[10px] w-4 text-gray-500 font-mono">{skill.score}</span>
                  <span className="text-[11px] font-medium flex-1 truncate">{skill.name}</span>
                  <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-white/10 text-gray-400 shrink-0">
                    {skill.rank}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </aside>

    </div>
  );
}