import { motion, AnimatePresence } from "framer-motion";

interface UserPropertyProps {
  isVisible: boolean;
  setVisible: (visible: boolean) => void; 
}

export default function UserProperty({ isVisible, setVisible }: UserPropertyProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 1. 背景遮罩 (Backdrop)：點擊此處會關閉面板 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)} // 點擊外面關閉
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* 2. 面板本體 */}
          <motion.div
            // 從下往上彈入，離開時也往下載
            initial={{ y: "100%", x: "-50%", opacity: 0 }}
            animate={{ y: "0%", x: "-50%", opacity: 1 }}
            exit={{ y: "100%", x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="fixed bottom-0 left-1/2 z-50 w-full max-w-6xl p-6"
          >
            <div 
              // 阻止點擊面板內部時觸發外部的關閉事件
              onClick={(e) => e.stopPropagation()} 
              className="bg-[#1c1c1c]/95 backdrop-blur-2xl border border-white/10 p-10 rounded-t-[50px] shadow-2xl text-white"
            >
              <div className="grid grid-cols-12 gap-8 items-start">
                
                {/* 左側：當前狀態 */}
                <div className="col-span-3 space-y-6 border-r border-white/5 pr-8">
                  <div className="text-center text-gray-400 text-sm tracking-widest mb-6">我的當前狀態</div>
                  <StatusToggle label="專案開放中" desc="我可以接跨部門專案" active />
                  <StatusToggle label="導師模式" desc="我願意教新人技能" active />
                  <StatusToggle label="學習中" desc="正在進修，請勿打擾" />
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
                  <h2 className="text-3xl font-light tracking-tight mb-8">Testie Chen</h2>
                  <div className="w-full max-w-xs space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">目前職位</span><span>客戶服務 經理</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">所在部門</span><span>數位金融處</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-blue-400/80">testie@bank.com</span></div>
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
                <IconButton icon="🔔" />
                <button 
                  onClick={() => setVisible(false)}
                  className="px-16 py-3 bg-zinc-800/80 hover:bg-zinc-700 rounded-full font-bold tracking-[0.3em] transition-all active:scale-95 shadow-lg border border-white/5"
                >
                  LOG OUT
                </button>
                <IconButton icon="⚙️" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatusToggle({ label, desc, active = false }: { label: string; desc: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
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

function IconButton({ icon }: { icon: string }) {
  return (
    <button className="w-12 h-12 bg-zinc-800/50 hover:bg-zinc-700 rounded-full flex items-center justify-center text-xl transition-all border border-white/5 active:scale-90">
      {icon}
    </button>
  )
}