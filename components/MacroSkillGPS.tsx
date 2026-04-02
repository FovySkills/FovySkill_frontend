"use client";
import { motion } from "framer-motion";

export function MacroSkillGPS() {
  return (
    <div className="w-full h-full p-5 lg:p-8 relative flex flex-col justify-start items-center overflow-visible bg-white/80 rounded-2xl shadow-sm">
        {/* Title */}
        <div className="text-[9px] lg:text-[10px] tracking-widest text-[#868686] uppercase font-bold mb-5 lg:mb-8 mt-1" style={{ fontFamily: "'Alata', sans-serif" }}>
            Strategic Asset: Organizational Macro Skill GPS
        </div>

        {/* Two Panels Container */}
        <div className="flex w-full flex-1 gap-3 lg:gap-5 mb-6 lg:mb-8">
            {/* Left Panel */}
            <div className="flex-1 bg-[#f4f7fa] rounded-[24px] border border-[#e2e8f0] flex flex-col items-center p-3 lg:p-5">
                <div className="text-[#0b0a44] text-[9px] lg:text-[11px] font-bold mb-4 lg:mb-8 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Before FOVY: Departmental Silos
                </div>
                {/* Org Chart */}
                <div className="relative flex flex-col items-center w-full flex-1 justify-center mt-[-10px] lg:mt-[-20px]">
                    {/* Leadership Box */}
                    <div className="w-16 lg:w-20 py-1.5 bg-white border border-[#cbd5e1] shadow-[0_2px_5px_rgba(0,0,0,0.02)] rounded-[6px] text-[8px] lg:text-[9px] text-gray-400 font-semibold text-center z-10 tracking-wide">
                        Leadership
                    </div>
                    {/* Lines */}
                    <div className="w-[85%] h-5 lg:h-7 border-x border-t border-[#cbd5e1]/70 mt-3 lg:mt-5 relative">
                        {/* Vertical line connecting from Leadership */}
                        <div className="absolute top-[-12px] lg:top-[-18px] left-1/2 w-px h-[12px] lg:h-[18px] bg-[#cbd5e1]/70 -translate-x-1/2" />
                        {/* Middle drop line */}
                        <div className="absolute top-0 left-1/2 w-px h-5 lg:h-7 bg-[#cbd5e1]/70 -translate-x-1/2" />
                    </div>
                    {/* Three Departments */}
                    <div className="w-full flex justify-between px-1 lg:px-2 pt-1 lg:pt-2 gap-2">
                        {/* Sales */}
                        <div className="flex-1 aspect-[5/4] bg-white border border-[#cbd5e1] shadow-[0_2px_5px_rgba(0,0,0,0.02)] rounded-[8px] flex flex-col items-center justify-center p-1.5 lg:p-2">
                            <span className="text-[7px] lg:text-[9px] text-gray-400 font-medium mb-1 lg:mb-2">Sales</span>
                            <div className="w-[60%] h-[1.5px] bg-[#e2e8f0] rounded-full mb-1" />
                            <div className="w-[40%] h-[1.5px] bg-[#e2e8f0] rounded-full" />
                        </div>
                        {/* Product */}
                        <div className="flex-1 aspect-[5/4] bg-white border border-[#cbd5e1] shadow-[0_2px_5px_rgba(0,0,0,0.02)] rounded-[8px] flex flex-col items-center justify-center p-1.5 lg:p-2">
                            <span className="text-[7px] lg:text-[9px] text-gray-400 font-medium mb-1 lg:mb-2">Product</span>
                            <div className="w-[60%] h-[1.5px] bg-[#e2e8f0] rounded-full mb-1" />
                            <div className="w-[40%] h-[1.5px] bg-[#e2e8f0] rounded-full" />
                        </div>
                        {/* Marketing */}
                        <div className="flex-1 aspect-[5/4] bg-white border border-[#cbd5e1] shadow-[0_2px_5px_rgba(0,0,0,0.02)] rounded-[8px] flex flex-col items-center justify-center p-1.5 lg:p-2">
                            <span className="text-[7px] lg:text-[9px] text-gray-400 font-medium mb-1 lg:mb-2">Marketing</span>
                            <div className="w-[60%] h-[1.5px] bg-[#e2e8f0] rounded-full mb-1" />
                            <div className="w-[40%] h-[1.5px] bg-[#e2e8f0] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 bg-[#f4f7fa] rounded-[24px] border border-[#e2e8f0] flex flex-col items-center p-3 lg:p-5">
                <div className="text-[#0b0a44] text-[9px] lg:text-[11px] font-bold mb-4 lg:mb-8 text-center leading-[1.3] px-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    After FOVY: Verified Capability<br/>Topography
                </div>
                {/* Map Canvas */}
                <div className="w-full flex-1 bg-white rounded-xl border border-[#e2e8f0]/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    {/* Abstract Map Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path 
                          d="M -10,30 Q 30,10 70,45 T 150,20" 
                          stroke="#CB410F" strokeWidth="0.5" fill="none" strokeDasharray="1 1.5" 
                          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path 
                          d="M -10,80 Q 40,60 110,95" 
                          stroke="#0c80df" strokeWidth="0.5" fill="none" strokeDasharray="1 1.5"
                          animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <path d="M 40,30 Q 80,60 120,0" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                    </svg>
                    
                    {/* Orange Node Stack */}
                    <motion.div className="absolute top-[20%] left-[15%]" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <div className="text-[6px] lg:text-[7px] font-bold text-[#CB410F] mb-1.5 text-center">Project Mgmt</div>
                        <div className="relative flex justify-center">
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white/90 border border-[#CB410F]/20 rounded-[4px] lg:rounded-[6px] flex items-center justify-center absolute -left-1.5 lg:-left-2 top-0 shadow-sm"><div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-[#CB410F]/20 rounded-full" /></div>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white rounded-[4px] lg:rounded-[6px] flex items-center justify-center absolute -left-[3px] lg:-left-1 top-0 shadow-[0_0_10px_rgba(203,65,15,0.1)]"><div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-[#CB410F]/40 rounded-full" /></div>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white border-[1.5px] border-[#CB410F] rounded-[4px] lg:rounded-[6px] flex items-center justify-center relative shadow-[0_0_15px_rgba(203,65,15,0.3)] z-10"><div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#CB410F] rounded-full" /></div>
                        </div>
                    </motion.div>

                    {/* Blue Node Stack */}
                    <motion.div className="absolute bottom-[10%] right-[15%]" animate={{ y: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                        <div className="text-[6px] lg:text-[7px] font-bold text-[#0c80df] mb-1.5 text-center">Design Think</div>
                        <div className="relative flex justify-center">
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white rounded-[4px] lg:rounded-[6px] flex items-center justify-center absolute -left-1 top-0 shadow-[0_0_10px_rgba(12,128,223,0.1)]"><div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-[#0c80df]/40 rounded-full" /></div>
                            <div className="w-5 h-5 lg:w-7 lg:h-7 bg-white border-[1.5px] border-[#0c80df] rounded-[4px] lg:rounded-[6px] flex items-center justify-center relative shadow-[0_0_15px_rgba(12,128,223,0.4)] z-10"><div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#0c80df] rounded-full" /></div>
                        </div>
                    </motion.div>

                    {/* Isolated Nodes */}
                    <motion.div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#CB410F] rounded-full shadow-[0_0_8px_rgba(203,65,15,0.6)]" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }} />
                    <motion.div className="absolute bottom-[40%] left-[35%] w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#0c80df] rounded-full shadow-[0_0_8px_rgba(12,128,223,0.6)]" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
                </div>
            </div>
        </div>

        {/* Pill Data Layer */}
        <div className="absolute -bottom-4 lg:-bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center px-6 lg:px-8 py-2.5 lg:py-3.5 bg-white rounded-full shadow-lg border border-[#e2e8f0] whitespace-nowrap z-50">
            <span className="text-[10px] lg:text-[12px] font-bold text-[#0b0a44] flex items-center tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span>Skill Clusters Identified:</span>
                <span className="text-[#0c80df] ml-2 text-[11px] lg:text-[13px]">42</span>
                <span className="mx-4 lg:mx-6 text-[#e2e8f0] font-normal text-base">|</span>
                <span>Strategic Skill Gap:</span>
                <span className="text-[#CB410F] ml-2 text-[11px] lg:text-[13px]">-18%</span>
            </span>
        </div>
    </div>
  );
}

