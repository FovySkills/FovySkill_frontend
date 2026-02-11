interface UserBarProps {
  setVisible: (visible: boolean) => void;
}

export default function UserBar({ setVisible }: UserBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        <div className="absolute -bottom-2 w-12 h-1.5 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-16 h-16 rounded-full border border-white/10 bg-[#2a2a2a] flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-700 opacity-50" />
           
           <span className="text-3xl relative z-10">👤</span>
           
           <div className="absolute bottom-1 right-1 w-5 h-5 bg-red-600 border-2 border-[#2a2a2a] rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
             JR
           </div>
        </div>

        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-zinc-800 text-white text-[10px] px-3 py-1 rounded-full border border-white/10 whitespace-nowrap shadow-xl">
          點擊開啟屬性面板
        </span>
      </button>
    </div>
  );
}