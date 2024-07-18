import { ChangeEvent, useContext, useState } from "react"
import { FaLightbulb } from "react-icons/fa6"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import { validateDescription } from "../../utils/validationSchema/validateDescription"
import toast from "react-hot-toast"
import { axiosInstance, propertyApiInstance } from "../../config/instances"
import { config } from "../../config/config"
import CancelButton from "../../components/Buttons/CancelButton"
import SaveButton from "../../components/Buttons/SaveButton"


const ShowDescriptionHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [description , setDescription] = useState(hostProperty.description)
  const [isAnyChange, setIsAnyChange] = useState(false)
  const {setHostProperty} = useContext(HostPropertySingleContext)
  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDescription(e.target.value)

    console.log("🚀 ~ handleOnChange ~ value:", description)
    if (description !== hostProperty.description) {
      setIsAnyChange(true)
    }
  }
  const HandleCancelClick = ()=>{
    setIsAnyChange(false)
    setDescription(hostProperty.description)
  }
  const HandleSaveClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('button clicked save')
    const {value , error} = validateDescription.validate({description})
    console.log("🚀 ~ HandleSaveClick ~ value:", value)
   
    if(error){
      toast.error(error.message)
      return
    }

    const response = await propertyApiInstance.post(`/update-property/${hostProperty._id}`, value , config)
    if (response.status === 200) {
      setIsAnyChange(false)
      toast.success("Description updated successfully")
      setHostProperty(response.data.updatedProperty)
    }

  }
  return (
    <div className=' h-[525px] '>
      <div className='flex justify-center'>
        <p className="text-4xl font-semibold text-font-accent m-4">Description</p>
      </div>
      <div className='mx-4 flex items-center mt-40'>
        <input type="text" className='w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none text-font-color-300 text-3xl font-extrabold' placeholder='Type here...' value={description}
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

export default ShowDescriptionHostProperty
