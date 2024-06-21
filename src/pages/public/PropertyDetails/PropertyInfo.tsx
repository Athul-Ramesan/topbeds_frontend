import React, { useContext } from 'react';
import BookingComponent from './BookingComponent';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';
import AmenityIcon from './AmenityIcons';

const PropertyInfo: React.FC = () => {
  const {singleProperty} = useContext(SinglePropertyDetailsContext)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{singleProperty.title}</h2>
      <p className="text-gray-600 mb-4">{singleProperty.maxGuests} Guests <span className='font-bold'>·</span> {singleProperty.bedrooms} bedroom <span className='font-bold'>·</span>  {singleProperty.bathrooms} bathroom</p>
      <p className="text-xl font-bold mb-2">₹{singleProperty.price} /night</p>
      <div className="flex items-center mb-4">
        <span className="mr-2">★</span>
        <span className="text-gray-600">4.90 · 310 reviews</span>
      </div>

      {/* <div className="mb-4">
        <span className="font-bold">Hosted by Camper And Cabin</span>
        <p>Camper and Cabin prides itself as the first Airstream accommodation in the Philippines. With its seamless blend of thoughtful design and its location's natural surroundings, one can enjoy the spirit of camping while embracing the comforts of a luxury hotel.</p>
      </div> */}
      
      <div>
        <h3 className="text-xl font-bold mb-2">What this place offers</h3>
        {/* Render amenities icons and labels */}
        <div className="flex flex-wrap">
          {singleProperty.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center mr-4 mb-2">
              <AmenityIcon amenity={amenity} />
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      <BookingComponent />
    </div>
  );
};

export default PropertyInfo;