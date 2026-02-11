// app/api/health/route.ts
import { SERVICES } from "@/app/lib/services";

type HealthResult = {
  ok: boolean;
  status: number | null;
  latencyMs: number;
  error?: string;
};

export async function GET() {
  const entries = Object.entries(SERVICES);

  const checks = entries.map(async ([name, svc]) => {
    const start = Date.now();
    try {
      const res = await fetch(`${svc.baseUrl}${svc.healthPath}`, {
        signal: AbortSignal.timeout(2000),
      });

      return [
        name,
        {
          ok: res.ok,
          status: res.status,
          latencyMs: Date.now() - start,
        } satisfies HealthResult,
      ];
    } catch (e: any) {
      return [
        name,
        {
          ok: false,
          status: null,
          latencyMs: Date.now() - start,
          error: "timeout_or_error",
        } satisfies HealthResult,
      ];
    }
  });

  const results = await Promise.all(checks);
  const services = Object.fromEntries(results);

  const allOk = Object.values(services).every((s:any) => s.ok);

  return Response.json(
    {
      ok: allOk,
      services,
      ts: new Date().toISOString(),
    },
    { status: allOk ? 200 : 503 }
  );
}
