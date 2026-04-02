"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

// Helper for Dropdowns
function NavItem({ title, items }: { title: string, items: { label: string, href: string }[] }) {
  return (
    <div className="relative group flex items-center h-full cursor-pointer">
      <span className="text-sm font-medium text-[#868686] group-hover:text-[#0b0a44] transition-colors py-2">
        {title}
      </span>
      {/* Invisible bridge to keep hover active */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 h-4 w-full" />
      
      {/* Dropdown Menu */}
      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
        <div className="w-48 bg-white/80 backdrop-blur-2xl border border-[#e2e8f0] shadow-lg rounded-2xl overflow-hidden py-2 flex flex-col">
          {items.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              className="px-4 py-2.5 text-sm font-medium text-[#868686] hover:text-[#0b0a44] hover:bg-[#f1f5f9] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then(res => {
        if (res.ok) setIsLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY && latest > 50) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
    setLastY(latest);
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-[#e2e8f0] shadow-sm rounded-2xl flex items-center justify-between px-6 py-3 relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/FovyLogo.png" alt="FOVY Logo" className="h-[72px] w-auto" />
          </Link>
        </div>

        {/* Center: Links (Hidden on Mobile) - Temporarily commented out
        <div className="hidden md:flex items-center gap-8 h-full">
          <NavItem 
            title="Product" 
            items={[
              { label: "3D Skillmap", href: "#" },
              { label: "Integrations", href: "#" },
              { label: "API Documentation", href: "#" }
            ]} 
          />
          <NavItem 
            title="Solutions" 
            items={[
              { label: "For Enterprises", href: "#" },
              { label: "For Managers", href: "#" },
              { label: "For Employees", href: "#" }
            ]} 
          />
          <NavItem 
            title="Company" 
            items={[
              { label: "About Us", href: "#" },
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" }
            ]} 
          />
        </div>
        */}

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link href="/pricing" className="hidden sm:block text-sm font-medium text-[#868686] hover:text-[#0b0a44] transition-colors px-2">Pricing</Link>
          <Link href={isLoggedIn ? "/Dashboard" : "/Login"} className="hidden sm:block text-sm font-medium text-[#868686] hover:text-[#0b0a44] transition-colors px-2">
            {isLoggedIn ? "Dashboard" : "Log In"}
          </Link>
          <Link 
            href="/contact" 
            className="px-5 py-2.5 bg-[#cb410f] text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md hover:bg-[#a0310a] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
