// lib/gatewayFetch.ts
import "server-only";

type GatewayFetchOptions = RequestInit & {
  baseUrl: string;
  accessToken?: string | null;
  timeoutMs?: number;
};

export async function gatewayFetch(path: string, opts: GatewayFetchOptions) {
  const { baseUrl, accessToken, timeoutMs = 8000, ...init } = opts;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    // 若 body 是 FormData，就不要強制 content-type
    const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;
    if (init.body && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

    const res = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => null);

    return { res, data };
  } finally {
    clearTimeout(timer);
  }
}
