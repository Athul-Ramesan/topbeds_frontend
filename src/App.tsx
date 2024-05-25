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
import ListingManagement from "./pages/host/ListingManagement";
import { IUserSignupData } from "./interface/IUserSignup";
import PublicLayout from "./pages/public/PublicLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import AllProperties from "./pages/public/AllProperties";
import ManageListing from "./components/host/ManageListing";

interface IRoles {
  [key: string]: string
}
interface IRoleBasedRedirectProps {
  roles: IRoles,
  user: IUserSignupData | null
}

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  console.log("🚀 ~ App ~ user:", user)
  useEffect(() => {
    if (!user) {
      dispatch(getUserData())
    }
  
  }, [user])
  
  const RoleBasedRedirect: FC<IRoleBasedRedirectProps> = ({ roles, user }) => {
    if (user && roles[user.role!]) {
      return <Navigate to={roles[user.role!]} replace />
    }
    
    return <Navigate to="/index" replace />
  }

  const ProtectHostRoute = ({element}) => {
    console.log("🚀 ~ ProtectHostRoute ~ element:", element)
    
    console.log("🚀 ~ ProtectHostRoute ~ user:", user)
    
    return user && user?.role==='host' ? element : <Navigate to ="/index" replace />
  }

  const ProtectedRoute = ({ element }) => {
    const { user } = useAppSelector((state) => state.user)
    return user ? element : <Navigate to="/index" />;
  }
  // const preventAccess = ({element})=>{
  //   const {user} = useAppSelector((state)=> state.user)
  //   return 
  // }
  // if (user === null || user === undefined) {
  //   return (
  //     <div className="">
  //       <Router>
  //         <Toaster position="top-center" />
  //         <Routes>
  //           <Route path="/" element={<Layout />}>
  //             <Route path="/login" element={<LoginPage />} />
  //             <Route path="/signup" element={<RegisterPage />} />
  //             <Route path="/verify-account" element={<EmailVerification />} />
  //           </Route>
  //         </Routes>
  //       </Router>
  //     </div>
  //   )
  // }
  // if (user?.role === "user") {
  //   return (
  //     <div className="bg-bg-200">
  //       <Router>

  //         <Toaster position="top-center" />

  //         <Routes>
  //           <Route path="/" element={<Layout />}>
  //             <Route path="/" element={<IndexPage />} />
  //             <Route path="/account" element={<AccountPage />} />
  //             <Route path="/verify-account" element={<EmailVerification />} />
  //             <Route path="/add-property" element={<AddProperty />} />
  //           </Route>
  //           <Route path="/profile" element={<ProfileLayout />}>
  //             {/* <Route path="/account" element={}/> */}
  //           </Route>
  //           <Route path="/host-profile" element={<HostLayout/>} >
  //             {/* <Route path="/host-listing" element={<ListingManagement/>} /> */}
  //             {/* <Route path="/listing" element={<ListingManagement/>} /> */}
  //           </Route>
  //         </Routes>
  //       </Router>
  //     </div>
  //   )
  // }
  return (
    <Router >
      <Routes>
        <Route path="/" 
        element={
          <RoleBasedRedirect roles={{
            admin: '/admin'
          }}
          user={user} />}
          >
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminRoutes />} />} />
        </Route>

        {/* Auth pages */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* general pages */}
        <Route path="/index/*" element={<PublicRoutes />} />

        {/* Host Routes */}
        <Route path="/host/*" element={<ProtectHostRoute element={<HostRoutes />} />} />

        {/* Admin routes */}

        {/* User Routes */}
        {/* <Route path="/user/*" element={<ProtectedRoute element={<UserRoutes/>} />} /> */}
        <Route path="/user/*" element={<ProtectedRoute element={<UserRoutes />} />} />
      </Routes>
    </Router>
  )

}

export default App;
const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} >
      </Route>
    </Routes>
  )
}

const HostRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HostLayout />} >
        <Route index element={<Navigate to="/host/dashboard" />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/dashboard" element={<HostDashboard />} />
        <Route path="/manage-listing" element={<ManageListing />} />
        <Route path="/reservations" element={""} />
        <Route path="/inbox" element={""} />
        <Route path="/reviews" element={""} />
        <Route path="/earnings" element={""} />
        <Route path="/Account" element={""} />
      </Route>
    </Routes>
  )
}

const UserRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} >
        <Route path="/profile"  element={<ProfileLayout />}>
          {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        </Route>
      </Route>
    </Routes>
  )
}

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />} >
        <Route index element={<Navigate to="/index/home" replace />} />
        <Route path="/home" element={<IndexPage />} />
        <Route path="/properties" element={<AllProperties />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={""} />
        <Route path="/verify-account" element={<EmailVerification />} />
      </Route>
    </Routes>
  )
}