"use client";
import { motion } from "framer-motion";

export function SkillFingerprint() {
  const hexCodes = [
    ["0x7E", "0xA2", "0xF9"],
    ["0x4C", "0x8D", "0x1B"],
    ["0x33", "0xE4", "0x9C"],
    ["0xD1", "0xBB", "0x5A"],
  ];

  return (
    <div className="w-full h-full p-6 relative flex flex-col items-center justify-center overflow-hidden bg-white rounded-2xl">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#0b0a44 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />

      {/* Verified Potential Network Lines (Data Ecosystem) */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 15,25 L 35,45 L 45,15" stroke="#0c80df" strokeWidth="0.2" fill="none" strokeDasharray="1 1"/>
          <path d="M 85,25 L 65,45 L 80,75" stroke="#CB410F" strokeWidth="0.2" fill="none" strokeDasharray="1 1"/>
          <path d="M 15,80 L 40,65 L 50,90" stroke="#0c80df" strokeWidth="0.2" fill="none" />
          <circle cx="15" cy="25" r="0.8" fill="#0c80df" />
          <circle cx="35" cy="45" r="0.8" fill="#0b0a44" />
          <circle cx="45" cy="15" r="1.2" fill="#0c80df" />
          <circle cx="85" cy="25" r="0.8" fill="#CB410F" />
          <circle cx="65" cy="45" r="0.8" fill="#0b0a44" />
          <circle cx="80" cy="75" r="1.2" fill="#CB410F" />
          <circle cx="15" cy="80" r="0.8" fill="#0c80df" />
          <circle cx="40" cy="65" r="0.8" fill="#0b0a44" />
          <circle cx="50" cy="90" r="0.8" fill="#0c80df" />
      </svg>

      {/* Central Base Concept: Evidence Anchor Matrix */}
      <div className="relative z-10 w-44 h-44 md:w-56 md:h-56 bg-white/60 rounded-full border-[2px] border-[#CB410F] shadow-[0_0_40px_rgba(203,65,15,0.25)] flex items-center justify-center backdrop-blur-sm">
         
         {/* Rotating Concentric Loops */}
         <div className="absolute inset-2 rounded-full border border-[#CB410F]/40 border-dashed animate-[spin_15s_linear_infinite]" />
         <div className="absolute inset-5 rounded-full border-2 border-[#0c80df]/20" style={{ borderStyle: 'dotted' }} />
         <div className="absolute inset-5 rounded-full border border-transparent border-t-[#0c80df]/60 border-b-[#0c80df]/60 animate-[spin_8s_linear_infinite_reverse]" />
         <div className="absolute inset-8 rounded-full border-[1.5px] border-[#CB410F]/30 border-dashed animate-[spin_20s_linear_infinite]" />
         
         {/* Hexadecimal Evidence Matrix */}
         <div className="relative z-20 flex flex-col items-center justify-center gap-1.5 md:gap-2">
            <div className="grid grid-cols-3 gap-1 md:gap-2 text-[8px] md:text-[11px] font-mono text-gray-400 font-bold tracking-widest text-center mt-[-8px]">
              {hexCodes.map((row, i) => (
                row.map((code, j) => (
                    <motion.div 
                        key={`${i}-${j}`}
                        animate={{ 
                          color: ["#9ca3af", "#9ca3af", "#3B8402", "#CB410F", "#9ca3af"],
                          opacity: [0.6, 0.6, 1, 1, 0.6],
                          scale: [1, 1, 1.15, 1.15, 1],
                          textShadow: ["none", "none", "0 0 10px #3B8402", "0 0 10px #CB410F", "none"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: (i * 0.3) + (j * 0.15),
                          times: [0, 0.7, 0.8, 0.9, 1]
                        }}
                    >
                      {code}
                    </motion.div>
                ))
              ))}
            </div>
            
            {/* Integral Accuracy Label */}
            <motion.div 
              className="mt-3 bg-[#3B8402]/10 px-2.5 py-1 rounded inline-flex border border-[#3B8402]/40 text-[8px] md:text-[9px] font-mono font-bold text-[#3B8402]"
              animate={{ opacity: [0.8, 1, 0.8], boxShadow: ["none", "0 0 12px rgba(59,132,2,0.5)", "none"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ACCURACY: 99.8%
            </motion.div>
         </div>

         {/* Multi-angle Scanning Beam (Locking Crosshairs) */}
         <motion.div
            className="absolute inset-[-20%] z-30 pointer-events-none rounded-full overflow-hidden"
            animate={{ rotate: [0, 45, 45, 90, 90, 135, 135, 180, 180] }}
            transition={{ duration: 8, repeat: Infinity, times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9, 1], ease: "easeInOut" }}
         >
            {/* Beam Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#0c80df] to-transparent -translate-x-1/2 opacity-70" />
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#0c80df] to-transparent -translate-y-1/2 opacity-70" />
            
            {/* Beam Pulse Effect */}
            <motion.div className="absolute inset-0 bg-[#0c80df]/10 rounded-full scale-50" animate={{ scale: [0.5, 1.2, 0.5], opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
         </motion.div>

      </div>

      {/* High-Tech Floating Engineering Labels */}
      <motion.div 
        className="absolute z-20 top-[18%] left-[8%] md:left-[12%] bg-white/95 backdrop-blur-md px-3 py-2 rounded-md border-l-2 border-[#0c80df] border-y border-r border-[#e2e8f0] shadow-sm"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] md:text-[10px] font-mono font-bold text-[#0c80df] tracking-widest">[ VERIFIED x12 ]</span>
      </motion.div>

      <motion.div 
        className="absolute z-20 bottom-[30%] right-[8%] md:right-[12%] bg-white/95 backdrop-blur-md px-3 py-2 rounded-md border-r-2 border-[#CB410F] border-y border-l border-[#e2e8f0] shadow-sm"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      >
        <span className="text-[9px] md:text-[10px] font-mono font-bold text-[#CB410F] tracking-widest">[ PEER-ANCHORED ]</span>
      </motion.div>

      {/* Footer Caption */}
      <div className="absolute bottom-5 left-0 w-full text-center z-40 bg-white/80 py-2.5 backdrop-blur-sm border-t border-[#e2e8f0]/80 border-b border-[#e2e8f0]/80 shadow-[0_-10px_20px_rgba(255,255,255,0.9)]">
        <span className="text-[9px] md:text-[11px] tracking-[0.2em] uppercase font-bold text-[#868686]" style={{ fontFamily: "'Alata', sans-serif" }}>
          Engine: FOVY Evidence-Anchor Logic v2.0
        </span>
      </div>
    </div>
  );
}

