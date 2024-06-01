import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import { useAppDispatch, useAppSelector } from "./redux/store";
import EmailVerification from "./pages/EmailVerification";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { getUserData } from "./redux/actions/userActions";
import ProfileLayout from "./pages/ProfileLayout";
import AddProperty from "./pages/host/AddProperty";
import "./App.css"
import IndexPage from "./pages/IndexPage";
import HostDashboard from "./pages/host/HostDashboard";
import HostLayout from "./pages/host/HostLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import UserLayout from "./pages/user/UserLayout";
import AboutPage from "./pages/public/AboutPage";
import { IUserSignupData } from "./interface/IUserSignup";
import PublicLayout from "./pages/public/PublicLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import AllProperties from "./pages/public/AllProperties";
import ManageListing from "./components/host/ManageListing";
import LoadingSpinner from "./pages/LoadingSpinner";
import SinglePropertyDetailedLayout from "./pages/host/SinglePropertyDetailedLayout";
import ShowPhotosHostProperty from "./pages/host/ShowPhotosHostProperty";
import ShowTitleHostProperty from "./pages/host/ShowTitleHostProperty";
import ShowDescriptionHostProperty from "./pages/host/ShowDescriptionHostProperty";
import ShowPriceHostProperty from "./pages/host/ShowPriceHostProperty";
import Index from "./pages/public/PropertyDetails/Index";

import ForgotPasswordNewPage from "./pages/auth/ForgotPasswordNewPage";
import ResetPassword from "./pages/auth/ResetPassword";
import ShowAmenitiesHostProperty from "./pages/host/ShowAmenitiesHostProperty";
import ShowbedroomsHostProperty from "./pages/host/ShowBedroomsHostProperty";
import SinglePropertyDetailsProvider from "./context/SinglePropertyDetails";
import { HostPropertySingleContext } from "./context/HostPropertySingleContext";

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
  const [loading, setLoading] = useState(true);
  const {hostProperty} = useContext(HostPropertySingleContext)
  console.log("🚀 ~ App ~ user:", user)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        await dispatch(getUserData())
      }
      setLoading(false);
    }

    fetchUserData()
  }, [user])

  const RoleBasedRedirect: FC<IRoleBasedRedirectProps> = ({ roles, user }) => {
    if (user && roles[user.role!]) {
      return <Navigate to={roles[user.role!]} replace />
    }

    return <Navigate to="/index" replace />
  }
  if (loading) {
    return <LoadingSpinner />
  }
  const ProtectHostRoute = ({ element }) => {
    console.log("🚀 ~ ProtectHostRoute ~ element:", element)

    console.log("🚀 ~ ProtectHostRoute ~ user:", user)

    return user && user?.role === 'host' ? element : <Navigate to="/index" replace />
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
        <Route path="/manage-listing/:propertyId" element={<SinglePropertyDetailedLayout />}>
          <Route index element={<Navigate to="photos" />} />
          <Route path="photos" element={<ShowPhotosHostProperty />} />
          <Route path="title" element={<ShowTitleHostProperty />} />
          <Route path="description" element={<ShowDescriptionHostProperty />}/>
          <Route path="price" element={<ShowPriceHostProperty />} />
          <Route path="amenities" element={<ShowAmenitiesHostProperty />} />
          <Route path="bathrooms" element={""} />
          <Route path="bedrooms" element={<ShowbedroomsHostProperty />} />
          <Route path="max-guests" element={""} />
          <Route path="bedrooms" element={""} />
          <Route path="house-rules" element={""} />

          {/* <Route path="details" element={<HostPropertyDetail />} >
          </Route> */}
          {/* <Route path="arrival" element={<ArrivalGuidlines />} /> */}
        </Route>
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
        <Route path="/profile" element={<ProfileLayout />}>
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
        <Route path="/properties/:propertyId" element={<Index />} />
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
          <Route path="/forgot-password" element={<ForgotPasswordNewPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-account" element={<EmailVerification />} />
        </Route>
    </Routes>
  )
}