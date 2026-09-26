"use client";

// Google Identity Services 按鈕：拿到 ID token（credential）後交給 /api/auth/google
// 需要 NEXT_PUBLIC_GOOGLE_CLIENT_ID；未設定時不顯示按鈕。
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PUBLIC_ENV } from "@/app/lib/env";

type GoogleCredentialResponse = { credential: string };

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (opts: { client_id: string; callback: (r: GoogleCredentialResponse) => void; ux_mode?: "popup" | "redirect" }) => void;
          renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function GoogleSignInButton({ text = "signin_with" }: { text?: "signin_with" | "signup_with" | "continue_with" }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const clientId = PUBLIC_ENV.GOOGLE_CLIENT_ID;

  const onCredential = useCallback(
    async (resp: GoogleCredentialResponse) => {
      setBusy(true);
      setError("");
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: resp.credential }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          setError(json?.message || "Google 登入失敗");
          return;
        }
        router.push(json?.data?.needs_onboarding ? "/Onboarding" : "/Growth");
      } finally {
        setBusy(false);
      }
    },
    [router],
  );

  useEffect(() => {
    if (!ready || !clientId || !ref.current || !window.google) return;
    window.google.accounts.id.initialize({ client_id: clientId, callback: onCredential, ux_mode: "popup" });
    window.google.accounts.id.renderButton(ref.current, { theme: "filled_black", size: "large", shape: "pill", text, width: 280 });
  }, [ready, clientId, onCredential, text]);

  if (!clientId) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={ref} className={busy ? "opacity-50 pointer-events-none" : ""} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
