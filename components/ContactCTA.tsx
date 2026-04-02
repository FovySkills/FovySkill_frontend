"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-[#0b0a44]">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0c80df] rounded-full blur-[150px] opacity-[0.15] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6148a8] rounded-full blur-[150px] opacity-[0.2] translate-y-1/3 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Ready to unlock your <br className="hidden md:block" />
          <span className="text-[#cb410f]">liquid workforce?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[#b4b4b4] mb-12 max-w-2xl mx-auto font-medium"
        >
          Stop guessing. Start mapping. Join the visionary enterprises using FOVY to turn hidden human capabilities into their ultimate competitive advantage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="px-10 py-4 bg-[#cb410f] text-white rounded-2xl font-semibold text-lg hover:bg-[#a0310a] shadow-lg hover:shadow-xl transition-all w-full sm:w-auto hover:-translate-y-1">
            Get in Touch
          </Link>
          <a href="#" className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all w-full sm:w-auto">
            View Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}

