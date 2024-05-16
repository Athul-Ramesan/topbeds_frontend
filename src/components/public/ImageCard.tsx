// ImageCard.js
import React, { FC, useState } from 'react';
import SinglePropertyCard from './SinglePropertyCard';

// const images = [
//   '/8af23dac-2701-4fc0-ab1c-c8a244f53fc2.jpg', // Replace with your image URLs
//   '/34374315-96d9-49da-b69b-d5ec1361b5fd.jpg',
//   '/public/fa59a6ec-0859-4fc2-a2de-2da88e9666f5.jpg'
// ];

interface Property {
    _id: number;
    title: string;
    description: string;
    images: string[];
  }
interface ImageCardProps{
    properties: Property[];
}

const ImageCard:FC<ImageCardProps> = ({properties}) => {
  console.log("🚀 ~ properties:", properties)
  
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {properties && properties?.map((property) => (
      <SinglePropertyCard key={property._id} property={property} />
    ))}
  </div>
    
  )
};

export default ImageCard;
