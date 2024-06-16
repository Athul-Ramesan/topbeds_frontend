import React, { useState } from 'react';
import { axiosInstance } from '../../config/instances';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordNewPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true)
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      console.log("🚀 ~ handleSubmit ~ response:", response)
      setMessage(response.data.message);
      setError('');
      if (response.data.message === "verified") {
        setMessage('Email verified, Please check your email to reset your password');
        setButtonLoading(false)

      }
    } catch (err: any) {
      setError(err.response.data.error);
      setMessage('');
      setButtonLoading(false)
    }
  };

  return (
    <div className="flex bg-cover bg-center h-screen " style={{ backgroundImage: "url('/login-cover.jpg')" }}>
      <div className="p-8 opacity-30 bg-gradient-to-r from-black via-gray-800 to-gray-500 rounded-lg w-2/5 border-r border-none">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Forgot Password</h1>
      </div>
      <div className="grow flex w-3/5 justify-end px-10 pt-44">
        <div className="rounded-lg shadow-md p-8 w-[500px] h-[250px]">
          {/* <h2 className="text-xl text-font-accent flex justify-center font-bold mb-6">Forgot Password</h2> */}
          {message && <p className="text-green-700 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">
               
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Type email here..'
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder-green-600 text-green-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primaryColor w-full rounded-xl hover:bg-leafGreen transition duration-500 text-white font-bold  py-2 px-4 "
            >
              {buttonLoading ? 'Loading...' : 'Submit'}

            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordNewPage;