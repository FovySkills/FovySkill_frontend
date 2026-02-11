import { useRouter } from "next/navigation"
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
        <div className="w-[80%] h-[70%] bg-[rgba(51,51,51,1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] m-auto grid grid-rows-[8fr_2fr] rounded-[20px]">
            <div className=" grid grid-cols-2 text-white w-full h-full ">
                <div className="grid grid-rows-[4fr_2fr_2fr_2fr] p-[30px] w-full h-full">
                    <section className="items-center ml-15 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                        </svg>

                    </section>
                    <section className="text-[30px] ml-5">
                        {title}
                    </section>
                    <section className="text-[25px] ml-5">
                        {description}
                    </section>
                    <section className="text-[20px]  ml-5 whitespace-nowrap">
                        {subtitle}
                    </section>
                </div>
                <div className="m-auto ">
                    <img src={image} />
                </div>
            </div>
            <div className="w-full">
                <DashboardButton title={title} ButtonAction={ButtonAction} buttonLayout={buttonLayout} />
            </div>
        </div>
    )
}