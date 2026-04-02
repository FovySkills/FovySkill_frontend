"use client";
import { motion } from "framer-motion";
import { UserCircle, Building2 } from "lucide-react";

export function TargetAudience() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        {/* Card 1: Creators & Fractional Workers */}
        <motion.div variants={cardVariant} className="group relative flex flex-col h-full glass-card p-10 overflow-hidden hover:glow-blue">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200/40 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <UserCircle className="w-12 h-12 text-blue-600 mb-8" strokeWidth={1.2} />
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">For Creators & Fractional Workers</h3>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
              Let your logic speak. Connect your portfolio and map your transferable skills to land high-value micro-challenges.
            </p>
            <div className="mt-auto">
              <button className="text-blue-600 font-medium tracking-wide flex items-center hover:text-blue-700 transition-colors group/btn">
                Build your Skillmap
                <span className="ml-2 inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Enterprises & HR */}
        <motion.div variants={cardVariant} className="group relative flex flex-col h-full glass-card p-10 overflow-hidden hover:glow-purple">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-200/40 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <Building2 className="w-12 h-12 text-purple-600 mb-8" strokeWidth={1.2} />
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">For Enterprises & HR</h3>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
              Navigate your internal talent pool. Spot undervalued assets, run gap analyses, and build agile strike teams instantly.
            </p>
            <div className="mt-auto">
              <button className="text-purple-600 font-medium tracking-wide flex items-center hover:text-purple-700 transition-colors group/btn">
                Analyze your Workforce
                <span className="ml-2 inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

