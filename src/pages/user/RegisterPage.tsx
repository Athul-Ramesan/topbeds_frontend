import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../../redux/store"
import { sendOtpAction, userSignupAction } from "../../redux/actions/userActions"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import VerificationModal from "../../components/Modal/VerificationModal"
import { setErrorDisable } from "../../redux/reducers/user/userSlice"
import DynamicText from "../../components/public/DynamicText"
// import LoadingSpinner from "../LoadingSpinner"

interface FormValues {
    firstName: string;
    lastName: string;
    password: string;
    confPassword?: string;
    email: string;
};
const initialValues = {
    firstName: "Athul",
    lastName: "Rameshan",
    email: "athulrameshankv.ar@gmail.com",
    password: "Asdfgh@34",
    confPassword: "Asdfgh@34",
}

const validationSchema = Yup.object({
    firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed for the first name')
        .required("First name required"),
    lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Only alphabetic characters are allowed for the last name')
        .required("Last Name Required"),
    email: Yup.string()
        .email("Invalid Email")
        .required("Email required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("required")
})
// const loading: boolean = true

const RegisterPage = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [formValues, setFormValues] = useState<FormValues>(initialValues)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user, error } = useAppSelector((state) => state?.user)

    useEffect(() => {
        if (user) {
            navigate('/index')
        }
        return () => {
            dispatch(setErrorDisable());
        };
    }, []);

    const googleSignup = async (response: string | any, status: boolean) => {
        if (status) {
            try {
                const credentials: any /*need to change this  type later*/ = jwtDecode(response.credential)
                console.log(credentials, 'credentials');
                credentials.isGoogle = true
                const googleSignupData: any = await dispatch(userSignupAction(credentials))
                console.log(googleSignupData, "inside google Signup data");
                if (googleSignupData.type === 'auth/userSignup/fulfilled') {
                    navigate('/index')
                    toast.success("Registered Successfully! Please Login.")
                } else if (googleSignupData.type === 'auth/userSignup/rejected') {
                    toast.error("User exists")
                    dispatch(setErrorDisable());
                }
            } catch (error: any | { message?: string }) {

                toast.error(error.message)
            }
        }
    }
    const onSubmit = async (values: FormValues) => {

        const { confPassword, ...restValues } = values
        setFormValues(restValues)
        //otp sending dispatch  
        const signupYes = {
            signup: true
        }
        console.log(formValues, '>>>>>>>>>form values');
        const action = await dispatch(sendOtpAction({ ...signupYes, ...restValues }))
        if (action.type === "auth/verify-account/send-otp/fulfilled") {
            setModalOpen(true)
        }
        console.log(action, 'action in onsubmit');

    }
    const hanldeCloseModal = () => {
        setModalOpen(false)
    }



    return (
        <div className="flex bg-cover bg-center h-screen " style={{ backgroundImage: "url('/login-cover.jpg')" }}>
            <div className="p-8 opacity-30 bg-gradient-to-r from-black via-gray-800 to-gray-500 rounded-lg w-2/5 border-r border-none">
            <h1 className="text-4xl font-bold mb-4 text-green-700">Register</h1>
            <DynamicText texts={
                [
                    "Welcome to TopBeds!",
                    "Please sign in to continue.",
                    "Experience the best service.",
                    "Secure and easy login.",
                    "Your journey starts here."
                  ]
            }/>
            </div>
            <div className="mt-4 grow flex flex-col items-center justify-around">
                <VerificationModal isOpen={isModalOpen} onClose={hanldeCloseModal} onSubmit={onSubmit} user={formValues} />

                <div className="mb-8">
                  
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className="m-6 max-w-md mx-auto">
                            <Field type="text" 
                            className="placeholder-green-700 focus:outline-none"
                            placeholder="First name" name="firstName" id="firstName" />
                            <ErrorMessage component="div" className="text-red-900" name="firstName" />
                            <Field type="text" placeholder="Last name" 
                            className="placeholder-green-700 focus:outline-none"
                            name="lastName" id="lastName" />
                            <ErrorMessage component="div" className="text-red-900" name="lastName" />
                            <Field type="email" 
                            className="placeholder-green-700 focus:outline-none"
                            placeholder="Email" name="email" />
                            <ErrorMessage component="div" className="text-red-900" name="email" />
                            <Field type="password" placeholder="password" 
                            className="placeholder-green-700 focus:outline-none"
                            name="password" id="password" />
                            <ErrorMessage component="div" className="text-red-900" name="password" />
                            <Field type="password" 
                            className="placeholder-green-700 focus:outline-none"
                            placeholder="Confirm password" name="confPassword" id="confPassword" />
                            <ErrorMessage component="div" className="text-red-900" name="confPassword" />
                            {error && <p className="py-1 px-1 text-red-400">{error}</p>}
                            <button type="submit" className="primary hover:bg-leafGreen duration-300">Register</button>
                            <div className="flex">have an account?
                                <Link className="px-6 text-sm text-primaryTint hover:text-primaryColor" to={'/auth/login'}>Login Here</Link>

                            </div>

                        </Form>
                    </Formik>
                    < hr />
                    <div className="px-16 pt-6">
                        < GoogleLogin
                            text="signup_with"
                            shape="circle"
                            onSuccess={CredentialResponse => {
                                console.log(CredentialResponse);
                                googleSignup(CredentialResponse, true)
                            }}
                        >
                        </GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
