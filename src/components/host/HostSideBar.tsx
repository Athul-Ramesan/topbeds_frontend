import { NavLink } from "react-router-dom"
import TopbedsLogo from "../TopbedsLogo"
import {RiDashboardLine} from "react-icons/ri"
import SideBarNav from "./SideBarNav"

const HostSideBar = () => {
  return (
    <>
    <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100 ">
      <TopbedsLogo/>
    </div>
    <div className="text-gray-600 font-semibold mt-5">
      <p className="side-nav-sub-title">Menu</p>
      <div className="">
        
      <SideBarNav navItem={"Dashboard"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Manage Listing"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Reservations"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Inbox"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Reviews"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Earnings"}  icon={<RiDashboardLine/>} />
      <SideBarNav navItem={"Account Settings"}  icon={<RiDashboardLine/>} />
      </div>
    </div>
    </>
  )
}

export default HostSideBar
