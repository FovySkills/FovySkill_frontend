"use client";
import { motion } from "framer-motion";

export function BentoGrid() {
  return (
    <section id="product" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0b0a44] tracking-tight mb-4">Enterprise-Grade HR Intelligence</h2>
        <p className="text-[#0b0a44] text-lg max-w-2xl leading-relaxed">
          Comprehensive tools to map, analyze, and deploy your organizational capabilities with absolute precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {/* Box 1 (Large - The Radar) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card md:col-span-2 md:row-span-2 p-8 flex flex-col relative overflow-hidden group border border-[#e2e8f0]/50"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0c80df]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0c80df]/20 transition-all duration-500" />
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 relative z-10 tracking-tight">Organizational Skill Topography.</h3>
          <p className="text-[#0b0a44] mb-8 relative z-10 max-w-md leading-relaxed">
            Visualize 500+ employees instantly. Identify soft-skill leaders and technical prodigies hidden deep within your ranks.
          </p>
          <div className="flex-1 rounded-2xl border border-[#e2e8f0]/50 w-full relative overflow-hidden flex items-center justify-center shadow-inner">
             <video 
                src="/skillmap-demo.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="object-cover rounded-2xl w-full h-full" 
             />
          </div>
        </motion.div>

        {/* Box 2 (Medium - Internal Mobility) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Precision Internal Transfers.</h3>
            <p className="text-[#0b0a44] text-sm leading-relaxed">
              Match internal employees to new internal roles or AI-transformation projects with surgical accuracy. Retain your best people by continuously challenging them.
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-white/50 border border-[#e2e8f0]/50 w-full mt-6 flex items-end p-3 gap-3 shadow-inner">
            <div className="w-full bg-[#0c80df]/40 h-[60%] rounded-t-sm group-hover:h-[80%] transition-all duration-500" />
            <div className="w-full bg-[#0b0a44] h-[90%] rounded-t-sm group-hover:h-[95%] transition-all duration-500" />
            <div className="w-full bg-[#0c80df]/20 h-[40%] rounded-t-sm group-hover:h-[50%] transition-all duration-500" />
          </div>
        </motion.div>

        {/* Box 3 (Medium - Unstructured Data Ingestion) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Turn PDFs into Potential.</h3>
            <p className="text-[#0b0a44] text-sm leading-relaxed">
              FOVY's LLM engine securely reads your existing performance reviews and manager notes, mapping them onto a universal capability ontology.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3 mt-6 p-4 bg-white/50 rounded-xl border border-[#e2e8f0]/50 shadow-inner">
            <div className="h-2.5 w-full bg-[#0b0a44]/10 rounded-full group-hover:bg-[#0c80df]/20 transition-colors" />
            <div className="h-2.5 w-4/5 bg-[#0b0a44]/10 rounded-full group-hover:bg-[#0c80df]/20 transition-colors delay-75" />
            <div className="h-2.5 w-2/3 bg-[#0c80df] rounded-full shadow-[0_0_10px_rgba(60,159,195,0.4)]" />
          </div>
        </motion.div>

        {/* Box 4 (Small - Employee Growth) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card md:col-span-3 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e2e8f0]/50 min-h-[160px]"
        >
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Self-Driven Growth Paths.</h3>
            <p className="text-[#0b0a44] leading-relaxed">
              Employees see their own 3D Skillmap, understanding exactly what capabilities they need to develop for their next internal promotion or cross-functional deployment.
            </p>
          </div>
          <button className="px-6 py-2.5 border-2 border-[#0c80df] text-[#0c80df] rounded-xl font-semibold text-sm hover:bg-[#0c80df]/10 transition-colors whitespace-nowrap shadow-sm">
            Explore Growth Tracking
          </button>
        </motion.div>
      </div>
    </section>
  );
}

