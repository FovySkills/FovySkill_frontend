"use client";

// 上傳區：履歷（必填）＋ 作品集 PDF／圖片（選填）＋ GitHub 連結（選填）→ 一次送出
import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBytes, LIMITS, validateSelection, type UploadSelection } from "@/app/lib/domain/upload";
import { progressRatio, STATUS_LABEL } from "@/app/lib/domain/submission";
import { useSkillmapSubmission } from "@/app/lib/useSkillmapSubmission";

interface UploadAreaProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onUploadSuccess?: () => void;
  setGraphData: (graphData: string | null) => void;
}

const EMPTY: UploadSelection = { resume: null, portfolio: [], images: [], githubUrl: "" };

function isImageFile(f: File) {
  return f.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(f.name);
}

export default function UploadArea({ show, setShow, onUploadSuccess, setGraphData }: UploadAreaProps) {
  const resumeRef = useRef<HTMLInputElement | null>(null);
  const portfolioRef = useRef<HTMLInputElement | null>(null);
  const [sel, setSel] = useState<UploadSelection>(EMPTY);
  const [dragging, setDragging] = useState<"resume" | "portfolio" | null>(null);

  const { state, submit, reset } = useSkillmapSubmission((graph) => {
    setGraphData(graph);
    onUploadSuccess?.();
    setTimeout(() => {
      setSel(EMPTY);
      setShow(false);
    }, 600);
  });

  const busy = state.phase === "uploading" || state.phase === "polling";
  const errors = useMemo(() => (sel.resume || sel.portfolio.length || sel.images.length || sel.githubUrl ? validateSelection(sel) : []), [sel]);

  function close(force = false) {
    if (state.phase === "uploading" && !force) return; // 上傳中不允許關閉
    if (state.phase === "polling" && !force) {
      setShow(false); // 生成中：只收起視窗，背景繼續 polling，完成後自動更新地圖
      return;
    }
    setSel(EMPTY);
    reset();
    setShow(false);
  }

  function addResume(files: FileList | null) {
    const f = files?.[0];
    if (f) setSel((s) => ({ ...s, resume: f }));
  }

  function addPortfolio(files: FileList | null) {
    if (!files) return;
    const list = Array.from(files);
    setSel((s) => ({
      ...s,
      portfolio: [...s.portfolio, ...list.filter((f) => !isImageFile(f))].slice(0, LIMITS.portfolioMaxFiles + 1),
      images: [...s.images, ...list.filter(isImageFile)].slice(0, LIMITS.imageMaxFiles + 1),
    }));
  }

  function removeAt(kind: "portfolio" | "images", idx: number) {
    setSel((s) => ({ ...s, [kind]: s[kind].filter((_, i) => i !== idx) }));
  }

  const canSubmit = !!sel.resume && errors.length === 0 && !busy;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close()}
          />

          <motion.div
            className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[560px] max-w-[92vw] rounded-2xl bg-zinc-100 text-zinc-800 shadow-2xl z-[300] p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">上傳資料，生成技能地圖</h2>
              <button type="button" onClick={() => close()} disabled={state.phase === "uploading"} className="text-zinc-500 hover:text-zinc-800 disabled:opacity-30" aria-label="關閉">
                ✕
              </button>
            </div>

            {busy ? (
              <Progress statusText={state.status ? STATUS_LABEL[state.status] : "上傳中…"} ratio={state.status ? progressRatio(state.status) : 0.05} />
            ) : (
              <div className="space-y-4">
                {/* 1. 履歷 */}
                <section>
                  <Label n={1} title="履歷" hint="PDF，必填，10MB 以內" />
                  <DropZone
                    active={dragging === "resume"}
                    onClick={() => resumeRef.current?.click()}
                    onDrag={(on) => setDragging(on ? "resume" : null)}
                    onDropFiles={addResume}
                  >
                    {sel.resume ? (
                      <FileRow name={sel.resume.name} size={sel.resume.size} onRemove={() => setSel((s) => ({ ...s, resume: null }))} />
                    ) : (
                      <span className="text-sm text-zinc-500">拖曳或點擊選擇履歷 PDF</span>
                    )}
                  </DropZone>
                  <input ref={resumeRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { addResume(e.target.files); e.target.value = ""; }} />
                </section>

                {/* 2. 作品集 */}
                <section>
                  <Label n={2} title="作品集" hint={`選填：PDF 最多 ${LIMITS.portfolioMaxFiles} 份、圖片最多 ${LIMITS.imageMaxFiles} 張`} />
                  <DropZone
                    active={dragging === "portfolio"}
                    onClick={() => portfolioRef.current?.click()}
                    onDrag={(on) => setDragging(on ? "portfolio" : null)}
                    onDropFiles={addPortfolio}
                  >
                    {sel.portfolio.length + sel.images.length === 0 ? (
                      <span className="text-sm text-zinc-500">拖曳或點擊加入作品集 PDF、作品截圖（PNG / JPG / WebP）</span>
                    ) : (
                      <div className="w-full space-y-1" onClick={(e) => e.stopPropagation()}>
                        {sel.portfolio.map((f, i) => <FileRow key={`p${i}`} name={f.name} size={f.size} onRemove={() => removeAt("portfolio", i)} />)}
                        {sel.images.map((f, i) => <FileRow key={`i${i}`} name={f.name} size={f.size} onRemove={() => removeAt("images", i)} />)}
                        <button type="button" className="text-xs text-blue-600 underline" onClick={() => portfolioRef.current?.click()}>+ 再加一個</button>
                      </div>
                    )}
                  </DropZone>
                  <input
                    ref={portfolioRef}
                    type="file"
                    multiple
                    accept="application/pdf,.pdf,image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => { addPortfolio(e.target.files); e.target.value = ""; }}
                  />
                </section>

                {/* 3. GitHub */}
                <section>
                  <Label n={3} title="GitHub" hint="選填：個人頁或 repo 連結" />
                  <input
                    type="url"
                    inputMode="url"
                    placeholder="https://github.com/your-name 或 https://github.com/your-name/project"
                    value={sel.githubUrl}
                    onChange={(e) => setSel((s) => ({ ...s, githubUrl: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </section>

                {(errors.length > 0 || state.error) && (
                  <ul className="text-xs text-red-600 space-y-0.5 whitespace-pre-line">
                    {state.error && <li>{state.error}</li>}
                    {errors.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                )}

                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => submit(sel)}
                  className="w-full rounded-full bg-zinc-900 text-white py-3 font-medium disabled:opacity-40"
                >
                  生成技能地圖
                </button>
                <p className="text-[11px] text-zinc-500 text-center">
                  檔案只用於分析你的技能；圖片會移除 EXIF（含拍攝位置）等資訊。
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Label({ n, title, hint }: { n: number; title: string; hint: string }) {
  return (
    <div className="flex items-baseline gap-2 mb-1.5">
      <span className="text-xs w-5 h-5 rounded-full bg-zinc-900 text-white inline-flex items-center justify-center">{n}</span>
      <span className="font-medium text-sm">{title}</span>
      <span className="text-xs text-zinc-500">{hint}</span>
    </div>
  );
}

function DropZone({
  active,
  onClick,
  onDrag,
  onDropFiles,
  children,
}: {
  active: boolean;
  onClick: () => void;
  onDrag: (on: boolean) => void;
  onDropFiles: (f: FileList | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      onDragOver={(e) => { e.preventDefault(); onDrag(true); }}
      onDragLeave={() => onDrag(false)}
      onDrop={(e) => { e.preventDefault(); onDrag(false); onDropFiles(e.dataTransfer.files); }}
      className={`min-h-[64px] rounded-lg border-2 border-dashed px-3 py-3 flex items-center justify-center cursor-pointer transition-colors ${
        active ? "border-blue-500 bg-blue-50" : "border-zinc-300 bg-white hover:border-zinc-400"
      }`}
    >
      {children}
    </div>
  );
}

function FileRow({ name, size, onRemove }: { name: string; size: number; onRemove: () => void }) {
  return (
    <div className="w-full flex items-center justify-between text-sm">
      <span className="truncate">{name}</span>
      <span className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-zinc-500">{formatBytes(size)}</span>
        <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="text-zinc-400 hover:text-red-500" aria-label={`移除 ${name}`}>✕</button>
      </span>
    </div>
  );
}

function Progress({ statusText, ratio }: { statusText: string; ratio: number }) {
  return (
    <div className="py-6 flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <div className="text-sm">{statusText}</div>
      <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
        <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${Math.round(ratio * 100)}%` }} />
      </div>
      <p className="text-[11px] text-zinc-500">通常需要 20–60 秒；關掉頁面也會在背景完成，之後可在「使用紀錄」查看。</p>
    </div>
  );
}
