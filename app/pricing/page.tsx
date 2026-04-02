"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import Link from "next/link";

export default function Pricing() {
  return (
    <main className="relative min-h-screen font-sans w-full overflow-x-hidden pt-32 pb-16 flex flex-col bg-[#ebebeb]">
      <Navbar />
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0b0a44] mb-6 tracking-tight leading-tight">
            Invest in Potential. <br className="hidden md:block"/>
            Scale your enterprise.
          </h1>
          <p className="text-lg text-[#868686] font-medium leading-relaxed">
            Choose the FOVY plan that scales with your ambition. From fast-growing teams to global networks, fluid talent management starts here.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-stretch">
          
          {/* Tier 1: Growth */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 flex flex-col shadow-sm border border-transparent"
          >
            <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 tracking-tight">Growth</h3>
            <p className="text-[#868686] mb-6">For mid-sized teams.</p>
            <div className="mb-8 border-b border-[#e2e8f0] pb-6">
              <span className="text-4xl font-extrabold text-[#0b0a44]">$49</span>
              <span className="text-[#868686] font-medium"> /user/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Basic 3D Skill Mapping
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Standard Integrations
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Email Support
              </li>
            </ul>
            <button className="w-full py-3.5 bg-white border-2 border-[#e2e8f0] text-[#0b0a44] font-semibold rounded-full hover:bg-[#f1f5f9] transition-colors">
              Get Started
            </button>
          </motion.div>

          {/* Tier 2: Enterprise (Highlighted) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 flex flex-col shadow-xl border-2 border-[#cb410f] relative scale-100 md:scale-105 z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#cb410f] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 tracking-tight mt-2">Enterprise</h3>
            <p className="text-[#868686] mb-6">For large organizations.</p>
            <div className="mb-8 border-b border-[#e2e8f0] pb-6">
              <span className="text-4xl font-extrabold text-[#0b0a44]">$99</span>
              <span className="text-[#868686] font-medium"> /user/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Advanced LLM Ingestion
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Macro Dashboard
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> API Access
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Priority Support
              </li>
            </ul>
            <button className="w-full py-3.5 bg-[#cb410f] text-white font-semibold rounded-full hover:bg-[#a0310a] shadow-md hover:shadow-lg transition-all">
              Start Enterprise Trial
            </button>
          </motion.div>

          {/* Tier 3: Liquid Workforce */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 flex flex-col shadow-sm border border-transparent"
          >
            <h3 className="text-2xl font-bold text-[#0b0a44] mb-2 tracking-tight">Liquid Workforce</h3>
            <p className="text-[#868686] mb-6">For massive scale.</p>
            <div className="mb-8 border-b border-[#e2e8f0] pb-6">
              <span className="text-4xl font-extrabold text-[#0b0a44]">Custom</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Unlimited Nodes
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Custom Architecture
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> White-Glove Onboarding
              </li>
              <li className="flex items-center gap-3 text-[#0b0a44] font-medium">
                <CheckIcon /> Dedicated Success Manager
              </li>
            </ul>
            <Link href="/contact" className="w-full py-3.5 bg-[#0b0a44] text-white font-semibold rounded-full hover:bg-[#1a1866] shadow-sm hover:shadow-md transition-all text-center block">
              Contact Sales
            </Link>
          </motion.div>

        </div>

        {/* FAQ Accordion Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl mb-24"
        >
          <h2 className="text-3xl font-bold text-[#0b0a44] mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            <Accordion 
              title="How does the 3D Skill Mapping work?"
              content="FOVY ingests your existing HR data—resumes, performance reviews, and project histories—using our advanced LLM pipeline. It then generates a dynamic, visual 3D network that connects overlapping skills across your entire enterprise."
            />
            <Accordion 
              title="Can we integrate FOVY with Workday or BambooHR?"
              content="Yes. Our Enterprise tier offers comprehensive API access and out-of-the-box integrations for major HRIS platforms, allowing FOVY to stay perfectly synced with your current employee records."
            />
            <Accordion 
              title="What is the setup time for a Liquid Workforce plan?"
              content="For custom scaling architectures, our white-glove onboarding typically maps out your entire organizational structure within 2 to 4 weeks, depending on data volume and compliance requirements."
            />
          </div>
        </motion.div>

      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}

// Helpers

function CheckIcon() {
  return (
    <div className="bg-[#0c80df]/10 p-1 rounded-full text-[#0c80df]">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function Accordion({ title, content }: { title: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-bold text-[#0b0a44] text-lg">{title}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          className="text-[#868686]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-[#868686] font-medium leading-relaxed"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
