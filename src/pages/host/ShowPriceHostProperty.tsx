import { ChangeEvent, FC, useContext, useState } from "react"
import { FaLightbulb } from "react-icons/fa6"
import CancelButton from "../../components/Buttons/CancelButton"
import SaveButton from "../../components/Buttons/SaveButton"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"

const ShowPriceHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [value, setValue] = useState(hostProperty.price)
  const [isAnyChange, setIsAnyChange] = useState(false)
  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    
    e.preventDefault()
    setValue(e.target.value)

    console.log("🚀 ~ handleOnChange ~ value:", value)
    if (value !== hostProperty.price) {
      setIsAnyChange(true)
    }
  }
  const HandleCancelClick = ()=>{
    setIsAnyChange(false)
    setValue(hostProperty.price)
  }
  const HandleSaveClick = ()=>{

  }
  return (
    <div className=' h-[525px] '>
      <div className='flex justify-center'>
        <p className="text-4xl font-semibold text-font-accent m-4">Price</p>
      </div>
      <div className='mx-4 flex items-center mt-40'>
        <input type="text" className='w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none text-font-color-300 text-3xl font-extrabold' placeholder='Type here...' value={value}
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

export default ShowPriceHostProperty
