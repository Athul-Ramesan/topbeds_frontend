import { ErrorMessage, Field, Formik,Form } from "formik"
import { useDispatch } from "react-redux";
import {  Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { userLoginAction, userSignupAction } from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import ModalIndex from "../../components/Modal/ModalIndex";
import ForgotPassword from "../../components/Modal/ForgotPassword";


interface FormValues {
  password: string;
  email: string;
};

const initialValues :FormValues= {
  email:"athulrameshankv.ar@gmail.com",
  password:"Asdfgh@34"
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const {user,error} = useAppSelector(state=> state.user)

  const navigate= useNavigate()
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false)

  

  useEffect(()=>{
    if(user){
      console.log(user,'inside yes user');
      
      navigate('/index')
    }
  },[user])

  const validationSchema = Yup.object().shape({
    email: Yup.string()
          .email("Email is not valid")
          .required('Email required'),
    password: Yup.string()
              .required("Password required") 
  })
  const handleLoginSubmit = async  (values :FormValues) =>{
    console.log('loginbutton clicked');
    
      const response = await dispatch(userLoginAction(values))
        console.log(response)
        if(response.payload.status==="ok"){
          navigate('/index')
        }
  }
  const googleSignup = async (response: string | any, status: boolean) => {
    if (status) {
       try {
        const credentials: any /*need to change this  type later*/ = jwtDecode(response.credential)
        console.log(credentials, 'credentials');
        credentials.isGoogle = true
        const googleSignupData :any = await dispatch(userSignupAction(credentials))
        console.log(googleSignupData,"inside google Signup data");
        if(googleSignupData.type==='auth/userSignup/fulfilled'){
            navigate('/')
        }else{
            navigate('/signup')
        }
       } catch (error:any |{message?: string}) {
            toast.error(error.message)
       }
    }
  }
  const hanldeCloseModal = ()=>{
   setForgotPasswordModalOpen(false)
 }
  return (
    <div className="mt-4 grow flex flex-col items-center justify-around">
       <div className="mb-32">
       {/* {isForgotPasswordModalOpen && ( <ModalIndex children={<ForgotPassword onClose={hanldeCloseModal}/>} />)} */}
       <h1 className="text-4xl text-center text-font-color-100"> Login</h1>
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoginSubmit} >
        <Form className="m-6 max-w-md mx-auto" action="">
            <Field type="email" name="email" placeholder="email"/>
            <ErrorMessage component="div" className="text-red-900" name="email" />
            <Field type="password" name="password" placeholder="password"/>
            <ErrorMessage component="div" className="text-red-900" name="password" />
            {error && < p className="py-1 px-1 text-red-400">{error}</p>}
            <button type="submit" className="primary hover:bg-primaryTint hover:text-primaryDarkColor duration-300">Login</button>
            <div className="">Don't have an account yet?
                <Link className="px-6 text-sm text-font-color-200 hover:text-primaryColor" to={'/auth/signup'}>Register Now</Link>
            </div>
            <p className="text-sm pt-[1px] text-primaryTint hover:text-primaryDarkColor cursor-pointer" 
            onClick={() => navigate('/auth/forgot-password')}
            >forgot password?</p>
        </Form>
       </Formik>
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
  )
}

export default LoginPage
