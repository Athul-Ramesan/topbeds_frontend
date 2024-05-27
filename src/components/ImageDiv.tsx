import { FC } from "react";


interface ImageDivProps{
    image: string;
    width: string
}
const ImageDiv:FC<ImageDivProps> = ({width,image}) => {
  return (
    <div className={`m-2  w-full h-28 overflow-hidden rounded-2xl bg-green-500 object-cover`}>
      <img className="rounded-xl "  src={image} alt="" />
    </div>
  )
}

export default ImageDiv
