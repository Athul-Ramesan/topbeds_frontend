import React, { useState } from 'react';

interface BookingComponentProps {
  price: number;
  serviceFee: number;
  nights: number;
}

const BookingComponent: React.FC<BookingComponentProps> = ({ price, serviceFee, nights }) => {
  const [guests, setGuests] = useState(1);
  const totalBeforeTaxes = price * nights + serviceFee;

  const handleGuestsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGuests(parseInt(event.target.value));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-xl font-bold mb-2">{`₹${price} night`}</p>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">CHECK-IN</p>
          <p>6/15/2024</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">CHECKOUT</p>
          <p>6/20/2024</p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="guests" className="text-sm text-gray-600">
          GUESTS
        </label>
        <select
          id="guests"
          value={guests}
          onChange={handleGuestsChange}
          className="block w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">Reserve</button>
      <div className="mt-4">
        <p className="text-sm text-gray-600">You won't be charged yet</p>
        <div className="flex justify-between mt-2">
          <p>₹{price * nights} x {nights} nights</p>
          <p>{`₹${price * nights}`}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Airbnb service fee</p>
          <p>{`₹${serviceFee}`}</p>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-2 flex justify-between">
          <p className="font-bold">Total before taxes</p>
          <p className="font-bold">{`₹${totalBeforeTaxes}`}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;