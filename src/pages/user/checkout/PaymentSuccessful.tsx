import { HomeIcon } from 'lucide-react';
import { useEffect, useState, useRef, FC } from 'react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';

const PaymentSuccessful:FC = () => {
  const [showPopper, setShowPopper] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
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
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Thank you for your payment. Your transaction has been processed successfully.
        </p>

        <button
          ref={buttonRef}
          className=" hover:bg-leafGreen hover:text-white w-full duration-500 text-leafGreen bg-opacity-40  font-bold py-2 px-4 rounded-lg"
          onClick={() => setShowPopper(!showPopper)}
        >
         Check your booking status
        </button>
        <div className='flex justify-end py-4'>
        <Link className='font-mono hover:bg-leafGreenMinimal  hover:bg-opacity-10' to={'/index/properties'}>Go home</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
