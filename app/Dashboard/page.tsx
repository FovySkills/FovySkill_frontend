'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function Dashboard()
{
    const router=useRouter()
    useEffect(()=>{
        console.log("aa")
        router.back()
    },[])
    return(
        <div>

        </div>
    )
}