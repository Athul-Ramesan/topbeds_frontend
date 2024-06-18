// ImageCard.js
import React, { FC, useContext, useState } from 'react';
import SinglePropertyCard from './SinglePropertyCard';
import SinglePropertyDetailsProvider, { SinglePropertyDetailsContext } from '../../context/SinglePropertyDetails';
import { IProperty } from '../../interface/IProperty';
import { Link, useNavigate } from 'react-router-dom';


interface ImageCardProps {
  properties: IProperty[];
}

const ImageCard: FC<ImageCardProps> = ({ properties }) => {
  const {setSingleProperty} = useContext(SinglePropertyDetailsContext)
  const navigate = useNavigate()
  console.log("🚀 ~ properties:", properties)

  return (
    <div

      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
      {properties && properties?.map((property) => (
        <div 
        
        key={property._id}
          onClick={()=>{
            setSingleProperty(property)
            navigate(`/index/properties/${property._id}`)
          }} 
          >
          <SinglePropertyCard key={property._id} property={property} />
        </div>
      ))}
    </div>

  )
};

export default ImageCard;
