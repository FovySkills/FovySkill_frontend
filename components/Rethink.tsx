"use client";
import { motion } from "framer-motion";

export function Rethink() {
  return (
    <section id="rethink" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full glass-card p-12 md:p-24 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[60vh] md:min-h-[70vh] border border-white/20"
      >
        <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-overlay" />
        
        {/* CSS Collapsing Nodes Simulation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
           <motion.div
             animate={{ y: [0, 300], opacity: [0, 1, 0], scale: [1, 0.4] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeIn" }}
             className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full border border-gray-400"
             style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)" }}
           />
           <motion.div
             animate={{ y: [0, 400], x: [0, 50], opacity: [0, 1, 0], scale: [1, 0.2] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeIn", delay: 2 }}
             className="absolute top-[5%] right-[25%] w-48 h-48 rounded-full border border-gray-400"
             style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)" }}
           />
           <motion.div
             animate={{ y: [0, 200], x: [0, -40], opacity: [0, 1, 0], scale: [1, 0.6] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeIn", delay: 4 }}
             className="absolute top-[15%] left-[60%] w-24 h-24 rounded-full border border-gray-400"
             style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)" }}
           />
           <motion.div
             animate={{ y: [0, 250], x: [0, -20], opacity: [0, 1, 0], scale: [1, 0.3] }}
             transition={{ duration: 9, repeat: Infinity, ease: "easeIn", delay: 1 }}
             className="absolute top-[25%] left-[30%] w-20 h-20 rounded-full border border-gray-400 bg-black/5"
           />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-sm font-bold tracking-widest text-[#0c80df] uppercase block mb-8">Phase 1: Rethink</span>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-[#0b0a44] leading-[1.05] mb-8">
            Traditional talent management is mispricing human potential.
          </h2>
          <p className="text-xl md:text-2xl text-[#0b0a44] font-light leading-relaxed max-w-3xl mx-auto">
            The Great Mismatch occurs because we map the future using static history. Unstructured PDFs generate collapsed signals, obscuring true capability.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

