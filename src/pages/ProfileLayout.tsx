import { Outlet } from "react-router-dom"
import SidebarIndex from "../components/SideBar/SidebarIndex"


const ProfileLayout = () => {
  return (
    <div className="p-4 min-h-screen">
        <SidebarIndex/>
        <Outlet/>
    </div>
  )
}

export default ProfileLayout
