// BookingDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBooking } from '../../../interface/IBooking';
import { bookingApiInstance } from '../../../config/instances';
import CancellationPolicy from './CancellationPolicy';
import { AlertOctagonIcon } from 'lucide-react';
import RefundMessage from './RefundMessage';
import MessageModal from '../../../components/Modal/MessageModal';
import LoadingSpinner from '../../LoadingSpinner';

const BookingDetails: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [booking, setBooking] = useState<any>(null);
    const [isCancelled,setIsCancelled] = useState(false)
    const [refundAmount, setRefundAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [openMessageModal, setOpenMessageModal] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    useEffect(()=>{

        const timer = setTimeout(() => {
            setInitialLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    },[])
    useEffect(() => {
        const fetchBookingDetails = async () => {
            // Replace with your actual API call
            const response = await bookingApiInstance.get(`/${bookingId}`);
            const data: IBooking = response.data
            setBooking(data);
            if(data.bookingStatus==='Cancelled'){
                setIsCancelled(true)
            }
        };
        
        fetchBookingDetails();
    }, [bookingId]);
    const handleCancelBooking = async() => {
        try {
            setLoading(true)
        const response = await bookingApiInstance.post(`/cancel/${bookingId}`,{refundPercentage:50})
        const refundAmount = response.data.refundAmount
        console.log("🚀 ~ handleCancelBooking ~ response:", response)
        if(refundAmount){
            setRefundAmount(String(refundAmount))
            setIsCancelled(true)
        }
        console.log("🚀 ~ handleCancelBooking ~ refundAmount:", refundAmount)
        } catch (error:any) {
            console.log("🚀 ~ handleCancelBooking ~ error:", error)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }   
    const handleMessageHostClick=()=>{
        setOpenMessageModal(true)
    }
    //   if (!booking) return <div>Loading...</div>;
    if(initialLoading){
        return(
            <LoadingSpinner/>
        )
    }
    return (
        <div className='flex mt-10' >
            
            <div className="max-w-3xl mx-auto px-4 py-8 border border-black rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">{booking?.property.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4 border rounded-lg p-2 bg-leafBackground-200">
                            <p className="font-semibold">Check-In:</p>
                            <p className='text-green-700 font-semibold'>{new Date(booking?.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="mb-4 rounded-lg p-2 bg-leafBackground-200">
                            <p className="font-semibold">Check-Out:</p>
                            <p className='text-green-700 font-semibold'>{new Date(booking?.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className="mb-4 rounded-lg p-2 bg-leafBackground-200">
                            <p className="font-semibold">Guests:</p>
                            <p className='text-green-700 font-semibold'>{booking?.guests} guests</p>
                        </div>
                        <div className="mb-4 rounded-lg p-2 bg-leafBackground-200">
                            <p className="font-semibold">Total Price:</p>
                            <p className='text-green-700 font-semibold'>₹{booking?.totalPrice}</p>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            {booking?.property.images.slice(0, 4).map((image:any, index:any) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Property ${index + 1}`}
                                    className="w-full h-40 object-cover rounded"
                                />
                            ))}
                        </div>
                        {/* <div className="mt-4">
                            <p className="font-semibold">Address:</p>
                            <p>{booking?.property.address}</p>
                        </div> */}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">House Rules</h2>
                    <ul className="list-disc list-inside">
                        {booking?.property.houseRules.map((rule:any, index:any) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                {isCancelled ? (
                    <>
                    <div className="flex flex-col items-center justify-center text-center bg-red-100 p-
                    4 rounded-lg mt-4">
                        <p className="font-semibold p-4"> <AlertOctagonIcon/> Booking Cancelled</p>
                    </div>
                    <RefundMessage refundAmount={refundAmount} message='Your refund will be credited in 3-5 working days' />
                        </>
                ) : (

                <>
                <div onClick={handleCancelBooking} className='btn bg-red-300'>{loading? 'Loading...': 'Cancel Booking'}</div>
                <CancellationPolicy />
                <div>
                    <div
                    onClick={handleMessageHostClick}
                    className='btn bg-black text-white my-10 hover:border hover:border-black hover:text-black '>
                        Message Host
                    </div>
                </div>
                </>
                )}
                <MessageModal hostId={String(booking?.property.hostId)} isOpen={openMessageModal} onClose={()=> setOpenMessageModal(false)}/>
            </div>
        </div>
    );
};

export default BookingDetails;