import ProfileSideBar from "./ProfileSideBar"
import SidebarItem from "./SidebarItem"
import {UserCircle,LifeBuoy,Receipt,LayoutDashboard} from "lucide-react"
const SidebarIndex = () => {
  return (
    <div className="w-1/5">
    <ProfileSideBar>
        <SidebarItem icon={<LayoutDashboard size={20}/>} active text={"Option1"}  />
        <SidebarItem icon={<LayoutDashboard size={20}/>} text={"Option1"}  />
        <SidebarItem icon={<LayoutDashboard size={20}/>} text={"Option1"}  alert/>
    </ProfileSideBar>
    </div>
  )
}

export default SidebarIndex
