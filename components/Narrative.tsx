"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CrossSiloAnimation } from "./CrossSiloAnimation";
import { MacroSkillGPS } from "./MacroSkillGPS";
import { SkillFingerprint } from "./SkillFingerprint";

export function Narrative() {
  const sections = [
    {
      subtitle: "FROM SILOS TO AGILITY",
      title: "Break down static structures",
      body: "Stop losing top talent to rigid department structures. FOVY breaks down silos, allowing you to instantly assemble cross-functional strike teams based on verified potential, not just past job titles.",
      benefit: "Deploy agile strike teams in seconds using real capability matching.",
      align: "md:flex-row"
    },
    {
      subtitle: "FROM ADMINISTRATIVE HR TO STRATEGIC ARCHITECT",
      title: "Elevate your human capital",
      body: "Elevate HR from managing performance reviews to architecting the company's future capability. Gain a macro-level GPS of your entire organizational skill gap.",
      benefit: "Visualize organizational capability at a macro, strategic level.",
      align: "md:flex-row-reverse"
    },
    {
      subtitle: "FROM GUESSWORK TO GLASS BOX TRUST",
      title: "Trust is math, not a feeling.",
      body: "Quit betting on resumes. FOVY anchors internal mobility to verifiable evidence, making talent deployment a precise science.",
      benefit: "Mathematically verifiable capability signatures.",
      align: "md:flex-row",
      titleStyle: { fontFamily: "'Alata', sans-serif" },
      bodyClass: "text-[#868686]"
    }
  ];

  return (
    <section id="solutions" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-[#e2e8f0]/30 mt-12">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0a44] leading-tight mb-4">
          Become a Liquid Enterprise.
        </h2>
        <p className="text-xl text-[#0b0a44] font-medium">
          Transform the way your organization views, deploys, and retains human capability.
        </p>
      </div>

      <div className="space-y-32">
        {sections.map((sec, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${sec.align} items-center gap-12 lg:gap-24`}
          >
            {/* Structured Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest text-[#0c80df] uppercase mb-4">{sec.subtitle}</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-[#0b0a44] mb-6 tracking-tight leading-tight" style={sec.titleStyle}>{sec.title}</h3>
              <p className={`text-lg mb-8 leading-relaxed max-w-lg ${sec.bodyClass || 'text-[#0b0a44]'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                {sec.body}
              </p>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-[#e2e8f0]/50 w-fit shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#0c80df] shrink-0" />
                <span className="text-[#0b0a44] font-semibold text-sm">{sec.benefit}</span>
              </div>
            </div>

            {/* Functional UI Placeholder Graphic */}
            <div className={`w-full md:w-1/2 rounded-2xl bg-white/40 backdrop-blur-xl border border-[#e2e8f0]/50 aspect-[4/3] flex items-center justify-center shadow-md relative group ${idx === 1 ? "overflow-visible" : "overflow-hidden"}`}>
               {idx === 0 ? (
                 <CrossSiloAnimation />
               ) : idx === 1 ? (
                 <MacroSkillGPS />
               ) : idx === 2 ? (
                 <SkillFingerprint />
               ) : (
                 <>
                   <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-0" />
                   <span className="text-[#0b0a44]/10 font-bold text-8xl tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-700">
                     0{idx + 1}
                   </span>
                 </>
               )}
            </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
}

