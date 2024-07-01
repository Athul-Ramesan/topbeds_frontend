import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface PaymentSuccessModalProps {
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ onClose }) => {
  const [paymentStatus, setPaymentStatus] = useState<string>('Processing');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const savePaymentDetails = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
      
      if (!sessionId) {
        setError('No session ID found.');
        return;
      }

      try {
        // First, verify the payment status with Stripe
        const stripeResponse = await axios.get(`/api/payments/session-status/${sessionId}`);
        
        if (stripeResponse.data.payment_status === 'paid') {
          // If payment is confirmed, save the details in your backend
          const saveResponse = await axios.post('/api/bookings/confirm', { sessionId });
          
          if (saveResponse.data.success) {
            setPaymentStatus('Payment successful and booking confirmed!');
          } else {
            setPaymentStatus('Payment successful, but there was an issue confirming your booking. Please contact support.');
          }
        } else {
          setPaymentStatus('Payment not confirmed. Please contact support.');
        }
      } catch (err) {
        setError('An error occurred while processing your payment. Please contact support.');
        console.error('Payment confirmation error:', err);
      }
    };

    savePaymentDetails();
  }, [location]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
        
        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : (
          <p className="mb-4">{paymentStatus}</p>
        )}
        
        {paymentStatus === 'Payment successful and booking confirmed!' && (
          <div className="mb-4">
            <p className="text-green-500 font-semibold">Thank you for your purchase!</p>
            <p>You will receive a confirmation email shortly.</p>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;