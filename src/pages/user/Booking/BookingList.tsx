// BookingList.tsx
import React from 'react';
import { IBooking } from '../../../interface/IBooking';
import BookingItem from './BookingItem';

interface BookingListProps {
  bookings: IBooking[];
  title: string;
  isUpcoming: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, title, isUpcoming }) => {
  

  return (
    <div>

      <h2 className="text-2xl font-bold font-mono mb-4">{title}</h2>
    <div className="mb-8 w-full grid grid-cols-4 gap-2">
      {bookings.reverse().map(booking => (
          <div key={booking._id}>
           
            <BookingItem booking={booking} isUpcoming={isUpcoming} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default BookingList;