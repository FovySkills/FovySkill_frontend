"use client";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { PhilosophySection } from "./PhilosophySection";
// Import the Generative Data-Art Components
import { BattieAnimation, TanAnimation, CristinaAnimation, MickAnimation, JesseAnimation } from "./TeamAnimations";

export function Team() {
  const teamMembers = [
    {
      name: "Battie Chen",
      role: "CEO / Founder",
      quote: "We don't just build software; we architect systems that reveal the true shape of human adaptability.",
      linkedin: "https://www.linkedin.com/in/battie-chen-85430a23b/",
      animation: <BattieAnimation />
    },
    {
      name: "TanZiHui",
      role: "CTO / Co-Founder",
      quote: "Translating complex human capabilities into elegant, verifiable algorithms.",
      linkedin: "https://www.linkedin.com/in/蘑-菇-2223402b5/",
      animation: <TanAnimation />
    },
    {
      name: "Cristina",
      role: "CMO / Co-Founder",
      quote: "We aren't just scaling a platform; we are pioneering a new philosophy of work.",
      linkedin: "#",
      animation: <CristinaAnimation />
    },
    {
      name: "Mick",
      role: "Backend AI Engineer",
      quote: "To seek knowledge and truth is to follow the path of what truly endures.",
      linkedin: "https://www.linkedin.com/in/昱光-朱-250b48216/",
      animation: <MickAnimation />
    },
    {
      name: "Jesse",
      role: "Backend Engineer",
      quote: "Precision in code translates to undeniable fairness in human opportunity.",
      linkedin: "https://www.linkedin.com/in/jesse-jiang-65727a24a",
      animation: <JesseAnimation />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  return (
    <section id="team" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto z-10 scroll-mt-24">
      {/* Philosophy / About Us Header */}
      <PhilosophySection />

      <div className="text-center mb-16 md:mb-24 mt-32">
        <h3 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0b0a44] mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Alata', sans-serif" }}>
          The Architects of Human Potential
        </h3>
        <p className="text-lg md:text-xl text-[#868686] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
          A multidisciplinary team dedicated to making talent deployment a precise science.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto"
      >
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index}
            variants={item} 
            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm group relative flex flex-col p-8 lg:p-10 rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden items-center text-center hover:shadow-[0_20px_40px_rgba(12,128,223,0.1)] transition-all duration-500"
          >
            {/* Ambient Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c80df]/5 to-[#CB410F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Profile Image / Generative Animation */}
            <div className="relative z-10 w-24 h-24 lg:w-28 lg:h-28 mb-6 rounded-[2rem] border border-[#e2e8f0]/80 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(12,128,223,0.25)] transition-all duration-500 overflow-hidden transform-gpu">
               
               {/* Generative Animation Background Layer */}
               <div className="absolute inset-0 z-0 w-full h-full">
                 {member.animation}
               </div>

               {/* Inner glass overlay to blend it slightly */}
               <div className="absolute inset-0 bg-white/10 opacity-50 z-10 pointer-events-none mix-blend-overlay" />
            </div>
            
            <h3 className="relative z-10 text-2xl lg:text-[26px] font-bold text-[#0b0a44] tracking-tight mb-2" style={{ fontFamily: "'Alata', sans-serif" }}>{member.name}</h3>
            
            <h4 className="relative z-10 text-[11px] lg:text-xs font-bold text-[#CB410F] mb-6 tracking-[0.2em] uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>{member.role}</h4>
            
            <p className="relative z-10 text-[#868686] font-medium italic leading-relaxed text-[15px] mb-8 flex-grow flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              "{member.quote}"
            </p>

            <div className="relative z-10 mt-auto pt-6 border-t border-[#e2e8f0]/80 w-full flex justify-center">
              <a 
                href={member.linkedin} 
                target={member.linkedin !== "#" ? "_blank" : undefined} 
                rel={member.linkedin !== "#" ? "noopener noreferrer" : undefined} 
                className="p-3 rounded-2xl bg-white hover:bg-[#0c80df] text-[#0c80df] hover:text-white transition-all duration-300 border border-[#0c80df]/20 shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

