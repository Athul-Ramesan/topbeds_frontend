import React, { useState } from 'react';
import { IProperty } from '../../../interface/IProperty';
import { useLocation } from 'react-router-dom';


const PreviewPropertyAdmin = () => {
    const { state } = useLocation()
    const property: IProperty = state.property
    const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % property.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4"><span className='font-semibold font-sans text-xl '>Title : </span>{property.title}</h1>
      
      {/* Image Carousel */}
      <div className="relative w-full mb-6 rounded-box overflow-hidden">
        <div className="carousel w-full h-64 md:h-96">
          {property.images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item absolute w-full h-full transition-opacity duration-300 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={image} 
                className="w-full h-full object-cover" 
                alt={`Property ${index + 1}`} 
              />
            </div>
          ))}
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
          <button onClick={prevSlide} className="btn btn-circle">❮</button> 
          <button onClick={nextSlide} className="btn btn-circle">❯</button>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {property.images.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${index === currentSlide ? 'btn-active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <p className="mb-2"><span className="font-semibold">Price:</span> ${property.price.toLocaleString()} / night</p>
          <p className="mb-2"><span className="font-semibold">Location:</span> {property.location || 'N/A'}</p>
          <p className="mb-4">{property.description}</p>
          <p className="mb-2"><span className="font-semibold">Bedrooms:</span> {property.bedrooms}</p>
          <p className="mb-2"><span className="font-semibold">Bathrooms:</span> {property.bathrooms}</p>
          <p className="mb-2"><span className="font-semibold">Max Guests:</span> {property.maxGuests}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Host Information</h2>
          <p className="mb-2"><span className="font-semibold">Host ID:</span> {property.hostId?._id || 'N/A'}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Amenities</h3>
          <ul className="list-disc list-inside mb-4">
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">House Rules</h3>
          <ul className="list-disc list-inside">
            {property.houseRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreviewPropertyAdmin;