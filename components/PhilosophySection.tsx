"use client";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function PhilosophySection() {
  return (
    <div className="max-w-6xl mx-auto mb-20 relative p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-[#EBEBEB]/60 backdrop-blur-2xl border border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row gap-12 md:gap-8 items-center">
      
      {/* Background drifting particles across both columns */}
      <motion.div 
         className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none"
         animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         style={{ backgroundImage: "radial-gradient(circle at center, #0c80df 1.5px, transparent 1.5px), radial-gradient(circle at center, #CB410F 1.5px, transparent 1.5px)", backgroundSize: "60px 60px, 90px 90px", backgroundPosition: "0 0, 30px 45px" }}
      />
      
      {/* LEFT COLUMN */}
      <div className="w-full md:w-[45%] relative z-10 flex flex-col justify-center min-h-[350px] pl-2 lg:pl-8">
          {/* Elaborate Network Graph around Headline */}
          <div className="absolute inset-[-30%] z-0 pointer-events-none opacity-60 flex items-center justify-center">
             <motion.svg viewBox="0 0 200 200" className="w-[120%] h-[120%] absolute" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
                 <path d="M 50 50 L 150 150 M 150 50 L 50 150 M 100 10 L 100 190 M 10 100 L 190 100 M 30 100 Q 100 30 170 100" stroke="#0c80df" strokeWidth="0.5" strokeDasharray="2 4" fill="none" />
                 <path d="M 50 150 Q 100 50 150 150" stroke="#CB410F" strokeWidth="0.5" strokeDasharray="1 3" fill="none" />
                 <circle cx="50" cy="50" r="3" fill="#CB410F" />
                 <circle cx="150" cy="150" r="3" fill="#0c80df" />
                 <circle cx="150" cy="50" r="2.5" fill="#CB410F" />
                 <circle cx="50" cy="150" r="3.5" fill="#0c80df" />
                 <circle cx="100" cy="10" r="2" fill="#0b0a44" />
                 <circle cx="100" cy="190" r="2" fill="#0b0a44" />
                 <circle cx="10" cy="100" r="2" fill="#0c80df" />
                 <circle cx="190" cy="100" r="2" fill="#CB410F" />
             </motion.svg>
             <motion.div 
               className="absolute w-40 h-40 lg:w-48 lg:h-48 border border-[#0c80df]/30 rounded-full"
               animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
               className="absolute w-56 h-56 lg:w-64 lg:h-64 border border-[#CB410F]/20 rounded-full border-dashed"
               animate={{ rotate: -360 }}
               transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
             />
          </div>

          <div className="relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-[#0c80df] uppercase mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>About Us / Our Belief</h2>
            <h3 className="text-5xl md:text-5xl lg:text-7xl font-extrabold text-[#0b0a44] leading-[1.05] tracking-tight" style={{ fontFamily: "'Alata', sans-serif" }}>
              FOVY:<br/>A New<br/>Field of<br/>View.
            </h3>
            
            {/* New Field of View Icon at center of network */}
            <motion.div 
               className="mt-10 lg:mt-12 inline-flex items-center justify-center p-3.5 lg:p-4 rounded-full bg-white/80 border border-[#0c80df]/40 shadow-[0_0_25px_rgba(12,128,223,0.3)] backdrop-blur-xl relative"
               animate={{ boxShadow: ["0 0 15px rgba(12,128,223,0.2)", "0 0 35px rgba(12,128,223,0.5)", "0 0 15px rgba(12,128,223,0.2)"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className="absolute inset-0 rounded-full border border-white opacity-60" />
               <Eye className="w-8 h-8 md:w-10 md:h-10 text-[#0c80df] opacity-90" strokeWidth={1.5} />
            </motion.div>
          </div>
      </div>

      {/* RIGHT COLUMN - Cards */}
      <div className="w-full md:w-[55%] relative z-10 flex flex-col gap-4 md:gap-5 pr-2 md:pr-4">
          <motion.div 
             className="w-full p-5 lg:p-6 rounded-[1.25rem] bg-white/80 backdrop-blur-xl border border-white shadow-sm"
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
          >
             <p className="text-[15px] lg:text-[17px] text-[#0b0a44] font-medium leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                "In the AI era, when machines take over execution,...
             </p>
          </motion.div>

          <motion.div 
             className="w-[90%] md:ml-[10%] p-5 lg:p-6 rounded-[1.25rem] bg-white/80 backdrop-blur-xl border border-white shadow-sm inline-block self-end md:self-auto"
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
             <p className="text-[17px] lg:text-[19px] text-[#0b0a44] font-bold leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                ...what remains for humans?"
             </p>
          </motion.div>

          {/* Key Belief Card (Card 3) */}
          <motion.div 
             className="w-[105%] md:w-[110%] md:-ml-[10%] p-6 lg:p-8 rounded-[1.5rem] bg-white/95 backdrop-blur-3xl border-[2px] border-[#0c80df]/30 shadow-[0_15px_40px_rgba(12,128,223,0.15)] relative overflow-hidden my-1 group"
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.3 }}
          >
             {/* Card 3 Detailed Network Animation */}
             <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                     <motion.path 
                       d="M -10,60 Q 50,0 110,60" 
                       stroke="#0c80df" strokeWidth="0.8" fill="none"
                       animate={{ strokeDashoffset: [0, -50] }}
                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                       strokeDasharray="2 4"
                     />
                     <motion.path 
                       d="M 10,90 Q 60,30 120,80" 
                       stroke="#CB410F" strokeWidth="0.6" fill="none"
                       animate={{ strokeDashoffset: [0, 50] }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       strokeDasharray="1 3"
                     />
                 </svg>
                 {/* Glowing Belief Core */}
                 <motion.div 
                   className="absolute top-[40%] right-[15%] w-16 h-16 bg-[#0c80df]/5 rounded-full border border-[#0c80df]/20 flex items-center justify-center"
                   animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <div className="w-2.5 h-2.5 bg-[#0c80df] rounded-full shadow-[0_0_15px_#0c80df]" />
                    <div className="absolute w-full h-full border border-[#0c80df]/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                 </motion.div>
             </div>

             <div className="relative z-10 flex flex-col gap-2">
                 <div className="w-1.5 h-16 absolute -left-6 lg:-left-8 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#0c80df] to-[#CB410F] rounded-r-md opacity-80" />
                 <p className="text-[17px] lg:text-[20px] text-[#0b0a44] font-medium leading-[1.6]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    We believe the future of work is not about doing, but about{" "}
                    <motion.span 
                      className="font-bold inline-block"
                      animate={{ color: ["#0b0a44", "#0c80df", "#0b0a44"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
                      style={{ textShadow: "0 0 10px rgba(12,128,223,0.2)" }}
                    >human adaptability</motion.span>,{" "}
                    <motion.span 
                      className="font-bold inline-block"
                      animate={{ color: ["#0b0a44", "#CB410F", "#0b0a44"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1], delay: 1.5 }}
                      style={{ textShadow: "0 0 10px rgba(203,65,15,0.2)" }}
                    >logic</motion.span>, and{" "}
                    <motion.span 
                      className="font-bold inline-block"
                      animate={{ color: ["#0b0a44", "#CB410F", "#0b0a44"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1], delay: 3 }}
                      style={{ textShadow: "0 0 10px rgba(203,65,15,0.2)" }}
                    >potential</motion.span>.
                 </p>
             </div>
          </motion.div>

          <motion.div 
             className="w-full p-5 lg:p-6 rounded-[1.25rem] bg-white/80 backdrop-blur-xl border border-white shadow-sm"
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
          >
             <p className="text-[15px] lg:text-[17px] text-[#0b0a44] font-medium leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                We are building the ecosystem for this new era.
             </p>
          </motion.div>
      </div>

    </div>
  );
}

