import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react"

type UserProfile = {
  username?: string
  position?: string
  department_name?: string
  email?: string
}

interface UserPropertyProps {
  isVisible: boolean
  setVisible: (visible: boolean) => void
  me: UserProfile
}

export default function UserProperty({ isVisible, setVisible, me }: UserPropertyProps) {
  const [isBellActive, setBellActive] = useState<boolean>(false)
  const username = me.username ?? ""
  const position = me.position ?? ""
  const department = me.department_name ?? ""
  const email = me.email ?? ""

  async function logoutHandler() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setVisible(false)
      window.location.href = "/"
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ y: "100%", x: "-50%", opacity: 0 }}
            animate={{ y: "0%", x: "-50%", opacity: 1 }}
            exit={{ y: "100%", x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="fixed bottom-0 left-1/2 z-50 w-full max-w-[1000px] p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2a2a2a]/95 backdrop-blur-3xl border border-white/10 p-10 rounded-[32px] shadow-[0_-10px_50px_rgba(0,0,0,0.5)] text-white"
            >
              <div className="mx-auto flex w-full max-w-[700px] flex-col items-center">
                <div className="flex w-full flex-col justify-between pt-2">
                  <div className="mb-8 flex items-start justify-center gap-12">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-zinc-200 rounded-full flex items-center justify-center mb-4 text-zinc-600 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 text-2xl font-light tracking-wide">
                        {username}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-white transition-colors">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-6 pt-3 border-l border-white/5 pl-8">
                      <div className="grid grid-cols-[80px_1fr] gap-x-6 gap-y-5 text-[15px]">
                        <span className="text-zinc-300">目前職位</span>
                        <span className="text-white tracking-wide">{position}</span>
                        <span className="text-zinc-300">所在部門</span>
                        <span className="text-white tracking-wide">{department}</span>
                        <span className="text-zinc-300">Email</span>
                        <span className="text-white tracking-wide">{email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mb-10 w-full max-w-[520px] space-y-4">
                    <SettingRow
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      }
                      label="Language"
                      value="繁體中文"
                    />
                  </div>

                  <div className="mx-auto flex w-full max-w-[520px] items-center gap-4">
                    <div className="w-[100px] h-12 bg-[#202020] rounded-full p-1 flex items-center justify-between border border-white/5 shadow-inner cursor-pointer group">
                      <div className="w-10 h-10 bg-[#3a3a3a] rounded-full flex items-center justify-center shadow-md group-hover:bg-[#444] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 21v-2.25m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                        </svg>
                      </div>
                    </div>

                    <button
                      onClick={() => logoutHandler()}
                      className="flex-1 h-12 bg-[#202020] hover:bg-zinc-700 rounded-full font-bold tracking-[0.2em] transition-all active:scale-95 shadow-lg border border-white/5 text-sm"
                    >
                      LOG OUT
                    </button>

                    <button 
                      type="button" 
                      onClick={() => setBellActive(prev => !prev)}
                      className={`w-12 h-12 bg-[#202020] hover:bg-zinc-700 rounded-full flex items-center justify-center transition-all border border-white/5 active:scale-90 relative ${isBellActive ? "border-yellow-500/20" : ""}`}
                    >
                      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-colors ${isBellActive ? "bg-yellow-400" : "bg-white"}`}></div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-colors ${isBellActive ? "text-yellow-400" : "text-zinc-300"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                      </svg>
                    </button>
                  </div>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SettingRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4 w-[140px] text-zinc-200">
        {icon}
        <span className="text-[15px] tracking-wide">{label}</span>
      </div>
      <div className="flex-1 bg-[#202020] border border-white/5 rounded-full px-6 py-3 flex justify-between items-center cursor-pointer hover:bg-zinc-800 transition-colors shadow-inner">
        <span className="text-[14px] text-zinc-300 tracking-wide">{value}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </div>
    </div>
  )
}
