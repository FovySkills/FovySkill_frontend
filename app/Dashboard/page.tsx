'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import SelectionCard from "./Component/SelectionCard";
import UserProperty from "./Component/UserProperty";
import UserBar from "./Component/UserBar";

export default function Dashboard() {
    const router = useRouter();
    const [isVisible,setVisible]=useState<boolean>(false)

    function RedirectToPage(pageName: string) {
        router.push(pageName)
    }

    return (
        <div className=" grid grid-cols-2 w-full h-screen ">
            <SelectionCard title="我要成長" description="技能提升" icon="" image="" ButtonAction={() => RedirectToPage("Growth")} buttonLayout="shadow-[10px_0_20px_2px_rgba(200,80,60,0.7),-10px_0_20px_2px_rgba(230,190,40,0.6)]" subtitle="看見技能 探索學習路徑 找到您的潛力" />
            <SelectionCard title="我要轉職" description="職涯探索" icon="" image="" ButtonAction={() => RedirectToPage("SwitchCareers")} buttonLayout="shadow-[10px_0_20px_2px_rgba(56,120,130,0.7),-10px_0_20px_2px_rgba(84,117,78,0.6)]" subtitle="探索符合您技能與抱負的內部機會" />
            {!isVisible && <UserBar setVisible={setVisible}/>}
            {<UserProperty isVisible={isVisible} setVisible={setVisible}></UserProperty>}
        </div>
    )
}