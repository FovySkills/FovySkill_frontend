interface CompanyButtonProps
{
    RouterHandler:()=>void,
    name:string
    path:string
}


export default function CompanyButton({RouterHandler,name,path}:CompanyButtonProps)
{
    return(
        <>
         <button onClick={RouterHandler} type="button"
          className=" my-4 bg-[rgba(51,51,51,0.8)] w-[17%] h-[5vh] shadow-white shadow-[0_0_20px_rgba(255,255,255,0.8)] rounded-[40px] border-2
                    hover:scale-125 ease-in-out duration-200 "
        >
            <div className=" grid grid-cols-[2fr_7fr_1fr] w-full font-bold">
                <div className="text-white text-left m-auto w-[50%]">
                    <img src={path}></img>
                </div>
                <div className="text-white">
                    {name}
                </div>
                <div className="text-white text-right pr-8">
                    &gt;
                </div>

            </div>
        </button>
        </>
    )
}