import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/index/properties')
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">Unfortunately, your payment could not be processed. Please try again later or contact support if the issue persists.</p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
