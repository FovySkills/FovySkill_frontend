"use client";
import { useRouter } from "next/navigation";
import CompanyButton from "./Component/CompanyButton";
import { useActionState } from "react";
import Link from "next/link";

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
          <img src="./Business_Card_Card_Square_1.png" className="w-[40%] h-[85%] mx-auto mt-[50px]" />
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        {/* <CompanyButton RouterHandler={RouterHandler} path="./SinopacLogo.png" name="Bank Sinopac"></CompanyButton> */}
        <CompanyButton RouterHandler={RouterHandler} path="" name="Click To Login"></CompanyButton>
        <div className="text-white my-5 text-[12px]">
          <span>Don`t have a FOVY account ? </span>
          <Link
            href="/Signup"
            className="font-bold underline hover:text-blue-300 ease-in-out duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
