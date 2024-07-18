import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { verifyOtpAction } from '../../redux/actions/userActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setErrorDisable } from '../../redux/reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  user: any;
  onSubmit: (values: FormValues | any) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  confPassword?: string;
  email: string;
}

const VerificationModal: FC<Props> = ({ isOpen, onClose, user, onSubmit }: Props) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isOpen && !canResend) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            setCanResend(true);
            if (interval) {
              clearInterval(interval);
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOpen, canResend]);

  const verifyOtp = async (otp: string) => {
    setLoading(true);
    const action = await dispatch(verifyOtpAction({ otp, ...user }));
    setLoading(false);
    console.log(action, 'response inside verifyotp modal');
    if (action.type === 'auth/verify-account/fulfilled') {
      toast.success('Registered, Please Login');
      navigate('/auth/login');
      onClose();
    } else {
      navigate('/auth/signup');
    }
  };

  const handleResendOtp = () => {
    onSubmit(user)
    setCanResend(false);
    setTimer(60);
    onSubmit(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Enter OTP</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              onClick={() => {
                dispatch(setErrorDisable());
                onClose();
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Formik
            initialValues={{ otp: '' }}
            onSubmit={(values) => verifyOtp(values.otp)}
            validationSchema={Yup.object({
              otp: Yup.string()
                .matches(/^\d*$/, 'OTP must contain only numbers')
                .length(6, 'OTP must be 6 characters long')
                .required('OTP is required')
            })}
          >
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-primaryColor"
                  placeholder="Enter OTP"
                  name="otp"
                />
                <ErrorMessage component="div" className="text-red-900" name="otp" />
              </div>
              {error === "Otp doesn't match" && (
                <p className="py-1 px-1 text-red-400">{error}</p>
              )}
              <div className="flex justify-between items-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="btn btn-primary hover:btn-info transition-colors"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-500">Resend in {timer}s</span>
                )}
                <button
                  type="submit"
                  className="primary hover:bg-primaryTint text-white py-2 px-4 rounded-md transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;


// import { FC } from 'react'
// import { useAppDispatch, useAppSelector } from '../../redux/store'
// import { verifyOtpAction } from '../../redux/actions/userActions'
// import { Formik, Field, Form, ErrorMessage } from 'formik'
// import * as Yup from "yup"
// import { setErrorDisable } from '../../redux/reducers/user/userSlice'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// // import { IUserSignupData } from '../../interface/IUserSignup'

// interface Props {
//   onClose: () => void
//   isOpen: boolean
//   user: any
//   onSubmit: (values: FormValues | any) => void
// }
// interface FormValues {
//   firstName: string;
//   lastName: string;
//   password: string;
//   confPassword?: string;
//   email: string;
// };
// const VerificationModal: FC<Props> = ({ isOpen, onClose, user, onSubmit }: Props) => {
//   const dispatch = useAppDispatch();
//   const { error } = useAppSelector(state => state.user)
//   const navigate = useNavigate()
//   const verifyOtp = async (otp: string) => {
//     const action = await dispatch(verifyOtpAction({ otp, ...user }));
//     console.log(action, "response inside verifyotp modal");
//     if (action.type === "auth/verify-account/fulfilled") {
//       toast.success('Registered, Please Login')
//       navigate('/auth/login')
//       onClose()
//     } else {
//       navigate('/auth/signup') 
//     }
//   }
  


//   if (!isOpen) return null;

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm">
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Enter OTP</h2>
//             <button
//               type="button"
//               className="text-gray-400 hover:text-gray-500 transition-colors"
//               onClick={() => {
//                 dispatch(setErrorDisable())
//                 onClose()
//               }}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <Formik
//             initialValues={{ otp: '' }}
//             onSubmit={(values) => verifyOtp(values.otp)}
//             validationSchema={Yup.object({
//               otp: Yup.string()
//                 .matches(/^\d*$/, 'OTP must contain only numbers')
//                 .length(6, 'OTP must be 6 characters long')
//                 .required("OTP is required")
//             })}
//           >
//             <Form>
//               <div className="mb-4">
//                 <Field
//                   type="text"
//                   className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus: border-primaryColor"
//                   placeholder="Enter OTP"
//                   name='otp'
//                 />
//                 <ErrorMessage component="div" className="text-red-900" name="otp" />
//               </div>
//               {error === "Otp doesn't match" ? <p className="py-1 px-1 text-red-400">{error}</p> : null}
//               <div className="flex justify-between">
//                 <button onClick={onSubmit}
//                   type="button"
//                   className="text-blue-500 hover:text-blue-600 transition-colors"
//                 >
//                   Resend OTP
//                 </button>
//                 <button
//                   type="submit"
//                   className="primary hover:bg-primaryTint text-white py-2 px-4 rounded-md transition-colors"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerificationModal;
