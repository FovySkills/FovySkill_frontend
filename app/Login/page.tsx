"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const route=useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const contentType = res.headers.get("content-type") || ""
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text()

      if (!res.ok) {
        const msg =
          typeof payload === "string"
            ? payload
            : payload?.message || `Request failed (${res.status})`
        setMessage(msg)
        return
      }

      const msg =
        typeof payload === "string" ? "Login ok" : payload?.message || "Login ok"
      // setMessage(msg)
      route.push("/Dashboard")
    } catch (err: any) {
      setMessage(err?.message || "Network error")
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-zinc-300 font-sans flex">

      <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-10 h-full">
        <div
          className="absolute left-[-60%] top-[-10%] w-[1000px] h-[1000px] rounded-full shadow-[0_0_120px_40px_rgba(255,255,255,0.4)] "
        ></div>

        <div
          className="absolute top-[20%] left-[15%] w-[120px] h-[120px] rounded-full shadow-[0_0_60px_20px_rgba(120,160,255,0.4)] "
        ></div>

        <div
          className="absolute bottom-[20%] left-[40%] w-[250px] h-[250px] rounded-full shadow-[0_0_100px_30px_rgba(120,160,255,0.4)] bg-[rgb(35,35,35)] flex flex-col items-center justify-center z-20"
        >
          <span className="text-zinc-400 tracking-[0.4em] text-sm mb-6 font-light">
            2 0 2 6
          </span>
          <span className="text-zinc-400 tracking-[0.4em] text-sm font-light">
            E n t e r p r i s e
          </span>
        </div>
      </div>

      <div className="absolute inset-y-0 right-[8%] w-1/2 flex flex-col justify-center items-center z-30">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(120,160,255,0.5)]">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-semibold text-white tracking-widest">FOVY</span>
          </div>
          <h1 className="text-[28px] text-zinc-200 tracking-wide">Map Your Future.</h1>
        </div>

        <div className="w-[450px] h-[450px] rounded-full shadow-[0_0_80px_20px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center relative">

          <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-4">
            <div className="relative w-[320px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border border-zinc-700 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="relative w-[320px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-zinc-700 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-[200px] rounded-full bg-zinc-300 text-black font-medium py-3 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:bg-white transition-all"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6 text-xs text-zinc-400">
            Don't have a FOVY account? <Link href="/Signup" className="underline text-zinc-200">Sign up</Link>
          </div>

          {message && (
            <p className="absolute bottom-6 text-xs text-red-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}