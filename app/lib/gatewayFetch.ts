// lib/gatewayFetch.ts
import "server-only";

type GatewayFetchOptions = RequestInit & {
  baseUrl: string;
  accessToken?: string | null;
  timeoutMs?: number;
};
export async function gatewayFetch(path: string, opts: GatewayFetchOptions) {
  const { baseUrl, accessToken, timeoutMs = 8000, ...init } = opts;

  if (!baseUrl) throw new Error("gatewayFetch: baseUrl is empty");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;
    if (init.body && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

    const normalizedBaseUrl =
      baseUrl.startsWith("http://") || baseUrl.startsWith("https://")
        ? baseUrl
        : `http://${baseUrl}`;

    const url = new URL(path, normalizedBaseUrl).toString();

    const res = await fetch(url, {
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
  } catch (err: any) {
    // ✅ 不要 err.message = ...
    const name = err?.name || "";
    const isAbort =
      name === "AbortError" || String(err?.cause || "").includes("AbortError");

    if (isAbort) {
      throw new Error(`gatewayFetch timeout after ${timeoutMs}ms`, { cause: err });
    }

    throw new Error(`gatewayFetch failed: ${err?.message || String(err)}`, { cause: err });
  } finally {
    clearTimeout(timer);
  }
}
