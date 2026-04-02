"use client";
import { motion } from "framer-motion";

export function Philosophy() {
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
    <section id="philosophy" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-24">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-[#0b0a44] mb-6 leading-[1.1]">
          The Great Mismatch.
        </h2>
        <p className="text-xl text-[#0b0a44] font-light leading-relaxed">
          Traditional talent infrastructure relies on history to predict the future. Here is why the architecture of work must evolve.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
      >
        {/* Rethink */}
        <motion.div variants={item} className="flex flex-col h-full glass-card p-10">
          <div className="text-[#0c80df] text-sm font-bold tracking-widest uppercase mb-4">Phase 1</div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-6 tracking-tight">Rethink</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            Traditional hiring is broken. We rely on unstructured static PDFs to understand capability. This creates a market full of mispriced potential.
          </p>
        </motion.div>

        {/* Remake */}
        <motion.div variants={item} className="flex flex-col h-full glass-card p-10">
          <div className="text-[#0c80df] text-sm font-bold tracking-widest uppercase mb-4">Phase 2</div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-6 tracking-tight">Remake</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            The Glass Box Skillmap. By using a 3D physics-based engine, we turn unstructured experiential data into verifiable, actionable skill nodes.
          </p>
        </motion.div>

        {/* Redesign */}
        <motion.div variants={item} className="flex flex-col h-full glass-card p-10">
          <div className="text-[#0c80df] text-sm font-bold tracking-widest uppercase mb-4">Phase 3</div>
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-6 tracking-tight">Redesign</h3>
          <p className="text-lg text-[#0b0a44] font-light leading-relaxed mt-auto">
            The Potential Economy. We help enterprises build an agile, liquid workforce where horizontal mobility is natively driven by actual capability, not job titles.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

