import { ChangeEvent, FC, useRef, useState } from "react"
import { IoCloseCircle } from "react-icons/io5";
import { convertImageToBase64 } from "../utils/helpers/convertImage";

interface AddNewPhotosProps{
    handleSubmit: (imageUrls:string[]) => void
}

const AddNewPhotoComponent: FC<AddNewPhotosProps> = ({handleSubmit}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[] >([])
    const inputRef = useRef<HTMLInputElement|null>(null)

    const handleAddPhotoClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        inputRef.current!.click()
    }
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{

        if(e.target.files){
            console.log("🚀 ~ handleFileChange ~ e.target.files:", e.target.files)
            
            const files = Array.from(e.target.files)
            setSelectedFiles((prevFiles)=> [...prevFiles, ...files])
        }
        console.log("🚀 ~ selectedFiles:", selectedFiles)
        
    }
    const handleRemoveFile = (index:number)=>{
        setSelectedFiles((prevFiles)=> prevFiles.filter((_,i)=> i!==index))
    }
    const handleSubmitButtonClick =async ()=>{
        console.log('inside submit btnn of image uploading in modal')
        const imageUrls= await convertImageToBase64(selectedFiles)
        console.log('after base64');
        
        console.log("🚀 ~ handleSubmitButtonClick ~ imageUrls:", imageUrls)
        
        handleSubmit(imageUrls)
    }

  return (
    <div>
      <h2>Add new Photo</h2>
      <div className="border-dashed border-2 border-gray-400 rounded-lg min-h-56 p-4">
        
        
            <h3 className="text-white p-1 font-semibold">Selected Files:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {
                selectedFiles.map((file,index)=>(
                    <div
                    key={index}
                    className=" relative shadow-lg mb-2 w-auto h-auto"
                    >   
                        <img className="object-cover w-full h-full rounded" src={URL.createObjectURL(file)} alt="" />
                        <button
                                onClick={() => handleRemoveFile(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded-full"
                            >
                               <IoCloseCircle />
                            </button>
                    </div>
                ))
            }
        </div>

      </div>
      <div className="flex justify-between items-center p-4" >

      <button
      onClick={handleAddPhotoClick}
      className="w-4/5 opacity-60 bg-primaryColor text-center text-bg-300 hover:text-black cursor-pointer hover:scale-105 duration-500 rounded-lg transform"> Add Photos </button>
      <input type="file" 
      accept="image/*"
      multiple
      ref={inputRef}
      onChange={handleFileChange}
      className="mb-4 hidden"
      />
      <button
      onClick={handleSubmitButtonClick}
      className="rounded bg-gray-300 p-1" >Submit</button>
      </div>
    </div>
  )
}

export default AddNewPhotoComponent
