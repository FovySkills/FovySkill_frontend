"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  function RouterHandler() {
    const hasToken = document.cookie.includes("token=");
    if (!hasToken) {
      router.push("/Login");
    } else {
      router.push("/Dashboard");
    }
  }
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 flex min-h-[90vh] items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-[#e2e8f0] bg-white/70 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-[#0b0a44] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#0c80df] mr-2" />
          Next-Generation HR Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#0b0a44] mb-6 leading-tight drop-shadow-sm mix-blend-multiply"
        >
          <span className="text-[#0b0a44]">See the talent.</span><br />
          <span className="text-[#cb410f]">Shape the future.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#868686] mb-10 font-normal max-w-3xl mx-auto leading-relaxed"
        >
          The skill intelligence platform that turns hidden capabilities into your ultimate competitive advantage.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={RouterHandler}
            className="px-8 py-3.5 bg-[#cb410f] text-white rounded-2xl font-semibold text-base shadow-sm hover:shadow-md hover:bg-[#a0310a] transition-all flex items-center justify-center w-full sm:w-auto text-center cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Enterprise Access
          </button>
          {/* 
          <button 
            className="px-8 py-3.5 bg-white border border-[#e2e8f0] text-[#0b0a44] rounded-2xl font-semibold text-base hover:bg-[#F3F8FB] transition-all flex items-center justify-center w-full sm:w-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Explore the HR Dashboard
          </button>
          */}
        </motion.div>

      </div>
    </section>
  );
}
