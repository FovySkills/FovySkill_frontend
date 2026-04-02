"use client";
import { motion } from "framer-motion";

export function Solution() {
  const steps = [
    { num: "01", title: "Ingest Data", desc: "Connect existing data silos, extracting unstructured raw capability signals directly into the network." },
    { num: "02", title: "Map Capability", desc: "Proprietary physics-engine nodes dynamically translate your non-linear soft and hard skills." },
    { num: "03", title: "Deploy Talent", desc: "Instantly match verified organizational capabilities against critical business gaps." }
  ];

  return (
    <section id="act" className="relative py-40 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center mb-32">
        <h2 className="text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-bold tracking-tighter text-[#0b0a44] leading-[0.95] mix-blend-multiply mb-8">
          Navigate your liquid workforce instantly.
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-24 relative w-full">
        <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-px bg-[#0b0a44]/10" />
        
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
            className="relative flex flex-col pt-12 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] bg-[#f8fafc] px-6 text-[4rem] font-black text-[#0b0a44]/10 tracking-tighter mix-blend-multiply">
              {step.num}
            </div>
            <h3 className="text-3xl font-bold text-[#0b0a44] mb-6 tracking-tight relative z-10">{step.title}</h3>
            <p className="text-xl text-[#0b0a44] font-light leading-relaxed max-w-xs mx-auto relative z-10">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-12 py-5 bg-[#0c80df] text-white rounded-full font-semibold text-[17px] tracking-wide shadow-[0_0_30px_rgba(60,159,195,0.4)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(60,159,195,0.6)] hover:bg-[#0a65b0]"
      >
        Initiate Strategy Session
      </motion.button>
    </section>
  );
}

