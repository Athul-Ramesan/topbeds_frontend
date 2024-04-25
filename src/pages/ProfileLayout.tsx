import { Outlet } from "react-router-dom"
import SidebarIndex from "../components/SideBar/SidebarIndex"
import Header from "../components/Header"


const ProfileLayout = () => {
  return (
    <div className="p-4 min-h-screen">
        <Header/>
        <SidebarIndex/>
        <Outlet/>
    </div>
  )
}

export default ProfileLayout
