import { FC } from "react"

interface CancelButtonProps{
    onClick : () =>void
    isAnyChange: boolean
}
const CancelButton :FC<CancelButtonProps>= ({onClick,isAnyChange}) => {
  return (
    <>
            <button
            onClick={onClick}
            className={`w-32 rounded-lg bg-gray-300 text-gray-400 mx-8 mt-4 py-4
            ${isAnyChange ? '' : "hidden" }
            `}>
                <p className={`hover:scale-110 duration-500 hover:text-black`}>Cancel</p>
            </button>
        </>
  )
}

export default CancelButton
