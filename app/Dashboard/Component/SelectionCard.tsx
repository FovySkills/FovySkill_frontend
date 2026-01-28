import { useRouter } from "next/navigation"
import DashboardButton from "./DashboardButton"

interface SelectionCardProps
{
    title:string
    description:string
    icon:string
    image:string
    ButtonAction:()=>void
    buttonLayout:string
    subtitle?:string
}


export default function SelectionCard({title,description,icon,image,ButtonAction,buttonLayout,subtitle}:SelectionCardProps)
{

    
    return(
        <div className="w-[80%] h-[70%] bg-[rgba(51,51,51,0.8)] shadow-[0_0_40px_rgba(0,0,0,0.8)] m-auto grid grid-rows-[8fr_2fr] rounded-[20px]">
            <div className=" grid grid-cols-2 text-white">
                <div className="grid grid-rows-[4fr_2fr_2fr_2fr] p-[30px] ">
                    <section className="text-[25px]">
                        {title}
                    </section>
                    <section className="text-[25px]">
                        {title}
                    </section>
                    <section className="text-[20px]">
                        {description}
                    </section>
                    {subtitle&&<section className="text-[15px]">
                        {subtitle}
                    </section>}
                </div>
                <div className="m-auto">
                    place holder
                </div>
            </div>
            <div className="w-full">
                <DashboardButton title={title} ButtonAction={ButtonAction} buttonLayout={buttonLayout} />
            </div>
        </div>
    )
}