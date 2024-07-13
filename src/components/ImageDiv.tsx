import { FC, useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { propertyApiInstance } from "../config/instances";
import { useParams } from "react-router-dom";
import ModalIndex from "./Modal/ModalIndex";
import ConfirmationModal from "./Modal/ConfirmationModal";
import { HostPropertySingleContext } from "../context/HostPropertySingleContext";
import toast from "react-hot-toast";

interface ImageDivProps {
  image: string;
  width?: string
}
const ImageDiv: FC<ImageDivProps> = ({ width, image }) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const { setHostProperty } = useContext(HostPropertySingleContext)
  const [imageDeletingLoading, setImageDeletingLoading] = useState(false)
  const { propertyId } = useParams()
  const handleMouseEnter = () => {
    setIsMouseEnter(true)
  }
  const handleMouseLeave = () => {
    setIsMouseEnter(false)
  }

  const handleClickDeletePhoto =  () => {
    setIsConfirmationModalOpen(true) 
    console.log(image, 'image inside handleclickdelete fn')
  }
  const handleClickConfirmDeletePhoto = async () => {
    
    setImageDeletingLoading(true)
    const response = await propertyApiInstance.delete(`/delete-photo?propertyId=${propertyId}&image=${image}`)
    if (response.statusText === "OK") {
      console.log("🚀 ~ handleClickDeletePhoto ~ response:", response)
      setHostProperty(response.data.updatedProperty)
      toast.success('Photos deleted')
      setImageDeletingLoading(false)
      setIsConfirmationModalOpen(false)
    }
  }
  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false)
  }
  return (
    <>
      {isConfirmationModalOpen && (
        <ConfirmationModal 
        handleConfirm={handleClickConfirmDeletePhoto} 
        content="Are you sure to want to delete?" 
        handleClose={handleConfirmationModalClose} 
        open={isConfirmationModalOpen} />
      )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`m-2 relative w-full h-28 overflow-hidden rounded-xl object-cover hover:shadow-md  transition transform hover:scale-105`}>
        <img className="rounded-xl " src={image} alt="" />
        {isMouseEnter && (

          <div className=" absolute right-4 top-3 hover:scale-125 hover:cursor-pointer  transition-transform duration-500">
            <MdDeleteOutline
              onClick={handleClickDeletePhoto}
              size={25} />
          </div>
        )}
      </div>
    </>
  )
}

export default ImageDiv
