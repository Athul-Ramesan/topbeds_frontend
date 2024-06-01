import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { axiosInstance } from "../config/instances";
import { useParams } from "react-router-dom";

interface ImageDivProps{
    image: string;
    width?: string
}
const ImageDiv:FC<ImageDivProps> = ({width,image}) => {
  const [isMouseEnter,setIsMouseEnter] = useState(false)
  const {propertyId} = useParams()
  const handleMouseEnter = ()=>{
    setIsMouseEnter(true)
  }
  const handleMouseLeave = ()=>{
    setIsMouseEnter(false)
  }
  const handleClickDeletePhoto = async()=>{
    console.log(image,'image inside handleclickdelete fn')
    const response =  await axiosInstance.delete(`/property/photo/delete-photo?propertyId=${propertyId}&image=${image}`)
    
    console.log("🚀 ~ handleClickDeletePhoto ~ response:", response)
  }
  return (
    <div 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className={`m-2 relative w-full h-28 overflow-hidden rounded-xl object-cover hover:shadow-md  transition transform hover:scale-105`}>
      <img className="rounded-xl "  src={image} alt="" />
      {isMouseEnter && (

        <div className=" absolute right-4 top-3 hover:scale-125 hover:cursor-pointer  transition-transform duration-500">
      <MdDeleteOutline 
      onClick={handleClickDeletePhoto}
      size={25}/>
      </div>
      )}
    </div>
  )
}

export default ImageDiv
