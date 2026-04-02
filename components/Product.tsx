"use client";
import { motion } from "framer-motion";

export function Product() {
  return (
    <section id="product" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0b0a44] tracking-tight mb-4">Core Mechanism</h2>
        <p className="text-[#1C3D4A] text-lg max-w-2xl leading-relaxed">
          The infrastructure powering the next generation of enterprise mobility and analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {/* Box 1 (Large - The Radar) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card md:col-span-2 md:row-span-2 p-8 flex flex-col relative overflow-hidden group border border-[#e2e8f0]/50 bg-white/60"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0c80df]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0c80df]/20 transition-all duration-500" />
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 relative z-10 tracking-tight">3D Skillmap Visualization</h3>
          <p className="text-[#1C3D4A] mb-8 relative z-10 max-w-md leading-relaxed">
            The dynamic visualization of evidence-anchored skills. Transform unstructured personnel data into a queryable, living organizational graph.
          </p>
          <div className="flex-1 rounded-2xl bg-white/70 border border-[#e2e8f0]/50 w-full relative overflow-hidden flex items-center justify-center shadow-sm">
             {/* Abstract CSS Network */}
             <div className="w-16 h-16 rounded-full bg-[#0b0a44] absolute top-[30%] left-[30%] shadow-lg transition-transform group-hover:scale-110 duration-500 z-10 flex items-center justify-center text-white text-xs font-bold">NODE</div>
             <div className="w-12 h-12 rounded-full border-[3px] border-[#0c80df] absolute top-[60%] left-[60%] shadow-sm bg-white/80 backdrop-blur-sm transition-transform group-hover:-translate-y-2 duration-500 z-10" />
             <div className="w-8 h-8 rounded-full bg-[#0c80df] absolute top-[40%] right-[20%] shadow-lg transition-transform group-hover:scale-125 duration-500 z-10" />
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                <line x1="30%" y1="30%" x2="60%" y2="60%" stroke="#0b0a44" strokeWidth="2" />
                <line x1="60%" y1="60%" x2="80%" y2="40%" stroke="#0c80df" strokeWidth="2" />
             </svg>
          </div>
        </motion.div>

        {/* Box 2 (Medium - Integrations) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50 bg-white/60"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Seamless Integrations</h3>
            <p className="text-[#1C3D4A] text-sm leading-relaxed">
              Connect effortlessly with existing HR systems, GitHub, and historical performance review datasets.
            </p>
          </div>
          <div className="flex-1 flex flex-wrap gap-3 mt-6 items-end content-end">
            <div className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#0b0a44] shadow-sm">Workday</div>
            <div className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#0b0a44] shadow-sm">GitHub</div>
            <div className="px-3 py-1.5 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#0b0a44] shadow-sm">Slack</div>
            <div className="px-3 py-1.5 bg-[#0b0a44] text-white rounded-lg text-xs font-semibold shadow-sm">+14 More</div>
          </div>
        </motion.div>

        {/* Box 3 (Medium - API Documentation) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50 bg-white/60"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">API Infrastructure</h3>
            <p className="text-[#1C3D4A] text-sm leading-relaxed">
              Developer-ready endpoints for custom workforce planning workflows and intelligence routing.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-end space-y-2 mt-6 p-4 bg-[#0b0a44] rounded-xl shadow-inner font-mono text-[10px] text-[#0c80df]">
            <p><span className="text-white">POST</span> /v1/evaluate</p>
            <p><span className="text-white">GET</span> /v1/nodes/topography</p>
            <p><span className="text-white">GET</span> /v1/match/strike-team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

