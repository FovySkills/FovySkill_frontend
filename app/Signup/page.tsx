"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function LoginPage() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [responseText, setResponseText] = useState<string>("")
    
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string>("")

    const route=useRouter()
    useEffect(() => {
        if (!password && !repassword) {
            setPasswordError("")
            setIsCorrect(false)
            return
        }

        if (password.length < 8) {
            setPasswordError("密碼長度至少需要 8 個字元")
            setIsCorrect(false)
        } else if (password !== repassword) {
            setPasswordError("兩次輸入的密碼不一致")
            setIsCorrect(false)
        } else {
            setPasswordError("")
            setIsCorrect(true)
        }
    }, [password, repassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setResponseText("")

        if (!fullName || !email || !password) {
            setResponseText("缺少必填欄位")
            return
        }

        if (!isCorrect) {
            setResponseText("請確認密碼格式正確且相符")
            return
        }

        setLoading(true)
        try {
            const bodyObj = {
                username: fullName,
                email: email,
                password: password,
                user_type: "employee",
            }

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(bodyObj),
                credentials: "same-origin",
            })

            const ct = res.headers.get("content-type") || ""
            const data = ct.includes("application/json") ? await res.json() : await res.text()

            if (!res.ok) {
              // 顯示後端的錯誤訊息（如帳號已存在）
              const errMsg =
                typeof data === "string"
                  ? data
                  : data?.message || data?.detail || `註冊失敗（${res.status}）`
              setResponseText(errMsg)
              return
            }

            alert("註冊成功，請登入")
            route.push("/Login")
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err)
            alert(`❌ fetch 失敗：${message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center bg-[#212121] text-zinc-300 font-sans">
            <div className="w-1/2 h-full flex flex-col justify-center pl-[12%] pr-[8%] z-20 overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-2xl font-semibold text-white tracking-widest">FOVY</span>
                    </div>

                    <h1 className="text-[28px] text-white mb-10 tracking-wide">Start your Growth Journey</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="User account"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-transparent border border-zinc-700 rounded-full py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-zinc-700 rounded-full py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border border-zinc-700 rounded-full py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Re-password"
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                className="w-full bg-transparent border border-zinc-700 rounded-full py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>

                        {passwordError && (
                            <div className="pl-4 text-xs text-red-400">
                                <span>{passwordError}</span>
                            </div>
                        )}

                        {responseText && (
                        <div className="rounded-xl text-xs text-red-500">
                            <pre className="whitespace-pre-wrap break-words">{responseText}</pre>
                        </div>
                    )}
                        <div className="pt-6 flex flex-col items-center">
                            <button
                                type="submit"
                                disabled={loading || (password.length > 0 && !isCorrect)}
                                className="w-48 rounded-full bg-zinc-300 text-black font-medium py-3 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:bg-white transition-all disabled:opacity-50"
                            >
                                {loading ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </form>

                    

                    <div className="mt-8 text-center text-xs text-zinc-400">
                        Already have an account? <Link href="/Login" className="underline text-zinc-200">Log in</Link>
                    </div>
                </div>
            </div>

            <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none z-10">
                <div
                    className="absolute top-[-10%] right-[-70%] w-[130%] h-[120%] rounded-full shadow-[0_0_120px_40px_rgba(255,255,255,0.2)]"
                ></div>

                <div
                    className="absolute top-[15%] right-[15%] w-[15%] h-[15%] rounded-full shadow-[0_0_60px_20px_rgba(120,160,255,0.4)]"
                ></div>

                <div
                    className="absolute bottom-[10%] right-[30%] w-[40%] h-[40%] rounded-full shadow-[0_0_100px_30px_rgba(120,160,255,0.4)] bg-[rgba(35,35,35,1)] flex flex-col items-center justify-center z-20"
                >
                    <span className="text-zinc-400 tracking-[0.4em] text-sm mb-6 font-light">
                        New Friend?
                    </span>
                    <span className="text-zinc-400 tracking-[0.4em] text-sm font-light">
                        Welcome
                    </span>
                </div>
            </div>
        </div>
    )
}
