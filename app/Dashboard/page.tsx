'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import SelectionCard from "./Component/SelectionCard";

export default function Dashboard()
{
    const router=useRouter();
    
        function RedirectToPage(pageName:String)
        {
            if(pageName==="成長")
            {
                router.push("growth")
            }
            else
            {
                router.push("switchCareers")
            }
        }
        
    return(
        <div className=" grid grid-cols-2 w-full h-screen ">
   <SelectionCard title="我要成長" description="技能提升" icon="" image="" ButtonAction={()=>RedirectToPage("growth")} buttonLayout="" subtitle="看見技能 探索學習路徑 找到您的潛力"/>
   <SelectionCard title="我要轉職" description="職涯探索" icon="" image="" ButtonAction={()=>RedirectToPage("switchCareers")} buttonLayout="" subtitle="探索符合您技能與抱負的內部機會"/>
   
        </div>
    )
}