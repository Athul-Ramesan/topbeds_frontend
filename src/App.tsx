import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/user/LandingPage";
import LoginPage from "./pages/user/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/user/RegisterPage";
import AccountPage from "./pages/user/AccountPage";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./redux/store";
import EmailVerification from "./pages/EmailVerification";
import { useEffect } from "react";
import { getUserData } from "./redux/actions/userActions";
import ProfileLayout from "./pages/ProfileLayout";


function App() {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state=>state.user)
  console.log(user,'user user');
  
  // const ProtectedRoute = ({element})=>{
  //   const {user} = useAppSelector((state)=>state.user)
  //   return user? element : <Navigate to="/login" />;
  // }
  useEffect(()=>{ 
      if(!user){
         dispatch(getUserData())
      }
    
  },[dispatch,user])
  
    return (  
      <>
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<RegisterPage/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/verify-account" element={<EmailVerification/>}/>
        </Route>
        <Route path="/profile" element={<ProfileLayout/>}> 
        {/* <Route path="/account" element={}/> */}
        </Route>
      </Routes>
      </>
    )
  
}

export default App;
