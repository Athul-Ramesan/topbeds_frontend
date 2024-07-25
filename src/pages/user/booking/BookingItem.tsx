// BookingItem.tsx
import React, { useEffect, useState } from 'react';
import { IBooking } from '../../../interface/IBooking';
import { Link, useLocation } from 'react-router-dom';
import {format} from 'date-fns'
import ReviewFormModal from '../../../components/modal/ReviewFormModal';
import { bookingApiInstance } from '../../../config/instances';


interface BookingItemProps {
  booking: IBooking;
  isUpcoming: boolean;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, isUpcoming }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
    console.log("🚀 ~ booking:🍕🍕🍕🍕🍕", booking)
    const location = useLocation()
    console.log(location.pathname,'location pathname');
    const [bookingStatus, setBookingStatus] = useState('')
    const [reviewDone, setReviewDone] = useState(false)
    
    
    useEffect(()=>{
      setBookingStatus(booking.bookingStatus)
    },[])
    const showHostSide = ()=>{
    }
    const handleLeaveReviewClick= ()=>{
      setReviewModalOpen(true)
    }
    const onReviewSubmitted =()=>{
      setReviewModalOpen(false)
    }
    useEffect(()=>{
      console.log(reviewDone,'😮‍💨😮‍💨😮‍💨😮‍💨😮‍💨😮‍💨')
      const fetchReviewDetails= async()=>{
        
      try {
        const response = await bookingApiInstance.get(`/review/booking/${booking._id}`)
        console.log("🚀 ~ fetchReviewDetails ~ response:", response)
        if (response.status === 200) {
          const review = response.data;
          if (review && review !== '') {
            console.log('inside review & review not e done');
            setReviewDone(true);
          } else {
            console.log('inside reviewDone false ');
            setReviewDone(false);
          }
        }
      } catch (error:any) {
        console.log("🚀 ~ fetchReviewDetails ~ error:", error)
        
        }
      }
      fetchReviewDetails()
    },[])
    return (
        <div className="border rounded-lg p-4 mb-4">
          {bookingStatus==='Cancelled' ? (
            <p className=" text-red-400
            ">Status: Cancelled</p>
          ):(
            ''
          )}
          <h3 className="text-lg font-semibold">{booking.property.title}</h3>
          <p>Check-In: {format(new Date(booking.startDate),'PPP')}</p>
          <p>Check-Out: {format(new Date(booking.endDate),'PPP')}</p>
          {isUpcoming ? (
            location.pathname === '/host/reservations' ? (
              <p onClick={showHostSide}>Show details</p>
            ) : (
              <Link className='btn border-black border-1' to={`/user/bookings/${booking._id}`}>
                View Booking Details
              </Link>
            )
          ) : (
            location.pathname !== '/host/reservations' ? (
              <>
              {!reviewDone && bookingStatus!=='Cancelled' && (
                <button 
                onClick={handleLeaveReviewClick}
                className="mt-2 btn btn-success btn-outline text-white px-4 py-2 rounded">
              Leave Review
            </button>
            )}
            <ReviewFormModal
            bookingId={booking._id}
            isOpen={reviewModalOpen}
            listingId={booking.property._id}
            onClose={()=>setReviewModalOpen(false)}
            onReviewSubmitted={onReviewSubmitted}
            userId={(String(booking.user._id))}
            />
              </>
            ):(
              ''
            )
          )}
        </div>
      );
};

export default BookingItem;