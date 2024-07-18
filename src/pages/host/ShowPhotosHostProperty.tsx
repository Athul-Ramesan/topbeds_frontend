import { Plus } from "lucide-react"
import ImageDiv from "../../components/ImageDiv"
import { useContext, useEffect, useState } from "react"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import SkeletonImageDiv from "../../components/SkeletonImageDiv"
import ModalIndex from "../../components/Modal/ModalIndex"
import AddNewPhotoComponent from "../../components/AddNewPhotoComponent"
import { axiosInstance, propertyApiInstance } from "../../config/instances"
import { config } from "../../config/config"
import toast from "react-hot-toast"

const ShowPhotosHostProperty = () => {
  const { hostProperty ,setHostProperty} = useContext(HostPropertySingleContext)
  const [loading, setLoading] = useState(true)
  const [imageUploadingLoading,setImageUploadingLoading] = useState(false)
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
  
  const handleCloseModal = ()=>{
    setImageUploadingLoading(false)
    setLoading(false)
    setOpenModal(false)
  }
  const handleAddPhotoSubmit= async(imageUrls:string[]) => {
   console.log("🚀 ~ handleAddPhotoSubmit ~ imageUrls:", imageUrls)
   setImageUploadingLoading(true)
    try {
      console.log(hostProperty._id)
      
      const response = await propertyApiInstance.post(`/upload-images/${hostProperty._id}`,{imageUrls},config)
      
      console.log("🚀 ~ handleAddPhotoSubmit ~ response:", response)
      if(response.status===200){
        setHostProperty(response.data.updatedProperty)
        setImageUploadingLoading(false)
        toast.success('Photos added')
        setOpenModal(false)
      }
    } catch (error:any) {
      setImageUploadingLoading(false)
      console.error('Error uploading images:', error);
      toast.error('Error uploading images please try again')
    }
  }
  return (
    <div className=" h-[525px] overflow-y-scroll ">
      {openModal && (
        <ModalIndex
       handleClose={handleCloseModal} 
       open={openModal} 
       children={<AddNewPhotoComponent 
      handleSubmit={handleAddPhotoSubmit}  
      isLoading={imageUploadingLoading}
      />} />
      )}
      
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
