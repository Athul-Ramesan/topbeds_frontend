import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IProperty, IUserSignupData } from './interfaces'; // Adjust the import path as needed
import { bookingApiInstance } from '../../../config/instances';

const localizer = momentLocalizer(moment);

interface IBooking {
  _id: string;
  property: IProperty;
  user: IUserSignupData;
  guests: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid';
  paymentIntentId?: string;
  bookingStatus: 'Pending' | 'Accepted' | 'Cancelled';
}

interface CalendarEvent extends Event {
  resource: IBooking;
}

interface HostCalendarProps {
  hostId: string;
}

const HostCalendar: React.FC<HostCalendarProps> = ({ hostId }) => {
  const [bookings, setBookings] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHostBookings();
  }, [hostId]);

  const fetchHostBookings = async () => {
    setIsLoading(true);
    try {
      const response = await bookingApiInstance.get(`/booking/host/${hostId}`);
      const data: IBooking[] = response.data.allBookings
      const formattedBookings: CalendarEvent[] = data.map(booking => ({
        title: `${booking.property.title}: ${booking.guests} guests`,
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
        resource: booking
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let style: React.CSSProperties = {
      backgroundColor: '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    
    if (event.resource.bookingStatus === 'Pending') {
      style.backgroundColor = '#ffa500';
    } else if (event.resource.bookingStatus === 'Accepted') {
      style.backgroundColor = '#4caf50';
    } else if (event.resource.bookingStatus === 'Cancelled') {
      style.backgroundColor = '#f44336';
    }

    return {
      style: style
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ height: '500px' }}
      >
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        ) : (
          <Calendar<CalendarEvent>
            localizer={localizer}
            events={bookings}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            eventPropGetter={eventStyleGetter}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HostCalendar;