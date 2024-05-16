import React, { FC, useState } from 'react'


interface Property {
    _id: number;
    title: string;
    description: string;
    images: string[];
  }
interface SinglePropertyCardProps {
    property: Property;
  }

const SinglePropertyCard :FC<SinglePropertyCardProps> = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
    };
  
    const handleNextClick = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
    };
  
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-b border-primaryColor">
    <div className="relative">
      <img src={property.images[currentImageIndex]} alt={property.title} className="w-full h-64 object-cover" />
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full">
        &lt;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full">
        &gt;
      </button>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold">{property.title}</h3>
      <p className="text-gray-600">{property.description}</p>
    </div>
  </div>
  )
}

export default SinglePropertyCard
