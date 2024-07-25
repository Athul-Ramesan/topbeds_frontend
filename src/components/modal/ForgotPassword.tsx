import { Field, Formik, Form, FormikHelpers } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/store";
import { sendOtpAction } from "../../redux/actions/userActions";
import { IUserSignupData } from "../../interface/IUserSignup";

interface FormValues {
  email: string;
}

interface Props {
  onClose: () => void;
}

const ForgotPassword: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [isOtpSend, setIsOtpSend] = useState(false);
  console.log("🚀 ~ isOtpSend:", isOtpSend)

  const verifyEmail = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log("🚀 ~ actions:", actions)
    const userData: IUserSignupData = {
      email: values.email,
    };
    console.log(values, "email inside forgot password");
    const action = await dispatch(sendOtpAction(userData));
    console.log(action);
    if (action.type === "auth/verify-account/send-otp/fulfilled") {
      onClose();
      setIsOtpSend(true);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={verifyEmail}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
        })}
      >
        {({ errors, touched }) => (
          <Form className="flex gap-4">
            {/* close icon */}

            <Field
              type="text"
              placeholder="Enter your email"
              name="email"
              className="input"
            />
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <button
              type="submit"
              className="bg-primaryTint hover:bg-primaryTint w-2/5 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-90 hover:brightness-100 hover:animate-pulse active:animate-bounce"
            >
              <span className="w-full h-full">verify</span>
            </button>

            <div
              onClick={onClose}
              className="flex cursor-pointer items-center justify-center text-2xl text-white caret-transparent"
            >
              <div className="group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 font-medium shadow-md md:h-8 md:w-8">
                <span className="ease absolute z-10 flex h-full w-full translate-y-full items-center justify-center rounded-full bg-primaryColor text-white duration-300 group-hover:translate-y-0"></span>
                <div className="absolute z-50 flex h-full w-full items-center justify-center text-[#f6f2f2] group-hover:text-white">
                  <svg
                    height="40px"
                    width="40px"
                    viewBox="0 0 72 72"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="white"
                      d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;





// import { Field, Formik, Form } from "formik"
// import { FC, useState } from "react"
// import * as Yup from "yup"
// import { useAppDispatch } from "../../redux/store"
// import { sendOtpAction } from "../../redux/actions/userActions"
// import { IUserSignupData } from "../../interface/IUserSignup"

// interface FormValues {
//   email: string
// }
// interface Props {
//   onClose: () => void
// }
// const ForgotPassword: FC<Props> = ({ onClose }) => {
//   const dispatch = useAppDispatch()
//   const [
//     isOtpSend,
//     setIsOtpSend
//   ] = useState(false)
//   const verifyEmail = async (values: FormValues) => {
//     const userData: IUserSignupData = {
//       email: values.email
//     }
//     console.log(values, 'email inside forgot password');
//     const action = await dispatch(sendOtpAction(userData))
//     console.log(action);
//     if(action.type==="auth/verify-account/send-otp/fulfilled"){
//       onClose()
//       setIsOtpSend(true)
//     }
//   }



//   return (
//     <div>
      
//       <Formik initialValues={{ email: "" }} onSubmit={verifyEmail} validationSchema={Yup.object({
//         email: Yup.string().email("Invalid email address").required("Required"),
//       })}>
//         <Form className="flex gap-4">
//           {/* close icon */}

//           <Field type="text" placeholder="Enter your email" name="email" ></Field>
//           <button type="submit" className="bg-primaryTint hover:bg-primaryTint w-2/5 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-90 hover:brightness-100 hover:animate-pulse active:animate-bounce">
//             <span className="w-full h-full">verify</span>
//           </button>

//           <div onClick={onClose}
//             className="flex cursor-pointer items-center justify-center text-2xl text-white caret-transparent"
//           >
//             <div
//               className="group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 font-medium shadow-md md:h-8 md:w-8"
//             >
//               <span
//                 className="ease absolute z-10 flex h-full w-full translate-y-full items-center justify-center rounded-full bg-primaryColor text-white duration-300 group-hover:translate-y-0"
//               ></span>
//               <div
//                 className="absolute z-50 flex h-full w-full items-center justify-center text-[#f6f2f2] group-hover:text-white"
//               >
//                 <svg
//                   height="40px"
//                   width="40px"
//                   viewBox="0 0 72 72"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill="white"
//                     d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>


//         </Form>
//       </Formik>

//     </div>
//   )
// }

// export default ForgotPassword
