"use client";
import { motion } from "framer-motion";
import { Shield, Rocket } from "lucide-react";

export function CrossSiloAnimation() {
  return (
    <div className="w-full h-full relative flex items-stretch justify-between p-6 px-8 overflow-hidden bg-white/20">
      {/* Background/Base aesthetics */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EBEBEB]/40 to-white/10" />
      
      {/* Sales Silo */}
      <div className="relative z-10 w-[42%] flex flex-col pt-2">
        <h4 className="text-[#0b0a44] font-semibold text-[11px] uppercase tracking-wider mb-5 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Sales Silo
        </h4>
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className={`w-full h-11 rounded-xl flex items-center px-4 border border-[#e2e8f0]/80 bg-white/70 relative ${i === 2 ? 'z-20' : 'z-10'}`}
              animate={i === 2 ? {
                borderColor: ["#e2e8f0", "#e2e8f0", "#CB410F", "#CB410F", "#e2e8f0"],
                boxShadow: ["none", "none", "0 0 20px rgba(203,65,15,0.3)", "0 0 20px rgba(203,65,15,0.3)", "none"],
                backgroundColor: ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0.7)"]
              } : {}}
              transition={i === 2 ? { duration: 6, repeat: Infinity, times: [0, 0.16, 0.25, 0.83, 1] } : undefined}
            >
              <div className="w-5 h-5 rounded-full bg-[#f1f5f9] mr-3" />
              <div className="h-2 w-16 bg-[#f1f5f9] rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* R&D Silo */}
      <div className="relative z-10 w-[42%] flex flex-col pt-2">
        <h4 className="text-[#0b0a44] font-semibold text-[11px] uppercase tracking-wider mb-5 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Product R&D Silo
        </h4>
        <div className="flex flex-col gap-3 relative">
          {/* Challenge / Merge Target */}
          <div className="w-full h-[4.5rem] rounded-xl border-2 border-dashed border-[#0c80df]/40 bg-[#0c80df]/5 flex items-center justify-center relative z-20 mb-2">
             <motion.div
               animate={{ opacity: [1, 1, 0, 0, 1] }}
               transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 0.58, 0.83, 1] }}
               className="flex items-center gap-3 text-[#0c80df]"
             >
               <Shield className="w-6 h-6" />
               <Rocket className="w-6 h-6" />
             </motion.div>

             {/* Integrated Leader Card */}
             <motion.div
               className="absolute inset-0 bg-white border-[#0c80df] border-2 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(12,128,223,0.4)]"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ 
                 opacity: [0, 0, 0, 1, 1, 0], 
                 scale: [0.8, 0.8, 0.8, 1.05, 1, 0.8] 
               }}
               transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 0.54, 0.6, 0.83, 1] }}
             >
               <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded-full bg-[#0c80df] text-white flex items-center justify-center text-[11px] font-bold">L</div>
                 <span className="text-xs font-bold text-[#0b0a44]" style={{ fontFamily: "'Poppins', sans-serif" }}>Strike Team Leader</span>
               </div>
             </motion.div>
          </div>

          {[0, 1].map((i) => (
            <motion.div 
              key={i}
              className="w-full h-11 rounded-xl flex items-center px-4 border border-[#e2e8f0]/80 bg-white/70"
              animate={{
                borderColor: ["#e2e8f0", "#e2e8f0", "#e2e8f0", "#0c80df", "#0c80df", "#e2e8f0"],
                backgroundColor: ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(12,128,223,0.08)", "rgba(12,128,223,0.08)", "rgba(255,255,255,0.7)"],
                boxShadow: ["none", "none", "none", "0 0 15px rgba(12,128,223,0.2)", "0 0 15px rgba(12,128,223,0.2)", "none"]
              }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 0.6, 0.65, 0.83, 1] }}
            >
              <div className="w-5 h-5 rounded-full bg-[#e2e8f0] mr-3" />
              <div className="h-1.5 w-14 bg-[#e2e8f0] rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Traveling Node */}
      <motion.div
        className="absolute z-30 flex flex-col items-center justify-center w-28 h-28 bg-white border-[3px] border-[#CB410F] rounded-full shadow-[0_0_30px_rgba(203,65,15,0.4)] overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
        animate={{
          left: ["20%", "20%", "50%", "70%", "70%", "70%"],
          top: ["65%", "65%", "42%", "30%", "30%", "30%"],
          x: ["-50%", "-50%", "-50%", "-50%", "-50%", "-50%"],
          y: ["-50%", "-50%", "-50%", "-50%", "-50%", "-50%"],
          scale: [0, 1, 1.2, 0.5, 0, 0],
          opacity: [0, 1, 1, 1, 0, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.16, 0.35, 0.5, 0.54, 1], ease: "easeInOut" }}
      >
        {/* Subtle Map Background */}
        <div className="absolute inset-0 z-0 opacity-15">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M-10,40 Q30,10 60,50 T110,60" stroke="#0b0a44" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
            <path d="M10,80 Q40,40 90,90" stroke="#0c80df" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <circle cx="25" cy="30" r="2.5" fill="#0b0a44" />
            <circle cx="75" cy="70" r="2.5" fill="#0b0a44" />
            <circle cx="50" cy="50" r="4" fill="#CB410F" opacity="0.5" />
            <line x1="25" y1="30" x2="50" y2="50" stroke="#0b0a44" strokeWidth="0.5" />
            <line x1="75" y1="70" x2="50" y2="50" stroke="#0b0a44" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-1">
          <div className="text-[8px] font-semibold tracking-widest text-[#868686] uppercase mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Hidden Skill</div>
          <div className="w-[80%] rounded-full bg-[#CB410F] flex items-center justify-center py-2 shadow-inner">
            <span className="text-[10px] font-bold text-white leading-tight text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>Project<br/>Management</span>
          </div>
        </div>
      </motion.div>

      {/* Connecting Arc SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 30 65 Q 50 40 70 30"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="2 2"
          animate={{ 
            pathLength: [0, 0, 1, 1, 0, 0], 
            opacity: [0, 0, 1, 0, 0, 0],
            stroke: ["#CB410F", "#CB410F", "#0c80df", "#0c80df", "#0c80df", "#0c80df"]
          }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.16, 0.5, 0.55, 0.83, 1], ease: "easeInOut" }}
        />
      </svg>

      {/* Footer Overlay Text */}
      <div className="absolute bottom-5 left-0 w-full text-center z-40">
        <motion.div 
          className="inline-flex items-center px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full border border-[#e2e8f0]/80 shadow-lg"
          animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 10] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.4, 0.83, 1] }}
        >
          <span className="text-[12px] text-[#0b0a44] tracking-wide flex justify-center items-center gap-2" style={{ fontFamily: "'Alata', sans-serif" }}>
            <span>Hidden Potential Match:</span>
            <span className="font-bold text-[#CB410F] text-[13px]" style={{ fontFamily: "'Poppins', sans-serif" }}>98%</span> 
            <span className="opacity-20 mx-1">|</span> 
            <span>Time:</span>
            <span className="font-bold text-[#0c80df] text-[13px]" style={{ fontFamily: "'Poppins', sans-serif" }}>5sec</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

