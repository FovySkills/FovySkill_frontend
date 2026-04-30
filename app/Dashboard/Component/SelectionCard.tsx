import DashboardButton from "./DashboardButton"

interface SelectionCardProps {
    title: string
    description: string
    icon: string
    image: string
    ButtonAction: () => void
    buttonLayout: string
    subtitle?: string
}


export default function SelectionCard({ title, description, icon, image, ButtonAction, buttonLayout, subtitle }: SelectionCardProps) {


    return (
        <div className="w-[86%] max-w-[640px] min-h-[360px] h-auto md:h-[72%] bg-[rgba(51,51,51,1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] m-auto grid grid-rows-[minmax(0,1fr)_auto] rounded-[20px] overflow-visible">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.1fr)_minmax(120px,0.9fr)] text-white w-full min-h-0">
                <div className="grid grid-rows-[1fr_auto_auto_auto] gap-2 p-5 lg:p-[30px] w-full min-h-0">
                    <section className="flex items-center pl-2 lg:pl-10 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 lg:size-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                        </svg>

                    </section>
                    <section className="text-[24px] lg:text-[30px] pl-2 lg:pl-5 leading-tight">
                        {title}
                    </section>
                    <section className="text-[20px] lg:text-[25px] pl-2 lg:pl-5 leading-tight">
                        {description}
                    </section>
                    <section className="text-[14px] lg:text-[18px] pl-2 lg:pl-5 leading-snug break-words">
                        {subtitle}
                    </section>
                </div>
                <div className="m-auto min-w-0 px-3">
                    <img src={image} className="max-h-[220px] max-w-full object-contain" alt="" />
                </div>
            </div>
            <div className="w-full px-4 pb-5 overflow-visible">
                <DashboardButton title={title} ButtonAction={ButtonAction} buttonLayout={buttonLayout} />
            </div>
        </div>
    )
}
