import { FC } from "react"

interface IProps {
    image:string,
    text:string,
    header:string
}
const DummyArt:FC <IProps> = ({image,text,header}) => {
  return (
    <div className="flex flex-col items-center gap-2  lg:w-1/3   justify-between">
      <img src={image} alt="" />
      <h1 className="text-2xl font-bold">{header}</h1>
        <p className="text-center">{text}</p>
    </div>
  )
}

export default DummyArt
