import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Login to continue</h2>
        <div className="flex justify-between">
         <Link className='text-leafGreen underline' to={'/auth/login'} >Login</Link>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
