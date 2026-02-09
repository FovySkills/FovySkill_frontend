export default function ServicesBar({ RouterHandler }: { RouterHandler: () => void }) {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mx-15 my-5">
            <button type="button" onClick={() => RouterHandler()} className="p-3 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-[0_0_24px_rgba(0,0,0,0.8)] hover:scale-120 active:scale-90 duration-300 ease-in-out" title="Return Dashboard">
                <svg className="size-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </button>

            <div className="flex items-center gap-4 ">
                <button type="button" onClick={() => { }} className="p-3 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-[0_0_24px_rgba(0,0,0,0.8)] hover:scale-120 active:scale-90 duration-300 ease-in-out" title="Return Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <div className="rounded-full px-4 py-2 shadow-[0_0_24px_rgba(0,0,0,0.8)] flex items-center gap-4">
                    <button type="button" onClick={() => { }} className="px-3 text-white hover:scale-120 active:scale-90 duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </button>
                    <button type="button" onClick={() => { }} className="px-3 text-white hover:scale-120 active:scale-90 duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>


                    </button>
                </div>

            </div>

            <div className="justify-self-end" >
            </div>
        </div>
    )
}