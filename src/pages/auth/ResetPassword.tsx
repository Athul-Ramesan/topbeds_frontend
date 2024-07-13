import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validatePassword } from '../../utils/validationSchema/validatePassword';
import { authApiInstance, axiosInstance } from '../../config/instances';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false)
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
      const response = await authApiInstance.post(`/reset-password/${token}`, { password });
      setMessage(response.data.message);
      console.log("🚀 ~ handleSubmit ~ response:", response)
      setError('');
      if (response.data.message === "password reset successfully") {

        setButtonLoading(false)

        
        setTimeout(() => {
          navigate('/auth/login')
        }, 3000);
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
        <h1 className="text-4xl font-bold mb-4 text-green-700">Reset Password</h1>
      </div>
      <div className="grow flex w-3/5 justify-end px-10 pt-44">
      <div className="rounded-lg shadow-md p-8 w-[500px] h-[250px]">
         
          {message && <p className="text-green-800 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">
              
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Type new password here..'
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder-green-600 text-green-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block font-bold mb-2">
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 placeholder='Confirm your password..'
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder-green-600 text-green-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primaryColor w-full rounded-xl hover:bg-leafGreen duration-500 text-white font-bold  py-2 px-4 "
            >
              {buttonLoading ? 'Loading...' : 'Submit'}

            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;