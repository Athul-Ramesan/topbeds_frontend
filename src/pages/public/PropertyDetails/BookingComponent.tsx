import React, { useContext, useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { axiosInstance } from '../../../config/instances';
import { config } from '../../../config/config';
import toast from 'react-hot-toast';

// interface BookingComponentProps {
//   price: number;
//   serviceFee: number;
//   nights: number;
// }

const BookingComponent = () => {
  const [guests, setGuests] = useState(1);
  const { singleProperty } = useContext(SinglePropertyDetailsContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  console.log("🚀 ~ singleProperty:", singleProperty)
  const maximumGuest = singleProperty?.maxGuests | 2
  const guestOption = Array.from({ length: maximumGuest }, (_, i) => i + 1)
  const price = singleProperty?.price
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  });
  const [nights, setNights] = useState<number>(2)
  // const totalBeforeTaxes = price * nights + serviceFee;
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  }
  const handleGuestsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGuests(parseInt(event.target.value));
  };

  useEffect(() => {
    const calculateNights = () => {
      const start = new Date(date.startDate).getTime();
      const end = new Date(date.endDate).getTime();
      const difference = (end - start) / (1000 * 60 * 60 * 24)
      setNights(difference)
    }
    calculateNights()
  }, [date.startDate, date.endDate])

  const makePayment =async ()=>{
    setLoading(true)
    const start = new Date(date.startDate)
    const end = new Date(date.endDate)
    const stripe =await loadStripe
    ("pk_test_51PTPcK05vcABQvkG6AA0NInegpeZvuF47iI14eA7Fctgdrm3pQ73du4OV8MqhmS7lENU1Emxt6pKju2S1F9r3uL100QZ2UQkR2")
    const body ={
      property: singleProperty,
      startDate: start,
      endDate: end,
      nights: nights,
      guests: guests,
      price: price,
    }
    
    console.log("🚀 ~ makePayment ~ body:", body)
    
     try {
      const response =  await  axiosInstance.post('/booking/make-payment-session',
         body , config
      )
      console.log("🚀 ~ makePayment ~ response:", response)
        if(response.status.data.message="OK"){
          setLoading(false)
        const result = stripe?.redirectToCheckout({
          sessionId:response.data?.id
          })
        }

      console.log("🚀 ~ makePayment ~ result:",'inside status ok')
     } catch (error:any) {
      console.log("🚀 ~ makePayment ~ error:", error)
      toast.error(error.message)
      setLoading(false)
     }
    
  }
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-xl font-bold mb-2">{`₹${price} night`}</p>
      <div className="flex items-center justify-between mb-4 " >
        <div className='w-full'>

          <Datepicker placeholder={"select check-in and check-out dates"}
            value={date}
            // disabled={true}
            inputClassName={"shadow-md shadow-black placeholder:text-green-500 text-green-600  rounded-md focus:ring-0 font-normal"}
            onChange={handleValueChange}
          />
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
          {
            guestOption.map((count) => (
              <option key={count} value={count}>{count} guest{count > 1 ? 's' : ''}</option>

            ))
          }
          {/* Add more options as needed */}
        </select>
      </div>
      <button
        onClick={
        makePayment
        //   () => {
        //   navigate(`/index/properties/${singleProperty?._id}/checkout`)
        // }
      }
        className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">{`${loading ? "Loading..." :"Book now"}`}</button>
      <div className="mt-4">
        <p className="text-sm text-gray-600">You won't be charged yet</p>
        <div className="flex justify-between mt-2">
          <p>₹{price} x {nights} nights</p>
          <p>{`₹${price * nights}`}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Topbeds service fee</p>
          <p>{`₹${41}`}</p>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-2 flex justify-between">
          <p className="font-bold">Total</p>
          <p className="font-bold">{`₹${price * nights + 41}`}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;