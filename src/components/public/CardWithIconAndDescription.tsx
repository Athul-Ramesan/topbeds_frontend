import { FC, ReactNode } from "react"

interface IProps{
    icon:ReactNode
    text:string
}

const CardWithIconAndDescription:FC<IProps> = ({text,icon}) => {
  return (
    <div className="rounded-xl flex  items-center p-6 bg-primaryColor font-semibold gap-2 text-2xl">
        <div className="">

      {icon}
        </div>
      {text}
    </div>
  )
}

export default CardWithIconAndDescription
