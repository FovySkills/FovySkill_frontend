// 上傳前的檢查 — 純函式（與 document-service 的 src/domain/submission.py 規則一致；後端仍會再檢查一次）

export const MB = 1024 * 1024;

export const LIMITS = {
  resumeMaxBytes: 10 * MB,
  portfolioMaxFiles: 3,
  portfolioMaxBytes: 20 * MB,
  imageMaxFiles: 5,
  imageMaxBytes: 5 * MB,
  totalMaxBytes: 60 * MB,
} as const;

export const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export type FileLike = { name: string; size: number; type: string };

export type UploadSelection = {
  resume: FileLike | null;
  portfolio: FileLike[];
  images: FileLike[];
  githubUrl: string;
};

export type GitHubRef = { owner: string; repo: string | null; url: string };

const OWNER = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO = /^[A-Za-z0-9._-]{1,100}$/;
const RESERVED = new Set(["settings", "orgs", "topics", "marketplace", "explore", "features", "login", "search", "sponsors", "notifications"]);

export function parseGithubUrl(raw: string): GitHubRef | null {
  const text = (raw || "").trim();
  if (!text) return null;
  let url: URL;
  try {
    url = new URL(text.includes("://") ? text : `https://${text}`);
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.port) return null;
  if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) return null;
  const segs = url.pathname.split("/").filter(Boolean);
  if (segs.length === 0) return null;
  const owner = segs[0];
  if (RESERVED.has(owner.toLowerCase()) || !OWNER.test(owner)) return null;
  if (segs.length === 1) return { owner, repo: null, url: `https://github.com/${owner}` };
  const repo = segs[1].endsWith(".git") ? segs[1].slice(0, -4) : segs[1];
  if (!REPO.test(repo) || repo === "." || repo === "..") return null;
  return { owner, repo, url: `https://github.com/${owner}/${repo}` };
}

function isPdf(f: FileLike) {
  return f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
}

function isImage(f: FileLike) {
  return (IMAGE_TYPES as readonly string[]).includes(f.type) || /\.(png|jpe?g|webp)$/i.test(f.name);
}

/** 回傳錯誤訊息列表；空陣列代表可以送出。 */
export function validateSelection(sel: UploadSelection): string[] {
  const errors: string[] = [];
  if (!sel.resume) errors.push("請選擇履歷 PDF");
  else if (!isPdf(sel.resume)) errors.push("履歷必須是 PDF");
  else if (sel.resume.size > LIMITS.resumeMaxBytes) errors.push("履歷不可超過 10MB");

  if (sel.portfolio.length > LIMITS.portfolioMaxFiles) errors.push(`作品集最多 ${LIMITS.portfolioMaxFiles} 份`);
  sel.portfolio.forEach((f) => {
    if (!isPdf(f)) errors.push(`作品集「${f.name}」必須是 PDF`);
    else if (f.size > LIMITS.portfolioMaxBytes) errors.push(`作品集「${f.name}」超過 20MB`);
  });

  if (sel.images.length > LIMITS.imageMaxFiles) errors.push(`圖片最多 ${LIMITS.imageMaxFiles} 張`);
  sel.images.forEach((f) => {
    if (!isImage(f)) errors.push(`「${f.name}」不是 PNG / JPG / WebP`);
    else if (f.size > LIMITS.imageMaxBytes) errors.push(`圖片「${f.name}」超過 5MB`);
  });

  const total = [sel.resume, ...sel.portfolio, ...sel.images].reduce((s, f) => s + (f?.size ?? 0), 0);
  if (total > LIMITS.totalMaxBytes) errors.push("檔案總大小超過 60MB");

  if (sel.githubUrl.trim() && !parseGithubUrl(sel.githubUrl)) {
    errors.push("GitHub 連結格式應為 https://github.com/帳號 或 https://github.com/帳號/repo");
  }
  return errors;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < MB) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / MB).toFixed(1)} MB`;
}
