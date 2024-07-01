import React, { useContext, useState } from 'react';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';

const PropertyImages: React.FC = () => {
  const {singleProperty} = useContext(SinglePropertyDetailsContext)
  const [showPhotos,setShowPhotos] = useState(false)
  const handleOnClick = ()=>{
    setShowPhotos(!showPhotos)
  }
  
  return (
    <div>
      <div className="relative">
        <img src={singleProperty.images[0]} alt="Property" className="w-full rounded-lg" />
        <button
        onClick={handleOnClick}
         className={`absolute bottom-4 right-4   ${!showPhotos ? 'bg-white text-gray-800' : `bg-gray-800 text-white`}  px-4 py-2 rounded-lg`}>
          {showPhotos ? `Hide all  photos` : `Show all photos`}
          </button>
      </div>
      {
        showPhotos && (
          <div className={`grid grid-cols-3 gap-4 mt-4`}>
        {/* Render additional property images */}
        {singleProperty.images.slice(1).map((image,index)=>{
          return(

              <img key={index} className='rounded-lg h-32 w-full' src={image} alt="" />
            
          )
        })}
      </div>
        )
      }
    </div>
  );
};

export default PropertyImages;