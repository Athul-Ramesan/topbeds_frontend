import { HomeIcon } from 'lucide-react';
import { useEffect, useState, useRef, FC } from 'react';
import { usePopper } from 'react-popper';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { bookingApiInstance } from '../../../config/instances';
import PaymentProcessingIcon from '../../../components/loader/PaymentProcessingIcon';
import { useAppSelector } from '../../../redux/store';

const BookingPaymentSuccessful:FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {user} = useAppSelector(state=>state.user)
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const params = useParams()
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    
    const savePaymentDetails = async () => {
      // const session_id = new URLSearchParams(location.search).get('session_id');
      const { session_id } = params
      setLoading(true)
      console.log("🚀 ~ savePaymentDetails ~ session_id:", session_id)
      console.log(params);

      if (!session_id) {
        setError('No session ID found.');
        return;
      }

      try {
        const stripeResponse = await bookingApiInstance.get(`/payment-session-status/${session_id}`);

        console.log("🚀 ~ savePaymentDetails ~ stripeResponse:", stripeResponse)
        if (stripeResponse.data.payment_status === 'paid') {
          console.log('inside paid status');
          if(!localStorage.getItem('bookingDone')){
            console.log('inside bookingDone');
            localStorage.setItem('bookingDone', 'true')
            const bookingData = localStorage.getItem('bookingData')
            const bookingDataObj = JSON.parse(bookingData!)
            console.log('bookingDataObj', bookingDataObj)
            const {propertyId ,startDate, endDate,bookingId,} = bookingDataObj
            await bookingApiInstance.post('/confirm', { session_id, propertyId, user ,startDate, endDate, bookingId ,userId:user?._id})
            .then(saveResponse=>{
              console.log("🚀 ~ savePaymentDetails ~ saveResponse:", saveResponse)
              if (saveResponse.statusText==='Created') {
                setPaymentStatus('Payment successful and enjoy your subscription !');
              } else {
                setPaymentStatus('Payment successful, but there was an issue confirming your purchase. Please check your profile for further information.');
              }
            })
            .catch(err=>{
              console.log(err,'error of api calll')
            })
            
            console.log('after api call');
          }
        } else {
          setPaymentStatus('Payment not confirmed. Please try again');
        }
      } catch (err) {
        localStorage.removeItem('bookingDone')
        setError('An error occurred while processing your payment. Please contact support.');
        console.error('Payment confirmation error:', err);
      }finally{
        setLoading(false)
      }
    };

    savePaymentDetails();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          {loading ? (
            <PaymentProcessingIcon/>
          ):(
            <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          )
        }
         
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment Confirmation
        </h1>
        <p className="text-gray-700 text-center mb-6">
          {paymentStatus}
          {error ? error : ''}
        </p>

        <button
          ref={buttonRef}
          className=" hover:bg-leafGreen hover:text-white w-full duration-500 text-leafGreen bg-opacity-40  font-bold py-2 px-4 rounded-lg"
          onClick={() => {
            localStorage.removeItem('bookingDone')
            localStorage.removeItem('bookingData')
            navigate('/user/profile',{replace:true})
          }}
        >
          Check your profile
        </button>
        <div className='flex justify-end py-4'>
          <Link className='font-mono hover:bg-leafGreenMinimal  hover:bg-opacity-10' to={'/index/properties'}>Go home</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentSuccessful;
