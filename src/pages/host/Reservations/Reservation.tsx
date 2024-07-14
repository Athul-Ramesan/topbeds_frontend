// HostProfile.tsx
import React, { useEffect, useState } from 'react';
import { BookingResponse } from '../../../interface/IBooking';
import BookingList from '../../user/Booking/BookingList';
import { bookingApiInstance } from '../../../config/instances';
import { useAppSelector } from '../../../redux/store';

const Reservation: React.FC = () => {
    const {user} = useAppSelector(state=>state.user)
  const [bookings, setBookings] = useState<BookingResponse | null>({
    completedBookings:[],
    upcomingBookings:[]
  });

  useEffect(() => {
    // Fetch host bookings from your API
    const fetchBookings = async () => {
      const hostId = user?._id
      const response = await bookingApiInstance(`/booking/host/${hostId}`);
      const data = response.data
      setBookings(data);
    };

    fetchBookings();
  }, []);

//   if (!bookings) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Property Bookings</h1>
      <BookingList 
        bookings={bookings?.upcomingBookings} 
        title="Upcoming Bookings" 
        isUpcoming={true} 
      />
      <BookingList 
        bookings={bookings?.completedBookings} 
        title="Past Bookings" 
        isUpcoming={false} 
      />
    </div>
  );
};

export default Reservation;