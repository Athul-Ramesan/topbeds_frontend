// ImageCard.js
import React, { FC, Suspense, lazy, useContext, useState } from 'react';
import SinglePropertyDetailsProvider, { SinglePropertyDetailsContext } from '../../context/SinglePropertyDetails';
import { IProperty } from '../../interface/IProperty';
import { Link, useNavigate } from 'react-router-dom';
import PropertyLoadingSkelton from '../skeltons/PropertyLoadingSkelton';

const SinglePropertyCard = lazy(() => import('./SinglePropertyCard'))

interface ImageCardProps {
  properties: IProperty[];
}

const ImageCard: FC<ImageCardProps> = ({ properties }) => {
  const { setSingleProperty } = useContext(SinglePropertyDetailsContext)
  const navigate = useNavigate()
  console.log("🚀 ~ properties:", properties)

  if(properties.length<1){
    return <div className="w-full h-full flex justify-center items-center">No properties found</
    div>
  }
  return (
    <div

      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
      {properties && properties?.map((property) => (
        <div

          key={property._id}
          onClick={() => {
            setSingleProperty(property)
            navigate(`/index/properties/${property._id}`)
          }}
        >
          <Suspense key={property._id} fallback={<PropertyLoadingSkelton/>}>
            <SinglePropertyCard key={property._id} property={property} />
          </Suspense>
        </div>
      ))}
    </div>

  )
};

export default ImageCard;
