import React, { useState } from 'react';
import { axiosInstance } from '../../config/instances';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordNewPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
    const [buttonLoading,setButtonLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true)
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      console.log("🚀 ~ handleSubmit ~ response:", response)
      setMessage(response.data.message);
      setError('');
      if(response.data.message==="verified"){
        setMessage('Email verified, Please check your email to reset your password');
        setButtonLoading(false)
        
      }
    } catch (err:any) {
      setError(err.response.data.error);
      setMessage('');
      setButtonLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-md p-8 w-[500px]">
        <h2 className="text-xl text-font-accent flex justify-center font-bold mb-6">Forgot Password</h2>
        {message && <p className="text-green-700 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primaryColor w-full rounded-xl hover:bg-primaryTint hover:text-black text-white font-bold  py-2 px-4 "
          >
            {buttonLoading ? 'Loading...' : 'Submit'}

          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordNewPage;