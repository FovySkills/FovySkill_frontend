'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SwitchCareers()
{
    const route=useRouter()

    useEffect(()=>{
        route.push("Dashboard")
    },[])

    return(
        <div className="h-screen w-full m-auto ">
            Comming soon
        </div>
    )
}