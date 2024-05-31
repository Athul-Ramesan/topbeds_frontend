import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validatePassword } from '../../utils/validationSchema/validatePassword';
import { axiosInstance } from '../../config/instances';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonLoading,setButtonLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setMessage('');
      return;
    }
    const result = validatePassword(password)
    if (result !== 'Password is valid') {
        setError(`Password validation failed: ${result}`)
        return;
      } 
    setButtonLoading(true)
    try {
      const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password});
      setMessage(response.data.message);
      console.log("🚀 ~ handleSubmit ~ response:", response)
      setError('');
      if(response.data.message==="password reset successfully"){

          setButtonLoading(false)
          setTimeout(() => {
              navigate('/auth/login')
          }, 2000);
      }
    } catch (err:any) {
      setError(err.response.data.error);
      setMessage('');
      setButtonLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-[450px]">
        <h2 className="text-2xl font-bold mb-6 text-font-accent flex justify-center">Reset Password</h2>
        {message && <p className="text-green-800 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;