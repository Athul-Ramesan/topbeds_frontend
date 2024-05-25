import { NavLink } from "react-router-dom"
import TopbedsLogo from "../TopbedsLogo"
import {RiCalendarTodoLine, RiDashboardLine, RiListSettingsLine, RiMailLine, RiMoneyDollarCircleLine, RiStarLine, RiUserSettingsLine} from "react-icons/ri"
import SideBarNav from "./SideBarNav"

const HostSideBar = () => {

  return (
    <div className=" ">
    <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100 ">
      <TopbedsLogo/>
    </div>
    <div className="text-gray-600 font-semibold mt-5">
      <p className="side-nav-sub-title">Menu</p>
      <div className="">
        
      <SideBarNav navItem={"Dashboard"}  icon={<RiDashboardLine/>} linkTo="/host/dashboard"/>
      <SideBarNav navItem={"Listing"}  icon={<RiListSettingsLine />} linkTo="/host/manage-listing"/>
      <SideBarNav navItem={"Reservations"}  icon={<RiCalendarTodoLine />} linkTo="/host/reservations"/>
      <SideBarNav navItem={"Inbox"}  icon={<RiMailLine />} linkTo="/host/inbox" />
      <SideBarNav navItem={"Reviews"}  icon={<RiStarLine />} linkTo="/host/reviews"/>
      <SideBarNav navItem={"Earnings"}  icon={<RiMoneyDollarCircleLine />} linkTo="/host/Earnings"/>
      <SideBarNav navItem={"Account Settings"}  icon={<RiMoneyDollarCircleLine />} linkTo="/host/account-settings"/>
      </div>
    </div>
    </div>
  )
}

export default HostSideBar
