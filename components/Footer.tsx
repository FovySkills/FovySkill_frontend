"use client";
export function Footer() {
  return (
    <footer className="relative border-t border-[#e2e8f0]/50 bg-white/50 backdrop-blur-xl z-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-2 space-y-4 pr-8">
            <div className="flex items-center gap-2">
              <img src="/FovyLogo.png" alt="FOVY Logo" className="h-[72px] w-auto" />
            </div>
            <p className="text-sm text-[#0b0a44] max-w-sm mt-4 leading-relaxed font-normal">
              The skill intelligence platform for the liquid workforce. Bridge the gap between human adaptability and business challenges.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#0b0a44] font-semibold mb-4 tracking-tight text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-[#0b0a44] font-normal">
              <li><a href="#" className="hover:text-[#0c80df] transition-colors">3D Skillmap</a></li>
              <li><a href="#" className="hover:text-[#0c80df] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#0c80df] transition-colors">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#0b0a44] font-semibold mb-4 tracking-tight text-sm">Solutions</h4>
            <ul className="space-y-3 text-sm text-[#0b0a44] font-normal">
              <li><a href="#solutions" className="hover:text-[#0c80df] transition-colors">For Enterprises</a></li>
              <li><a href="#solutions" className="hover:text-[#0c80df] transition-colors">For Managers</a></li>
              <li><a href="#solutions" className="hover:text-[#0c80df] transition-colors">For Employees</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#0b0a44] font-semibold mb-4 tracking-tight text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-[#0b0a44] font-normal">
              <li><a href="#team" className="hover:text-[#0c80df] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#0c80df] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0c80df] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#e2e8f0]/50">
          <div className="text-sm text-[#0b0a44] font-normal">
            &copy; 2026 FOVY. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="mailto:hello@fovyskill.com" className="text-sm text-[#0b0a44] hover:text-[#0c80df] transition-colors font-normal">
              hello@fovyskill.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

