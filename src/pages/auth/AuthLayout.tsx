import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

const AuthLayout = () => {
  return (
    <>
      <div className=' flex p-4 border-b-0 shadow-md z-10 flex-col w-full bg-gray-100 fixed'>
      <Header/>
    </div>
    <div className='pt-16 overflow-hidden bg-sageGreen h-screen'>
      <Outlet/>
    </div>
    </>
  )
}

export default AuthLayout
