"use client";
import { motion } from "framer-motion";
import { Briefcase, Building2, ArrowRight } from "lucide-react";

export function TargetSolutions() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <section id="solutions" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-24">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-[#0b0a44] mb-6 leading-[1.1]">
          A Dual-Sided Engine.
        </h2>
        <p className="text-xl text-[#0b0a44] font-light leading-relaxed">
          FOVY operates as a symmetric marketplace, delivering extreme precision for both the builders and the buyers of the future economy.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Enterprise Card */}
        <motion.div variants={item} className="group relative flex flex-col h-full glass-card p-10 lg:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e2e8f0]/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#cbd5e1]/50 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 rounded-3xl bg-[#f8fafc] flex items-center justify-center mb-8 border border-[#e2e8f0]">
              <Building2 className="w-8 h-8 text-[#0c80df]" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-semibold text-[#0b0a44] mb-4 tracking-tight">For Enterprises</h3>
            <p className="text-xl text-[#0b0a44] font-light leading-relaxed mb-8">
              Scale your internal mobility and close organizational skill gaps with surgical precision. Match the right internal talent to the right critical path initiatives in seconds.
            </p>
            <div className="mt-auto">
              <button className="text-[#0c80df] font-medium tracking-wide flex items-center hover:text-[#0b0a44] transition-colors group/btn">
                Enterprise Solutions
                <ArrowRight className="ml-2 w-4 h-4 inline-block group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Fractional Workers Card */}
        <motion.div variants={item} className="group relative flex flex-col h-full glass-card p-10 lg:p-12 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#cbd5e1]/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-[#e2e8f0]/40 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 rounded-3xl bg-[#f8fafc] flex items-center justify-center mb-8 border border-[#e2e8f0]">
              <Briefcase className="w-8 h-8 text-[#0c80df]" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-semibold text-[#0b0a44] mb-4 tracking-tight">For Fractional Workers</h3>
            <p className="text-xl text-[#0b0a44] font-light leading-relaxed mb-8">
              Own your potential. Build an immutable, verifiable 3D Skillmap that translates your non-linear career history into logic that lands high-value independent challenges.
            </p>
            <div className="mt-auto">
              <button className="text-[#0c80df] font-medium tracking-wide flex items-center hover:text-[#0b0a44] transition-colors group/btn">
                Join the Network
                <ArrowRight className="ml-2 w-4 h-4 inline-block group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

