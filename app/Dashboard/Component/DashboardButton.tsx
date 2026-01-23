interface DashboardButtonProps
{
    title:string
    buttonLayout:string
    ButtonAction:()=>void
}


export default function DashboardButton({title,buttonLayout,ButtonAction}:DashboardButtonProps)
{
    return(
        <>
        <button type="button" onClick={ButtonAction}><span>{title}</span><span>&gt;</span></button>
        </>
    )
}