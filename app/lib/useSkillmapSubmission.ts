"use client";

// 上傳 → 取得 submission_id → polling 狀態 → 完成後載入技能地圖
// 規則（間隔、逾時、錯誤訊息）都在 domain/submission.ts 的純函式裡。
import { useCallback, useEffect, useRef, useState } from "react";
import {
  failureMessage,
  hasTimedOut,
  isTerminal,
  nextPollDelay,
  type SubmissionStatus,
  type SubmissionView,
} from "./domain/submission";
import type { UploadSelection } from "./domain/upload";

type Phase = "idle" | "uploading" | "polling" | "done" | "error";

export type SkillmapSubmissionState = {
  phase: Phase;
  status: SubmissionStatus | null;
  error: string | null;
  submissionId: string | null;
};

async function readJson(res: Response) {
  return res.json().catch(() => null);
}

export function useSkillmapSubmission(onGraph: (graph: string, mapId: string) => void) {
  const [state, setState] = useState<SkillmapSubmissionState>({ phase: "idle", status: null, error: null, submissionId: null });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const loadMap = useCallback(
    async (mapId: string) => {
      const res = await fetch(`/api/tree/maps/${mapId}`, { cache: "no-store" });
      const json = await readJson(res);
      if (!res.ok || !json?.data?.graph) throw new Error("無法載入技能地圖");
      onGraph(JSON.stringify(json.data.graph), mapId);
    },
    [onGraph],
  );

  const poll = useCallback(
    (id: string, startedAt: number, attempt: number) => {
      timer.current = setTimeout(async () => {
        if (!alive.current) return;
        try {
          const res = await fetch(`/api/submissions/${id}`, { cache: "no-store" });
          const json = await readJson(res);
          if (!res.ok) throw new Error(json?.message || "查詢狀態失敗");
          const sub = json.data as SubmissionView;
          if (!alive.current) return;
          setState((s) => ({ ...s, status: sub.status }));

          if (sub.status === "done" && sub.map_id) {
            await loadMap(sub.map_id);
            if (alive.current) setState((s) => ({ ...s, phase: "done" }));
            return;
          }
          if (sub.status === "failed") {
            setState((s) => ({ ...s, phase: "error", error: failureMessage(sub.error_reason) }));
            return;
          }
          if (!isTerminal(sub.status) && hasTimedOut(startedAt, Date.now())) {
            setState((s) => ({ ...s, phase: "error", error: "生成時間較長，完成後可在「使用紀錄」查看結果" }));
            return;
          }
          poll(id, startedAt, attempt + 1);
        } catch (e) {
          // 網路暫時錯誤：繼續重試直到逾時
          if (hasTimedOut(startedAt, Date.now())) {
            setState((s) => ({ ...s, phase: "error", error: e instanceof Error ? e.message : "連線失敗" }));
          } else {
            poll(id, startedAt, attempt + 1);
          }
        }
      }, nextPollDelay(attempt));
    },
    [loadMap],
  );

  const submit = useCallback(
    async (sel: UploadSelection) => {
      if (timer.current) clearTimeout(timer.current);
      setState({ phase: "uploading", status: null, error: null, submissionId: null });

      const form = new FormData();
      if (sel.resume) form.append("resume", sel.resume as File);
      sel.portfolio.forEach((f) => form.append("portfolio", f as File));
      sel.images.forEach((f) => form.append("images", f as File));
      if (sel.githubUrl.trim()) form.append("github_url", sel.githubUrl.trim());

      // 1) 向 BFF 拿上傳票（小請求）
      const t = await fetch("/api/submissions/ticket", { method: "POST" });
      const tj = await readJson(t);
      if (!t.ok) {
        setState({ phase: "error", status: null, error: tj?.message || "無法開始上傳", submissionId: null });
        return;
      }

      // 2) 檔案直接上傳到 document-service（不經過 Vercel，避免 4.5MB 限制）
      let res: Response;
      try {
        res = await fetch(tj.data.upload_url, {
          method: "POST",
          headers: { Authorization: `Ticket ${tj.data.ticket}` },
          body: form,
        });
      } catch {
        setState({ phase: "error", status: null, error: "上傳失敗，請檢查網路後再試", submissionId: null });
        return;
      }
      const json = await readJson(res);
      if (!res.ok) {
        const details: string[] = json?.details ?? [];
        setState({ phase: "error", status: null, error: details.join("\n") || json?.error || "上傳失敗", submissionId: null });
        return;
      }
      const id = json.data.id as string;
      setState({ phase: "polling", status: json.data.status, error: null, submissionId: id });
      poll(id, Date.now(), 0);
    },
    [poll],
  );

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setState({ phase: "idle", status: null, error: null, submissionId: null });
  }, []);

  return { state, submit, reset };
}
