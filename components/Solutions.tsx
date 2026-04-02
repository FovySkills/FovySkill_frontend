"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, UserCircle } from "lucide-react";

export function Solutions() {
  const targets = [
    {
      icon: Briefcase,
      title: "For Enterprises",
      desc: "Scale internal mobility efficiently. Run real-time organizational capability analyses to stop external hiring for skills you already possess."
    },
    {
      icon: Users,
      title: "For Managers",
      desc: "Instantly assemble cross-functional project strike teams based on verified potential and readiness, bypassing department politics."
    },
    {
      icon: UserCircle,
      title: "For Employees",
      desc: "Own your growth journey. Access a transparent, self-driven skill topography that clarifies the precise steps for your next promotion."
    }
  ];

  return (
    <section id="solutions" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-t border-[#e2e8f0]/30 mt-12">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0b0a44] mb-4">
          Built for every layer.
        </h2>
        <p className="text-lg text-[#1C3D4A] leading-relaxed">
          Intelligence mapped to specific operational needs, ensuring maximum adoption across the entire workforce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {targets.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-white/70 backdrop-blur-xl border border-[#e2e8f0]/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-start text-left group"
          >
            <div className="w-12 h-12 bg-[#f8fafc] rounded-xl flex items-center justify-center text-[#0c80df] mb-6 border border-[#e2e8f0]/50 group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0b0a44] tracking-tight mb-3">{item.title}</h3>
            <p className="text-[#1C3D4A] leading-relaxed text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

