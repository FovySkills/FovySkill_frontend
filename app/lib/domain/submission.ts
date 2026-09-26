// 提交狀態（對應 document-service Submission.status）— 純函式

export type SubmissionStatus = "queued" | "extracting" | "generating" | "done" | "failed";

export type SubmissionView = {
  id: string;
  status: SubmissionStatus;
  map_id: string | null;
  error_reason: string | null;
};

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
  queued: "排隊中…",
  extracting: "正在讀取履歷、作品集與 GitHub…",
  generating: "AI 正在分析並生成技能地圖…",
  done: "完成！",
  failed: "生成失敗",
};

const REASON_LABEL: Record<string, string> = {
  resume_unreadable: "履歷無法讀取，請確認 PDF 沒有加密或損毀",
  not_relevant: "資料中找不到專業技能相關內容",
  empty_evidence: "檔案內容是空的",
  llm_output_invalid: "AI 暫時無法產生結果，請稍後再試",
  internal_error: "系統暫時發生問題，請稍後再試",
};

export function isTerminal(s: SubmissionStatus): boolean {
  return s === "done" || s === "failed";
}

export function failureMessage(reason: string | null | undefined): string {
  return (reason && REASON_LABEL[reason]) || "生成失敗，請稍後再試";
}

/** polling 間隔：前 10 次每 2 秒，之後逐步放慢到最多 10 秒。 */
export function nextPollDelay(attempt: number): number {
  if (attempt < 10) return 2000;
  return Math.min(10000, 2000 + (attempt - 10) * 1000);
}

/** 最多等 5 分鐘（超過視為逾時，但後端仍會繼續，之後可在歷史紀錄看到）。 */
export function hasTimedOut(startedAt: number, now: number, maxMs = 5 * 60 * 1000): boolean {
  return now - startedAt > maxMs;
}

export function progressRatio(s: SubmissionStatus): number {
  return { queued: 0.1, extracting: 0.35, generating: 0.7, done: 1, failed: 1 }[s];
}
