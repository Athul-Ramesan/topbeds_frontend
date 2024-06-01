import { Plus } from "lucide-react"
import ImageDiv from "../../components/ImageDiv"
import { useContext, useEffect, useState } from "react"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import SkeletonImageDiv from "../../components/SkeletonImageDiv"
import ModalIndex from "../../components/Modal/ModalIndex"
import AddNewPhotoComponent from "../../components/AddNewPhotoComponent"
import { axiosInstance } from "../../config/instances"
import { multiplefileConfig } from "../../config/config"

const ShowPhotosHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])
  const handleAddPhotoClick = ()=>{
    setOpenModal(true)
  }
  const handleDeletePhoto = ()=>{

  }
  const handleCloseModal = ()=>{
    setOpenModal(false)
  }
  const handleAddPhotoSubmit= async(imageUrls:string[])=>{

    try {
      const formData = new FormData()
      imageUrls.forEach((imageUrl,index)=>{
        formData.append(`images[${index}]`, imageUrl)
      })
      
      console.log("🚀 ~ handleAddPhotoSubmit ~ formData:", formData)
      const response = await axiosInstance.post(`/property/upload-images/${hostProperty._id}`,formData,multiplefileConfig)
      
      console.log("🚀 ~ handleAddPhotoSubmit ~ response:", response)
    } catch (error:any) {
      console.error('Error uploading images:', error);
    }
  }
  return (
    <div className=" h-[525px] overflow-y-scroll ">
      <ModalIndex handleClose={handleCloseModal} open={openModal} children={<AddNewPhotoComponent handleSubmit={handleAddPhotoSubmit}/>} />
      <div className="flex gap-4 justify-between items-center">
        <p className="text-3xl font-semibold text-font-accent m-1">Showcase your photos</p>
        <div className=" relative inline-block bg-gray-200 rounded-full p-2 m-1 hover:scale-110 hover:cursor-pointer transition-transform duration-500">
          <Plus 
          onClick={handleAddPhotoClick}
          />
          {/* <div className="absolute bg-gray-300 opacity-50">
            Add new
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 m-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonImageDiv key={index} />
          ))
        )
          :
          (
            hostProperty.images.map((image, index) => (
              <ImageDiv key={index} image={image} width={`[10]`} />
            ))
          )}
      </div>

    </div>
  )
}

export default ShowPhotosHostProperty
