interface DashboardButtonProps {
    title: string;
    buttonLayout: string; // 雖然目前沒用到，保留你的 interface
    ButtonAction: () => void;
    wrapperClassName?: string;
}

export default function DashboardButton({ title, buttonLayout, ButtonAction, wrapperClassName }: DashboardButtonProps) {
    const alignmentClass = wrapperClassName ?? "justify-center";

    return (
        <div className={`flex w-full max-w-full overflow-visible ${alignmentClass}`}>
            <button
                className={`group relative flex min-w-0 max-w-full items-center justify-center gap-3 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3
                         text-white rounded-full transition-all duration-500
                           hover:scale-105 active:scale-95 ease-in-out ${buttonLayout}`}
                type="button"
                onClick={ButtonAction}
            >
                <span className="min-w-0 truncate text-sm sm:text-base tracking-[0.12em] sm:tracking-[0.18em]">{title}</span>
                <span className="shrink-0 font-light opacity-80 group-hover:translate-x-1.5 transition-transform duration-300">
                    &gt;
                </span>
            </button>
        </div>
    );
}
