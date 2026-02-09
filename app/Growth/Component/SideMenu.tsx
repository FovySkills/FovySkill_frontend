import { AnimatePresence,motion } from "framer-motion";
import React from "react";

interface SidebarProps
{
    showSidebar:boolean,
    setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>

}

export default function Sidebar({showSidebar,setShowSidebar}:SidebarProps)
{


    return(
       <AnimatePresence>
      {showSidebar && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay：點外面關 */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={()=>setShowSidebar(prev=>!prev)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="sidemenu"
            onClick={(e) => e.stopPropagation()}
            className="
              absolute right-0 top-0 h-full
              w-[30%] min-w-[320px] max-w-[480px]
              bg-zinc-900 text-white
              shadow-[-12px_0_24px_rgba(0,0,0,0.5)]
              flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="font-medium">sidemenu</div>
              <button
                type="button"
                onClick={()=>setShowSidebar(prev=>!prev)}
                className="rounded-full px-3 py-1 text-sm bg-white/10 hover:bg-white/20 transition"
              >
                Close
              </button>
            </div>

            
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
    )
}