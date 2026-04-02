"use client";
import SkillMap from "@/app/Growth/Component/SkillMap";
import { motion } from "framer-motion";
const demoGraphData = '{"nodes":[{"id":"0","name":"Me","level":0,"score":5},{"id":"1","name":"Software Engineering Fundamentals","level":1,"score":4.5},{"id":"1.1","name":"Programming Language Fundamentals","level":2,"score":4.8},{"id":"1.1.1","name":"Python","level":3,"score":5.0},{"id":"1.1.2","name":"TypeScript","level":3,"score":4.5},{"id":"1.1.3","name":"C/C++","level":3,"score":4.0},{"id":"1.1.4","name":"C#","level":3,"score":4.2},{"id":"1.2","name":"System Design and Architecture","level":2,"score":4.0},{"id":"1.2.1","name":"UML/OOAD","level":3,"score":4.0},{"id":"1.5","name":"Version Control and Collaboration","level":2,"score":4.5},{"id":"1.5.1","name":"Git","level":3,"score":4.5},{"id":"2","name":"Backend Development","level":1,"score":4.3},{"id":"2.1","name":"API Design and Implementation","level":2,"score":4.2},{"id":"2.1.1","name":"RESTful APIs","level":3,"score":4.2},{"id":"2.2","name":"Backend Frameworks and Services","level":2,"score":4.0},{"id":"2.2.1","name":"Node.js","level":3,"score":4.5},{"id":"2.2.2","name":".NET","level":3,"score":3.5},{"id":"2.3","name":"Networking","level":2,"score":4.5},{"id":"2.3.1","name":"WebSocket","level":3,"score":4.5},{"id":"2.4","name":"Database Design and Management","level":2,"score":3.8},{"id":"2.4.1","name":"MariaDB","level":3,"score":4.0},{"id":"2.4.2","name":"SQL","level":3,"score":4.0},{"id":"3","name":"Frontend Development","level":1,"score":4.5},{"id":"3.1","name":"Web Frontend","level":2,"score":4.7},{"id":"3.1.1","name":"React.js","level":3,"score":4.8},{"id":"3.1.2","name":"Next.js","level":3,"score":4.2},{"id":"3.1.3","name":"HTML5/CSS3","level":3,"score":4.5},{"id":"5","name":"Artificial Intelligence and Machine Learning","level":1,"score":4.7},{"id":"5.2","name":"Deep Learning Models","level":2,"score":4.8},{"id":"5.2.1","name":"PyTorch","level":3,"score":4.8},{"id":"5.2.2","name":"Transformer","level":3,"score":4.7},{"id":"5.3","name":"NLP and Speech Processing","level":2,"score":4.5},{"id":"5.3.1","name":"LLM Fine-tuning","level":3,"score":4.5},{"id":"5.3.2","name":"Code Llama","level":3,"score":4.5},{"id":"5.4","name":"Computer Vision","level":2,"score":4.0},{"id":"5.4.1","name":"Swin Transformer","level":3,"score":4.0},{"id":"6","name":"DevOps and Cloud","level":1,"score":3.5},{"id":"6.3","name":"Containers and Virtualization","level":2,"score":4.0},{"id":"6.3.1","name":"Docker","level":3,"score":4.0}],"links":[{"source":"0","target":"1"},{"source":"1","target":"1.1"},{"source":"1.1","target":"1.1.1"},{"source":"1.1","target":"1.1.2"},{"source":"1.1","target":"1.1.3"},{"source":"1.1","target":"1.1.4"},{"source":"1","target":"1.2"},{"source":"1.2","target":"1.2.1"},{"source":"1","target":"1.5"},{"source":"1.5","target":"1.5.1"},{"source":"0","target":"2"},{"source":"2","target":"2.1"},{"source":"2.1","target":"2.1.1"},{"source":"2","target":"2.2"},{"source":"2.2","target":"2.2.1"},{"source":"2.2","target":"2.2.2"},{"source":"2","target":"2.3"},{"source":"2.3","target":"2.3.1"},{"source":"2","target":"2.4"},{"source":"2.4","target":"2.4.1"},{"source":"2.4","target":"2.4.2"},{"source":"0","target":"3"},{"source":"3","target":"3.1"},{"source":"3.1","target":"3.1.1"},{"source":"3.1","target":"3.1.2"},{"source":"3.1","target":"3.1.3"},{"source":"0","target":"5"},{"source":"5","target":"5.2"},{"source":"5.2","target":"5.2.1"},{"source":"5.2","target":"5.2.2"},{"source":"5","target":"5.3"},{"source":"5.3","target":"5.3.1"},{"source":"5.3","target":"5.3.2"},{"source":"5","target":"5.4"},{"source":"5.4","target":"5.4.1"},{"source":"0","target":"6"},{"source":"6","target":"6.3"},{"source":"6.3","target":"6.3.1"}]}'
export function BentoGrid() {
  return (
    <section id="product" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0b0a44] tracking-tight mb-4">Enterprise-Grade HR Intelligence</h2>
        <p className="text-[#0b0a44] text-lg max-w-2xl leading-relaxed">
          Comprehensive tools to map, analyze, and deploy your organizational capabilities with absolute precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {/* Box 1 (Large - The Radar) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card md:col-span-2 md:row-span-2 p-8 flex flex-col relative overflow-hidden group border border-[#e2e8f0]/50"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0c80df]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0c80df]/20 transition-all duration-500" />
          <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 relative z-10 tracking-tight">Organizational Skill Topography.</h3>
          <p className="text-[#0b0a44] mb-8 relative z-10 max-w-md leading-relaxed">
            Visualize 500+ employees instantly. Identify soft-skill leaders and technical prodigies hidden deep within your ranks.
          </p>
          {/* <div className="flex-1 rounded-2xl border border-[#e2e8f0]/50 w-full relative overflow-hidden flex items-center justify-center shadow-inner"> */}
          <SkillMap graphData={demoGraphData} />
          {/* </div> */}
        </motion.div>

        {/* Box 2 (Medium - Internal Mobility) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Precision Internal Transfers.</h3>
            <p className="text-[#0b0a44] text-sm leading-relaxed">
              Match internal employees to new internal roles or AI-transformation projects with surgical accuracy. Retain your best people by continuously challenging them.
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-white/50 border border-[#e2e8f0]/50 w-full mt-6 flex items-end p-3 gap-3 shadow-inner">
            <div className="w-full bg-[#0c80df]/40 h-[60%] rounded-t-sm group-hover:h-[80%] transition-all duration-500" />
            <div className="w-full bg-[#0b0a44] h-[90%] rounded-t-sm group-hover:h-[95%] transition-all duration-500" />
            <div className="w-full bg-[#0c80df]/20 h-[40%] rounded-t-sm group-hover:h-[50%] transition-all duration-500" />
          </div>
        </motion.div>

        {/* Box 3 (Medium - Unstructured Data Ingestion) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 flex flex-col justify-between group border border-[#e2e8f0]/50"
        >
          <div>
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Turn PDFs into Potential.</h3>
            <p className="text-[#0b0a44] text-sm leading-relaxed">
              FOVY's LLM engine securely reads your existing performance reviews and manager notes, mapping them onto a universal capability ontology.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3 mt-6 p-4 bg-white/50 rounded-xl border border-[#e2e8f0]/50 shadow-inner">
            <div className="h-2.5 w-full bg-[#0b0a44]/10 rounded-full group-hover:bg-[#0c80df]/20 transition-colors" />
            <div className="h-2.5 w-4/5 bg-[#0b0a44]/10 rounded-full group-hover:bg-[#0c80df]/20 transition-colors delay-75" />
            <div className="h-2.5 w-2/3 bg-[#0c80df] rounded-full shadow-[0_0_10px_rgba(60,159,195,0.4)]" />
          </div>
        </motion.div>

        {/* Box 4 (Small - Employee Growth) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card md:col-span-3 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e2e8f0]/50 min-h-[160px]"
        >
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-[#0b0a44] mb-2 tracking-tight">Self-Driven Growth Paths.</h3>
            <p className="text-[#0b0a44] leading-relaxed">
              Employees see their own 3D Skillmap, understanding exactly what capabilities they need to develop for their next internal promotion or cross-functional deployment.
            </p>
          </div>
          <button className="px-6 py-2.5 border-2 border-[#0c80df] text-[#0c80df] rounded-xl font-semibold text-sm hover:bg-[#0c80df]/10 transition-colors whitespace-nowrap shadow-sm">
            Explore Growth Tracking
          </button>
        </motion.div>
      </div>
    </section>
  );
}

