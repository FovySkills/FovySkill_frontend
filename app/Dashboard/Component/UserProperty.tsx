import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface UserPropertyProps {
  isVisible: boolean;
  setVisible: (visible: boolean) => void; 
}

export default function UserProperty({ isVisible, setVisible }: UserPropertyProps) {

  const [isProjectOpen,setProjectOpen]=useState<boolean>(true)
  const [isGuide,setGuide]=useState<boolean>(true)
  const [isLearning,setLearning]=useState<boolean>(true)
  const [isRingOpen,setRingOpen]=useState<boolean>(true)

  const [username,setUsername]=useState<string>("Testie Chen")
  const [position,setPosition]=useState<string>("客戶服務 經理")
  const [department,setDepartment]=useState<string>("數位金融處")
  const [email,setEmail]=useState<string>("testie@bank.com")


  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ y: "100%", x: "-50%", opacity: 0 }}
            animate={{ y: "0%", x: "-50%", opacity: 1 }}
            exit={{ y: "100%", x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="fixed bottom-0 left-1/2 z-50 w-full max-w-6xl p-6"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="bg-[#1c1c1c]/95 backdrop-blur-2xl border border-white/10 p-10 rounded-t-[50px] shadow-2xl text-white"
            >
              <div className="grid grid-cols-12 gap-8 items-start">

                <div className="col-span-3 space-y-6 border-r border-white/5 pr-8">
                  <div className="text-center text-gray-400 text-sm tracking-widest mb-6">我的當前狀態</div>
                  <StatusToggle label="專案開放中" desc="我可以接跨部門專案" active={isProjectOpen} action={setProjectOpen}/>
                  <StatusToggle label="導師模式" desc="我願意教新人技能" active={isGuide} action={setGuide}/>
                  <StatusToggle label="學習中" desc="正在進修，請勿打擾" active={isLearning} action={setLearning} />
                </div>

                {/* 中間：用戶頭像與資訊 */}
                <div className="col-span-5 flex flex-col items-center py-4">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-b from-gray-600 to-gray-800 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      👤
                    </div>
                    <div className="absolute right-0 bottom-1 bg-red-600 rounded-full w-8 h-8 flex items-center justify-center border-4 border-[#1c1c1c] text-[10px] font-bold">
                      JR
                    </div>
                  </div>
                  <h2 className="text-3xl font-light tracking-tight mb-8">{username}</h2>
                  <div className="w-full max-w-xs space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">目前職位</span><span>{position}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">所在部門</span><span>{department}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email</span><a href={`mailto:${email}`} className="text-blue-400/80">{email}</a></div>
                  </div>
                </div>

                {/* 右側：專案進度 */}
                <div className="col-span-4 space-y-4">
                  <ProjectCard title="現金管理與支付方案" percent={87} dept="企金部" color="shadow-purple-500/20" />
                  <ProjectCard title="整合型金融方案設計與建議" percent={45} dept="數金部" color="shadow-blue-500/20" />
                  <ProjectCard title="客戶風險等級" percent={32} dept="客服部" color="shadow-emerald-500/20" />
                </div>
              </div>

              {/* 底部控制列 */}
              <div className="flex justify-center items-center gap-8 mt-12">
                <IconButton icon1="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" active={isRingOpen} action={setRingOpen} />
                <button 
                  onClick={() => setVisible(false)}
                  className="px-16 py-3 bg-zinc-800/80 hover:bg-zinc-700 rounded-full font-bold tracking-[0.3em] transition-all active:scale-95 shadow-lg border border-white/5"
                >
                  LOG OUT
                </button>
                <IconButton icon1="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" icon2="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" action={()=>{}} active={false} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatusToggle({ label, desc, active,action }: { label: string; desc: string; active: boolean,action:React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer" onClick={()=>action(prev=>!prev)}>
      <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-zinc-700'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[10px] text-gray-500 leading-tight">{desc}</div>
      </div>
    </div>
  );
}

function ProjectCard({ title, percent, dept, color }: { title: string; percent: number; dept: string; color: string }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-[24px] p-4 flex items-center gap-4 hover:bg-white/10 transition-colors shadow-xl ${color}`}>
      <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-white/10 to-transparent opacity-50" />
        <span className="text-xs font-mono">{percent}%</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate mb-2">{title}</div>
        <button className="w-full bg-black/40 hover:bg-black/60 py-1.5 px-3 rounded-full flex justify-between items-center text-[9px] text-gray-400 group transition-all">
          <span>來自 {dept} 的專案</span>
          <span className="group-hover:translate-x-1 transition-transform">❯</span>
        </button>
      </div>
    </div>
  )
}

function IconButton({ icon1,icon2,active,action }: { icon1: string,icon2?:string,active:boolean,action:React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <button type="button" onClick={()=>action(prev=>!prev)} className={`${active? "text-yellow-500":"text-white"} w-12 h-12 bg-zinc-800/50 hover:bg-zinc-700 rounded-full flex items-center justify-center text-xl transition-all border border-white/5 active:scale-90`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d={icon1} />
  {icon2&&<path strokeLinecap="round" strokeLinejoin="round" d={icon2} />}
</svg>

    </button>
  )
}

