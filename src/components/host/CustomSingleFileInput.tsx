//for uploading single file such as profile pic, thumbnails etc


import { ChangeEvent,DragEvent, FC, useRef, useState } from "react";
import ImageUploadIcon from "./ImageUploadIcon";

interface CustomSingleFileInputProps {
  onChange: () => void;
}

const CustomSingleFileInput: FC<CustomSingleFileInputProps> = ({ onChange}) => {
  const [isDragged, setIsDragged] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragged(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragged(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragged(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    onChange();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Only consider the first selected file
    setSelectedFile(file ?? null);
    onChange();
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    onChange();
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 p-8 rounded-lg text-center ${
        isDragged ? "bg-blue-100 border-blue-500" : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="mt-4 lg:mt-0">
          {/* if selected file is there */}
          <div className="bg-bg-200 p-2 h-52 rounded-lg shadow-lg mb-2">
            <img src="" alt="file name" />
          </div>
          <p>Selected file name</p>
          <button
            className="mt-4 bg-red-500 text-white font bold py-2 px-4 rounded-lg"
            onClick={handleClearFile}
          >
            clear File
          </button>
        </div>
      ) : (
        <div className=" lg:mt-16">
          <div className="flex justify-center">
            <ImageUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop an image here, or click to upload
          </p>
          <button
            className="bg-zinc-300 text-blue-600 text sm font-semibold px-4 py-2 rounded"
            onClick={handleButtonClick}
          >
            Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
      {/* if selected file is not there */}
    </div>
  );
};

export default CustomSingleFileInput;