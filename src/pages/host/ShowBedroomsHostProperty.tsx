import { ChangeEvent, useContext, useState } from "react"
import { FaLightbulb } from "react-icons/fa6"
import toast from "react-hot-toast"
import { config } from "../../config/config"
import { axiosInstance } from "../../config/instances"
import { validateBedrooms } from "../../utils/validationSchema/validateBedrooms"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import SaveButton from "../../components/Buttons/SaveButton"
import CancelButton from "../../components/Buttons/CancelButton"

const ShowbedroomsHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [bedrooms, setBedrooms] = useState(String(hostProperty.bedrooms))
  const [isAnyChange, setIsAnyChange] = useState(false)
  const {setHostProperty} = useContext(HostPropertySingleContext)
  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setBedrooms(String(e.target.value))

    console.log("🚀 ~ handleOnChange ~ value:", bedrooms)
    if (bedrooms !== String(hostProperty.bedrooms)) {
      setIsAnyChange(true)
    }
  }
  const HandleCancelClick = ()=>{
    setIsAnyChange(false)
    setBedrooms(String(hostProperty.bedrooms))
  }
  const HandleSaveClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('button clicked save')
    const {value , error} = validateBedrooms.validate({bedrooms})
    

    if(error){
      toast.error(error.message)
      return
    }
    const numericValue = {...value, bedrooms: Number(value.bedrooms)}

    const response = await axiosInstance.post(`/property/update-property/${hostProperty._id}`, numericValue , config)
    if (response.statusText === "OK") {
      setIsAnyChange(false)
      toast.success("Bathrooms property updated successfully")
      setHostProperty(response.data.updatedProperty)
    }

  }
  return (
    <div className=' h-[525px] '>
      <div className='flex justify-center'>
        <p className="text-4xl font-semibold text-font-accent m-4">Bedrooms</p>
      </div>
      <div className='mx-4 flex items-center mt-40'>
        <input type="text" className='w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none text-font-color-300 text-3xl font-extrabold' placeholder='Type here...' value={bedrooms}
          onChange={handleOnChange}
        />
      </div>
      <div className='flex justify-center m-10 shadow-2xl opacity-60 hover:cursor-pointer' >
        <FaLightbulb size={30} />
      </div>
      <hr className='h-[1.5px] bg-bgaccent' />
 

        <div className=' flex justify-between'>
          <CancelButton onClick={HandleCancelClick} isAnyChange={isAnyChange}/>
          <SaveButton onClick={HandleSaveClick} isAnyChange={isAnyChange}/>
        </div>
      
    </div>
  )
}

export default ShowbedroomsHostProperty
