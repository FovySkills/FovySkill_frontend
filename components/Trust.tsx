"use client";
export function Trust() {
  const sequence = [
    { type: 'logo', text: "SinoPac Bank" },
    { type: 'logo', text: "NCKU" },
    { type: 'logo', text: "Atelier future" },
    { type: 'placeholder', text: "Next Visionary" },
    { type: 'logo', text: "FDA Future dynamic accelerator" },
    { type: 'logo', text: "hult prize" },
    { type: 'placeholder', text: "Your Organization" }
  ];

  return (
    <section className="relative py-16 px-4 z-10 overflow-hidden text-center bg-[#f8fafc] border-b border-[#e2e8f0]/50">
      <style>{`
        @keyframes scrollMarquee { 
          0% { transform: translateX(0%); } 
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee { 
          display: flex; 
          width: max-content; 
          animation: scrollMarquee 40s linear infinite; 
        }
        .animate-marquee:hover { 
          animation-play-state: paused; 
        }
      `}</style>

      <div className="max-w-full mx-auto">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#0b0a44]/70 uppercase mb-12">
          Trusted by visionaries in organizational design:
        </p>
        
        {/* Marquee Container with Masking */}
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden flex items-center group">
           {/* Left/Right Edge Gradients for scrolling cue */}
           <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-70" />
           <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-70" />
           
           <div className="animate-marquee">
             {/* Duplicate sets for seamless looping */}
             {[1, 2].map((set) => (
                 <div key={set} className="flex items-center">
                     {sequence.map((item, index) => (
                         <div 
                           key={`${set}-${index}`} 
                           className="flex items-center justify-center mx-8 md:mx-14 lg:mx-16"
                         >
                           {item.type === 'logo' ? (
                             <div className="text-[15px] md:text-lg lg:text-xl text-[#868686] hover:text-[#0b0a44] transition-colors duration-300 font-sans font-bold uppercase tracking-[0.1em] mix-blend-multiply cursor-pointer">
                               {item.text}
                             </div>
                           ) : (
                             <div className="px-6 py-3 border-[1.5px] border-dashed border-[#868686]/40 rounded-xl bg-[#0b0a44]/[0.02] flex items-center justify-center cursor-pointer hover:border-[#0c80df]/40 hover:bg-[#0c80df]/[0.04] transition-all duration-300">
                               <span className="text-[10px] md:text-[12px] text-[#868686] uppercase font-bold tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                 {item.text}
                               </span>
                             </div>
                           )}
                         </div>
                     ))}
                 </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}

