 import Header from "../../components/Header"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <>
    <div className='md:block  flex p-4 border-b-0 shadow-md z-10 flex-col w-full bg-gray-100 fixed'>
      <Header/>
    </div>
    <div className='pt-16 overflow-hidden px-10'>
      <Outlet/>
    </div>
    </>
  )
}

export default UserLayout
