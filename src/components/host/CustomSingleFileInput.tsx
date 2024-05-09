import ImageUploadIcon from "./ImageUploadIcon"

const CustomSingleFileInput = ({name ,...props}) => {
  return (
    <div className="lg:h-80 border-dashed border-2 p-8 rounded-lg text-center">
        <div className="mt-4 lg:mt-0">

      {/* if selected file is there */}
      <div className="bg-bg-200 p-2 h-52 rounded-lg shadow-lg mb-2">
        <img src="" alt="file name" />
      </div>
      <p>Selected file name</p>
        <button className="mt-4 bg-red-500 text-white font bold py-2 px-4 rounded-lg">
            clear File
        </button>
        </div>
        {/* if selected file is not there */}
        <div className=" lg:mt-16">
            <div className="flex justify-center">
                <ImageUploadIcon/>
            </div>
            <p className="text-sm text-gray-400 my-2">
            Drag and drop an image here, or click to upload
            </p>
            <button className="bg-zinc-300 text-blue-600 text sm font-semibold px-4 py-2 rounded" 
            >
                Upload Image
            </button>
            <input type="file"
            name={name}
            {...props}
            className="hidden"
            />
        </div>
    </div>
  )
}

export default CustomSingleFileInput
