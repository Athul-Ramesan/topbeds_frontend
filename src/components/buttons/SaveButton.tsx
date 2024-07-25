import { FC } from "react"


interface SaveButtonProps{
    onClick : (event:React.MouseEvent<HTMLButtonElement>) =>void
    isAnyChange:boolean
}
const SaveButton:FC<SaveButtonProps> = ({onClick,isAnyChange}) => {
    return (    
        <>
            <button 
            onClick={onClick}
            className={`w-32 rounded-lg bg-black text-gray-400  mx-8 mt-4 py-4 cursor-pointer
            ${isAnyChange ? '' : "hidden" }
            `}>
                <p className={`hover:scale-110 ${isAnyChange ? 'opacity-100' : "opacity-50 cursor-not-allowed" }  duration-500 hover:text-white`}>Save</p>
            </button>
        </>
    )
}

export default SaveButton
