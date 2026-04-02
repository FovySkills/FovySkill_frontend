"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    title: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen font-sans w-full overflow-x-hidden pt-24 pb-16 flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pt-8 pb-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: The Pitch */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#0b0a44] mb-6 tracking-tight leading-tight">
              Let's architect your liquid workforce.
            </h1>
            <p className="text-lg text-[#868686] font-medium leading-relaxed">
              Discover how FOVY's 3D skillmap and intelligence platform can transform your enterprise. Reach out to our team of experts and let's map your potential today.
            </p>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg relative overflow-hidden mb-24">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-16 h-16 bg-[#3b8402]/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#3b8402]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[#0b0a44] mb-4">Message Received.</h3>
                  <p className="text-[#868686] text-lg">Our team will reach out to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#0b0a44]">Full Name</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d9d9d9] focus:outline-none focus:border-[#0c80df] focus:ring-1 focus:ring-[#0c80df] transition-all" placeholder="Jane Doe" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#0b0a44]">Work Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d9d9d9] focus:outline-none focus:border-[#0c80df] focus:ring-1 focus:ring-[#0c80df] transition-all" placeholder="jane@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#0b0a44]">Company Name</label>
                      <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d9d9d9] focus:outline-none focus:border-[#0c80df] focus:ring-1 focus:ring-[#0c80df] transition-all" placeholder="Acme Corp" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-[#0b0a44]">Job Title / Role</label>
                      <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d9d9d9] focus:outline-none focus:border-[#0c80df] focus:ring-1 focus:ring-[#0c80df] transition-all" placeholder="VP of HR" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#0b0a44]">How can FOVY help you?</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d9d9d9] focus:outline-none focus:border-[#0c80df] focus:ring-1 focus:ring-[#0c80df] transition-all resize-none" placeholder="Tell us about your challenges..."></textarea>
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="mt-4 w-full py-4 bg-[#cb410f] text-white font-semibold text-lg rounded-full hover:bg-[#a0310a] shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
