import { useRef, useState } from "react";
import ImageUploadIcon from "./ImageUploadIcon";

interface CustomFileInputProps {
  onChange: (files: File[]) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  maxFiles?: number;
  maxSizeInBytes?:number;
  acceptedFileTypes?:string
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onChange,setImages}) => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  // const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage,setErrorMessage] = useState('')
  
  console.log("🚀 ~ droppedFiles:", droppedFiles)
  
  const handleDragOver = 
  (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsDragging(false);
    setErrorMessage("")
    const files = Array.from(e.dataTransfer.files);
    console.log("🚀 ~ handleDrop ~ files:", files);
    setDroppedFiles([...droppedFiles, ...files]);
    onChange([...droppedFiles, ...files]);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    const files = Array.from(e.target.files || []);
    
    for(const file of files){
      if(!file){
        setErrorMessage('There should be atleast one image')
        
      }
      if(!file.name.match(/\.(jpg|jpeg|png)$/)){
        setErrorMessage('The file should be a valid image file(jpg/jpeg/png)')
        return
      }
    }
    console.log("🚀 ~ handleFileChange ~ files:", files);
    setDroppedFiles([...droppedFiles, ...files]);
    onChange([...droppedFiles, ...files]);
  };

  const handleClearFiles = () => {
    setDroppedFiles([]);
    setImages([])
    
  };

  return (
    <div
      className="border-dashed border-2 p-8 rounded-lg text-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-center">
        <ImageUploadIcon />
      </div>
      <p className="text-sm text-gray-400 my-2">
        Drag and drop images here, or click add image
      </p>
      <button
        className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Add Image
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
      {droppedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-5 justify-center flex-wrap">
            {droppedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-bg-200 p-2 rounded-lg shadow-lg mb-2 w-24 h-24"
              >
                <img src={URL.createObjectURL(file)} alt="image" />
                <p className="flex-grow truncate text-xs mt-3">{file.name}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFiles}
          >
            Clear Files
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;