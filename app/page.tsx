"use client";
import { useRouter } from "next/navigation";
import CompanyButton from "./Component/CompanyButton";
import { useActionState } from "react";

export default function Home() {
  const router = useRouter();
  function RouterHandler() {
    // 检查浏览器 cookie
    const hasToken = document.cookie.includes("token=");
    router.push("/Dashboard")
    // if (!hasToken) {
    //   router.push("/login"); // 没 cookie 就跳去 login
    // } else {
    //   router.push("/dashboard"); // 有 cookie 去 dashboard
    // }
  }

  return (
    <div className="grid grid-rows-2 w-full h-screen">
      <div className="w-full h-full flex justify-center items-center pt-70">
        <div className="p-4 grid row-span-2 items-center">
          <span className=" text-white text-[64px]">LOGO PLACE HOLDER</span>
          <span className="text-white text-[30px] text-center">enterprise</span>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center">
       <CompanyButton RouterHandler={RouterHandler} name="Bank Sinopac"></CompanyButton>
      </div>
    </div>
  );
}
