"use client";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function BattieAnimation() {
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-tr from-[#0b0a44]/5 to-[#0c80df]/10 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      
      {/* Constellation Network */}
      <motion.svg viewBox="0 0 100 100" className="absolute w-[150%] h-[150%] opacity-50 mix-blend-multiply" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
         <path d="M 20 20 L 50 80 L 80 20 Z" stroke="#0c80df" fill="none" strokeWidth="0.5" strokeDasharray="1 2"/>
         <path d="M 10 50 Q 50 100 90 50" stroke="#06b6d4" fill="none" strokeWidth="0.5" strokeDasharray="2 2"/>
         <circle cx="20" cy="20" r="1.5" fill="#0c80df" />
         <circle cx="50" cy="80" r="2" fill="#06b6d4" />
         <circle cx="80" cy="20" r="1.5" fill="#0c80df" />
         <circle cx="10" cy="50" r="1" fill="#0b0a44" />
         <circle cx="90" cy="50" r="1" fill="#0b0a44" />
      </motion.svg>

      {/* Pulsing Core */}
      <motion.div 
        className="absolute w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#0c80df]/30 bg-white/50 shadow-[0_0_15px_rgba(12,128,223,0.3)] flex items-center justify-center backdrop-blur-sm"
        animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 10px rgba(12,128,223,0.2)", "0 0 25px rgba(12,128,223,0.5)", "0 0 10px rgba(12,128,223,0.2)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-[#0c80df]/90" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

export function TanAnimation() {
  const hexes = [["0x7E", "0xA2"], ["0x4C", "0x8D"]];
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#EBEBEB] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0a44]/10 to-[#CB410F]/10 backdrop-blur-[2px]" />
      
      {/* Rotating Matrix */}
      <motion.div className="relative z-10 grid grid-cols-2 gap-1 text-[9px] lg:text-[10px] font-mono text-[#0b0a44]/40 font-bold" animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
         {hexes.map((row, i) => row.map((hex, j) => (
            <motion.div key={`${i}-${j}`} animate={{ color: ["#0b0a44", "#CB410F", "#0b0a44"] }} transition={{ duration: 3, delay: i+j, repeat: Infinity, ease: "easeInOut" }}>
              {hex}
            </motion.div>
         )))}
      </motion.div>

      {/* Scanning Beam #0C80DF */}
      <motion.div className="absolute inset-[-50%] pointer-events-none z-20" animate={{ rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
         <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#0c80df]/70 to-transparent -translate-x-1/2" />
         <div className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#0c80df]/30 to-transparent -translate-y-1/2" />
      </motion.div>
      
      {/* Rings */}
      <div className="absolute inset-4 border border-[#0b0a44]/20 rounded-full border-dotted" />
      <div className="absolute inset-6 border-[1.5px] border-[#CB410F]/30 rounded-full border-dashed animate-[spin_12s_linear_infinite]" />
    </div>
  );
}

export function CristinaAnimation() {
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#f8fafc] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c80df]/5 via-[#CB410F]/5 to-[#9333ea]/5 backdrop-blur-[3px]" />
      
      {/* Liquid Organic Spheres */}
      <motion.div 
         className="absolute w-14 h-14 lg:w-16 lg:h-16 bg-[#0c80df]/15 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[2px]"
         animate={{ rotate: 360, scale: [1, 1.15, 1], borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 40% 50% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"] }} 
         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
         className="absolute w-12 h-12 lg:w-14 lg:h-14 bg-[#CB410F]/15 rounded-[60%_40%_30%_70%/50%_40%_50%_60%] blur-[3px]"
         animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Glowing Clusters */}
      <div className="absolute inset-0 flex items-center justify-center gap-1.5 z-10">
         <motion.div className="w-2 h-2 rounded-full bg-[#0c80df] shadow-[0_0_10px_#0c80df]" animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
         <motion.div className="w-2 h-2 rounded-full bg-[#CB410F] shadow-[0_0_10px_#CB410F]" animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
         <motion.div className="w-2 h-2 rounded-full bg-[#9333ea] shadow-[0_0_10px_#9333ea]" animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
      </div>
      
      {/* Faint network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.path d="M 30 50 Q 50 20 70 50 M 30 50 Q 50 80 70 50" stroke="#0b0a44" fill="none" strokeWidth="0.5" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

export function MickAnimation() {
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white flex items-center justify-center pointer-events-none shadow-[inset_0_0_20px_rgba(6,182,212,0.08)]">
      <div className="absolute inset-0 bg-[#0b0a44]/[0.02] backdrop-blur-[1px]" />
      
      {/* Cyan Watermark edges */}
      <motion.div className="absolute inset-[-5%] border-[3px] border-cyan-400/20 rounded-[inherit] blur-[6px]" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      
      {/* Neural Constellation map */}
      <motion.svg viewBox="0 0 100 100" className="absolute w-[130%] h-[130%] opacity-50 mix-blend-multiply" animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
         <path d="M 30 30 L 70 70 M 70 30 L 30 70 M 50 15 L 50 85 M 15 50 L 85 50" stroke="#0b0a44" fill="none" strokeWidth="0.5" strokeDasharray="1 3"/>
         <circle cx="30" cy="30" r="1.5" fill="#06b6d4" />
         <circle cx="70" cy="70" r="1.5" fill="#0b0a44" />
         <circle cx="70" cy="30" r="2" fill="#06b6d4" />
         <circle cx="30" cy="70" r="1.5" fill="#0b0a44" />
         <circle cx="50" cy="15" r="1" fill="#06b6d4" />
         <circle cx="85" cy="50" r="1.5" fill="#0b0a44" />
      </motion.svg>
      
      {/* Center core */}
      <motion.div 
         className="w-3.5 h-3.5 bg-gradient-to-tr from-[#06b6d4] to-white rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
         animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }} 
         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} 
      />
    </div>
  );
}

export function JesseAnimation() {
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#f8fafc] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#CB410F]/5 to-[#0c80df]/5 backdrop-blur-[2px]" />
      
      {/* Grid Network */}
      <motion.div className="absolute w-[150%] h-[150%] flex flex-wrap gap-2 lg:gap-2.5 items-center justify-center opacity-40 mix-blend-color-burn" animate={{ rotate: 90 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
         {Array.from({length: 49}).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#CB410F]/60" />
         ))}
      </motion.div>
      
      {/* Verification Hub */}
      <motion.div 
         className="absolute w-10 h-10 rounded-md border-[1.5px] border-[#0c80df]/40 rotate-45 flex items-center justify-center bg-white/60 shadow-[0_0_20px_rgba(12,128,223,0.1)] z-10" 
         animate={{ scale: [1, 1.15, 1], borderColor: ["rgba(12,128,223,0.3)", "rgba(12,128,223,0.8)", "rgba(12,128,223,0.3)"] }} 
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
         <motion.div className="w-2.5 h-2.5 rounded-full bg-[#0c80df] shadow-[0_0_12px_#0c80df]" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      {/* Passing Scans */}
      <motion.div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-[#CB410F]/50 to-transparent blur-[1px] z-20" animate={{ top: ["-20%", "120%"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute h-full w-[3px] bg-gradient-to-b from-transparent via-[#0c80df]/40 to-transparent blur-[1px] z-20" animate={{ left: ["-20%", "120%"] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

