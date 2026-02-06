export default function Growth()
{
    return(
        <div className=" h-screen w-full grid grid-rows-[1.5fr_7fr_1.5fr]">
            <div className="bg-amber-50 w-full ">
                
            </div>
            <div className="bg-white w-full">
                <treeArea></treeArea>
            </div>
            <div className="bg-amber-100 w-full">
                <ActionBar></ActionBar>
            </div>
        </div>
    )
}