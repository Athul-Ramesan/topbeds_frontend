import React from 'react';
import { IProperty } from '../../../interface/IProperty';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  image: string;
  price: number;
  description: string;
  location: string;
  property: IProperty
}

const Card: React.FC<CardProps> = ({ image, price, description, location , property }) => {
    const navigate = useNavigate()
    const handlePreviewProperty =()=>{
        navigate('/admin/listing/preview',{state:{property}})
    }
    

  return (
    <>
    <div onClick={handlePreviewProperty} className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm w-full mx-auto">
      <img 
        src={image} 
        alt="Property" 
        className="w-full h-48 object-cover"
        />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl">₹{price.toLocaleString()}</span>
          <span className="text-gray-600 text-sm">{location}</span>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
        </div>
        </>
  );
};

export default Card;