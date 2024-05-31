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
            disabled={!isAnyChange}
            className='w-32 rounded-lg bg-gray-300 text-gray-400 mx-8 mt-4 py-4'>
                <p className={`hover:scale-110 ${isAnyChange ? 'opacity-100' : "opacity-50 cursor-not-allowed" } duration-500 hover:text-black`}>Cancel</p>
            </button>
        </>
  )
}

export default CancelButton
