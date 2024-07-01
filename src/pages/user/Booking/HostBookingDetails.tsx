// HostBookingDetails.tsx
import React, { useState } from 'react';
import { IBooking } from '../../../interface/IBooking';
import { format } from 'date-fns';

interface HostBookingDetailsProps {
  booking: IBooking;
}

const HostBookingDetails: React.FC<HostBookingDetailsProps> = ({ booking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{booking.property.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${
          booking.bookingStatus === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {booking.bookingStatus}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {format(new Date(booking.startDate), 'PPP')} - {format(new Date(booking.endDate), 'PPP')}
      </p>
      <button 
        onClick={toggleDetails}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      
      {isExpanded && (
        <div className="mt-4 text-sm">
          <p><span className="font-medium">Guest:</span> {booking.property.hostId?.username}</p>
          <p><span className="font-medium">Number of Guests:</span> {booking.property.maxGuests}</p>
          <p><span className="font-medium">Payment Status:</span> {booking.paymentStatus}</p>
          <p><span className="font-medium">Booked on:</span> {format(new Date(booking.createdAt), 'PPP')}</p>
          <div className="mt-2">
            <p className="font-medium">Property Details:</p>
            <p>{booking.property.bedrooms} Bedrooms, {booking.property.bathrooms} Bathrooms</p>
            <p>{booking.property.address}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300">
              Contact Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostBookingDetails;