interface DashboardButtonProps {
    title: string;
    buttonLayout: string; // 雖然目前沒用到，保留你的 interface
    ButtonAction: () => void;
}

export default function DashboardButton({ title, buttonLayout, ButtonAction }: DashboardButtonProps) {
    return (
        <div className="flex justify-center">
            <button
                className={`group relative flex items-center gap-4 px-10 py-3 
                         text-white rounded-full transition-all duration-500
                           hover:scale-110 active:scale-95 ease-in-out ${buttonLayout}`}
                type="button"
                onClick={ButtonAction}
            >
                <span className="tracking-[0.2em]">{title}</span>
                <span className="font-light opacity-80 group-hover:translate-x-1.5 transition-transform duration-300">
                    &gt;
                </span>
            </button>
        </div>
    );
}