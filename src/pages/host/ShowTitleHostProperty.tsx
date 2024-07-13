import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react'
import { HostPropertySingleContext } from '../../context/HostPropertySingleContext'
import { FaLightbulb } from "react-icons/fa";
import SaveButton from '../../components/Buttons/SaveButton';
import CancelButton from '../../components/Buttons/CancelButton';
import { axiosInstance, propertyApiInstance } from '../../config/instances';
import { config } from '../../config/config';
import toast from 'react-hot-toast';
import { validateTitle } from '../../utils/validationSchema/validateTitle';


const ShowTitleHostProperty = () => {
  const { hostProperty,setHostProperty } = useContext(HostPropertySingleContext)
  const [title, setTitle] = useState(hostProperty.title)
  const [isAnyChange, setIsAnyChange] = useState(false)
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
    console.log(title,'>>>>>>>>>>title')
    console.log("🚀 ~ handleOnChange ~ title:", title)
    if (e.target.value !== hostProperty.title) {
      setIsAnyChange(true)
    } else {
      setIsAnyChange(false)
    }
  }
  const HandleCancelClick = () => {
    setIsAnyChange(false)
    setTitle(hostProperty.title)
  }

  const HandleSaveClick = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('button clicked save')

    console.log(title,'title')
    const {value , error} = validateTitle.validate({title})
    console.log("🚀 ~ HandleSaveClick ~ error:", error)
    console.log("🚀 ~ HandleSaveClick ~ title:", value)
    
    if(error){
      toast.error(error.message)
      return
    }

    const response = await propertyApiInstance.post(`/update-property/${hostProperty._id}`, value , config)
    if (response.statusText === "OK") {
      setIsAnyChange(false)
      toast.success("Title updated successfully")
      console.log(response.data);
      
      setHostProperty(response.data.updatedProperty)
      
    }

  }
  return (
    <div className=' h-[525px] '>

      <div className='flex justify-center'>
        <p className="text-4xl font-semibold text-font-accent m-4">Title</p>
      </div>
     
      <div className='mx-4 flex items-center mt-40'>
        <input type="text" className='w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none text-font-color-300 text-3xl font-extrabold' placeholder='Type here...' value={title}
          onChange={handleOnChange}
        />
      </div>
      <div className='flex justify-center m-10 shadow-2xl opacity-60 hover:cursor-pointer' >
        <FaLightbulb size={30} />
      </div>
      <hr className='h-[1.5px] bg-bgaccent' />

      <div className=' flex justify-between'>
        <CancelButton 
        onClick={HandleCancelClick} 
        isAnyChange={isAnyChange} />
        <SaveButton 
          onClick={HandleSaveClick}
          isAnyChange={isAnyChange} />
      </div>

    </div>
  )
}

export default ShowTitleHostProperty
