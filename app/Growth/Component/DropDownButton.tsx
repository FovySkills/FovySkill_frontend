"use client";

import { useActionState, useEffect, useRef, useState } from "react";

export default function DropdownButton() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("ME");

  const [selection,setSelection]=useState<string>("ME")
  const selectionsList=["ME","JOB1"]
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          rounded-full px-4 py-1.5 text-sm text-white
          border border-white/30 bg-white/10
          shadow-[0_0_10px_rgba(0,0,0,0.9)]
          hover:shadow-[0_0_14px_rgba(255,255,255,0.35)]
          transition-all duration-200
          flex items-center gap-2
        "
      >
        {value}
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* 下拉選單 */}
      {open && (
        <div
          className="
            absolute left-0 mt-2 w-40
            rounded-xl overflow-hidden
            border border-white/20
            bg-black/70 backdrop-blur
            shadow-[0_0_18px_rgba(0,0,0,0.9)]
            z-50
          "
        >
          {GenerateOptions(selectionsList,setValue,setOpen)}
        </div>
      )}
    </div>
  );
}

function GenerateOptions(selectionsList:string[],setValue:(x:string)=>void,setOpen:(x:boolean)=>void)
{
  function setAction(item:string)
  {
    setValue(item)
    setOpen(false)
  }
  return (
    selectionsList.map((item) => (
            <button key={item} type="button" onClick={() =>setAction(item)} className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-whitetransition">
              {item}
            </button>
          ))
  )
}