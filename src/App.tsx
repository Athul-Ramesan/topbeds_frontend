import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/user/RegisterPage";
import AccountPage from "./pages/user/AccountPage";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./redux/store";
import EmailVerification from "./pages/EmailVerification";
import { FC, useEffect } from "react";
import { getUserData } from "./redux/actions/userActions";
import ProfileLayout from "./pages/ProfileLayout";
import LandingPageMain from "./pages/public/LandingPage";
import AddProperty from "./pages/host/AddProperty";
import "./App.css"
import IndexPage from "./pages/IndexPage";
import HostDashboard from "./pages/host/HostDashboard";
import HostLayout from "./pages/host/HostLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserLayout from "./pages/user/UserLayout";
import AboutPage from "./pages/public/AboutPage";

interface IRoles {
  [key: string]: string
}
interface IRoleBasedRedirectProps{
  roles:IRoles
}

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  console.log("🚀 ~ App ~ user:", user)

  // const RoleBasedRedirect :FC<IRoles>= ({roles})=>{
  //   if(user && roles[user.role]){
  //     return <Navigate to={roles[user.role]} replace/>
  //   }
  //   return <Navigate to="/topbeds" replace/>
  // }

  useEffect(() => {
    if (!user) {
      dispatch(getUserData())
    }

  }, [user])
  // const ProtectedRoute = ({ element }) => {
  //   const { user } = useAppSelector((state) => state.user)
  //   return user ? element : <Navigate to="/topbeds" />;
  // }
  if (user === null || user === undefined) {
    return (
      <div className="">
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/verify-account" element={<EmailVerification />} />
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
  if (user?.role === "user") {
    return (
      <div className="bg-bg-200">
        <Router>

          <Toaster position="top-center" />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<IndexPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/verify-account" element={<EmailVerification />} />
              <Route path="/add-property" element={<AddProperty />} />
            </Route>
            <Route path="/profile" element={<ProfileLayout />}>
              {/* <Route path="/account" element={}/> */}
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
  // return (
  //   <Router >
  //     <Routes>
  //       <Route path="/" element={<RoleBasedRedirect roles={{
  //         admin:"/admin",
  //         user:'/user',
  //         host:'/host'
  //       }} />} />

  //       {/* Auth pages */}
  //       <Route path="/login" element={ <LoginPage />} />
  //       <Route path="/signup" element={<RegisterPage />} />
  //       <Route path="/verify-account" element={<EmailVerification />} />

  //       {/* general pages */}

  //       <Route path="/topbeds" element={<IndexPage/>} />
  //       <Route path="/about" element={<AboutPage/>} />


  //       {/* Host Routes */}
  //       <Route path="/host/*" element={<ProtectedRoute element={<HostRoutes />} />} /> 

  //       {/* Admin routes */}
  //       <Route path="/admin/*" element={<ProtectedRoute element={<AdminRoutes/>} />} />

  //       {/* User Routes */}
  //       <Route path="/user/*" element={<ProtectedRoute element={<UserRoutes/>} />} />
     
  //     </Routes>
  //   </Router>
  // )

}

export default App;
// const AdminRoutes: FC = ()=>{
//   return (
//     <Routes>
//       <Route path="/" element={<AdminLayout/>} >
//       </Route>
//     </Routes>
//   )
// }

// const HostRoutes :FC =()=>{
//   return (
//     <Routes>
//       <Route path="/" element={<HostLayout/>} >
//       <Route path="/dashboard" element={<HostDashboard/>} />
//       </Route>
//     </Routes>
//   )
// }

// const UserRoutes : FC =()=>{
//   return (
//     <Routes>
//       <Route path="/" element={<UserLayout/>} >
//         <Route path="/dashboard" element={<UserDashboard/>} />
//       </Route>
//     </Routes>
//   )
// }