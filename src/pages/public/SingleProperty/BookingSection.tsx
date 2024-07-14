import React, { useContext } from 'react';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';

const BookingSection: React.FC = () => {
  const {singleProperty} = useContext(SinglePropertyDetailsContext)

  const handleReserveClick = ()=>{
    
  }
  
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">₹ {singleProperty.price} /night</span>
        </div>
        <div>
          <button 
          onClick={handleReserveClick}
          className="bg-red-500 text-white px-4 py-2 rounded">Reserve</button>
        </div>
      </div>
      <div>
        <p>5 nights: ₹89,665</p>
        <p>Airbnb service fee: ₹14,705</p>
        <p>Total before taxes: ₹1,04,370</p>
      </div>
    </div>
  );
};

export default BookingSection;
