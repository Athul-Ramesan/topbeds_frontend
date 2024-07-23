import { ChangeEvent, FC, useContext, useState } from "react"
import { FaLightbulb } from "react-icons/fa6"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import { validatePrice } from "../../utils/validationSchema/validatePrice"
import toast from "react-hot-toast"
import { config } from "../../config/config"
import { axiosInstance, propertyApiInstance } from "../../config/instances"
import CancelButton from "../../components/buttons/CancelButton"
import SaveButton from "../../components/buttons/SaveButton"
import { validateMaxGuests } from "../../utils/validationSchema/validateMaxGuest"

const ShowMaxGuestsHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [maxGuests, setMaxGuests] = useState(String(hostProperty.maxGuests))
  const [isAnyChange, setIsAnyChange] = useState(false)
  const {setHostProperty} = useContext(HostPropertySingleContext)
  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    
    e.preventDefault()
    setMaxGuests(String(e.target.value))

    if (maxGuests !== String(hostProperty.price)) {
      setIsAnyChange(true)
    }
  }
  const HandleCancelClick = ()=>{
    setIsAnyChange(false)
    setMaxGuests(String(hostProperty.maxGuests))
  }
  const HandleSaveClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('button clicked save')
    const {value , error} = validateMaxGuests.validate({maxGuests})
    
    if(error){
      toast.error(error.message)
      return
    }
    const numericValue = {...value, maxGuests: Number(value.maxGuests)}

    const response = await propertyApiInstance.post(`/update-property/${hostProperty._id}`, numericValue , config)
    if (response.status === 200) {
      setIsAnyChange(false)
      toast.success("Guest count updated successfully")
      setHostProperty(response.data.updatedProperty)
    }

  }
  return (
    <div className=' h-[525px] '>
      <div className='flex justify-center'>
        <p className="text-4xl font-semibold text-font-accent m-4">Maximum guests</p>
      </div>
      <div className='mx-4 flex items-center mt-40'>
        <input type="text" className='w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none text-font-color-300 text-3xl font-extrabold' placeholder='Type here...' value={maxGuests}
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

export default ShowMaxGuestsHostProperty
