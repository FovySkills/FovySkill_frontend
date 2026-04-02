"use client";
import { motion } from "framer-motion";

export function Remake() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <section id="remake" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-24">
      <div className="mb-24">
        <span className="text-sm font-bold tracking-widest text-[#0c80df] uppercase block mb-4">Phase 2: Remake</span>
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-[#0b0a44] leading-[1.05]">
          The Glass Box Skillmap.
        </h2>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Card 1 */}
        <motion.div variants={item} className="group relative flex flex-col glass-card min-h-[450px] p-10 lg:p-12 overflow-hidden col-span-1 md:col-span-2 lg:col-span-1 border border-white/20">
          <div className="flex-1 relative mb-12 mt-4 min-h-[150px] flex items-center justify-center">
             {/* 3D Nodes Simulation */}
             <div className="relative w-full h-full max-w-[200px] mx-auto">
               {/* Connecting CSS Lines */}
               <div className="absolute top-1/2 left-[20%] right-[20%] h-px bg-gray-300 transform -translate-y-1/2 group-hover:bg-[#0c80df] transition-colors duration-500" />
               <div className="absolute top-[20%] left-[50%] h-[60%] w-px bg-gray-300 transform -translate-x-1/2 group-hover:bg-[#0c80df] transition-colors duration-500" />
               
               {/* Solid Node */}
               <div className="absolute top-1/2 left-[20%] w-14 h-14 rounded-full bg-[#0b0a44] transform -translate-x-1/2 -translate-y-1/2 shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.5),inset_5px_5px_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500 z-10" />
               
               {/* Hollow Node */}
               <div className="absolute top-[20%] left-[50%] w-14 h-14 rounded-full border border-gray-400 bg-white/10 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:border-[#0c80df] group-hover:bg-white/30 z-10" />
               
               {/* Glowing Node */}
               <div className="absolute top-1/2 left-[80%] w-14 h-14 rounded-full bg-[#0c80df] transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(60,159,195,0.6),inset_-5px_-5px_10px_rgba(0,0,0,0.2),inset_5px_5px_10px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-500 z-10" />
             </div>
          </div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-4 tracking-tight">Evidence-Anchored Intelligence.</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            Dynamic physics-based visualization of verified claims, hollow assertions, and active readiness models.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={item} className="group relative flex flex-col glass-card min-h-[450px] p-10 lg:p-12 overflow-hidden border border-white/20">
          <div className="flex-1 flex items-center justify-center text-[7rem] lg:text-[9rem] font-bold text-[#0b0a44]/5 leading-none tracking-tighter mix-blend-multiply group-hover:text-[#0c80df]/10 transition-colors duration-500 -ml-4">
            500+
          </div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-4 tracking-tight">Macro-Level Department Dashboard.</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            An aggregate visual mapping of organizational density, instantly highlighting missing skill nodes and internal mobility pathways.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={item} className="group relative flex flex-col glass-card min-h-[450px] p-10 lg:p-12 overflow-hidden border border-white/20">
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="w-full h-full max-h-[150px] border border-white/30 bg-white/20 backdrop-blur-xl rounded-[2rem] flex flex-col justify-center p-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] group-hover:bg-white/40 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              <div className="w-1/2 h-2.5 bg-[#0b0a44]/10 rounded-full mb-5" />
              <div className="w-3/4 h-2.5 bg-[#0c80df]/20 rounded-full mb-5" />
              <div className="w-1/3 h-2.5 bg-[#0b0a44]/10 rounded-full" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-4 tracking-tight">The Glass Box Trust Protocol.</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            Own the logic. Don't just trust the AI; trust the verifiable, immutable capability network that it generates.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}

