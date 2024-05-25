import { useState } from "react"
import TopbedsLogo from "../TopbedsLogo"
import {GiHamburgerMenu} from "react-icons/gi"
import HostSideBar from "./HostSideBar"

const SmallDeviceNavnbar = () => {
    const [showSideNavbar,setShowSideNavbar] = useState(false)
    const toggleSideNavbar = ()=>{
        setShowSideNavbar(!showSideNavbar)
    }
  return (
    <div className="lg:hidden bg-bg-minimal h-20 p-5 shadow-lg z-10 flex items-center justify-between">
        <div className="flex  cursor-pointer opacity-70 hover:opacity-100">
        <TopbedsLogo/>
        </div>
        <div className=" text-xl text-gray-500 active:text-black"
        onClick={toggleSideNavbar}
        >
            <GiHamburgerMenu/>
        </div>

        <div className={`side-navbar-host ${showSideNavbar ? "show" : ""} absolute top-0 left-0 bg-opacity-40`}
        onClick={toggleSideNavbar}
        >
         
         <div className="h-screen w-fit  bg-gray-100 px-5 py-3 flex-col items-center flex-shrink-0 border-r border-r-gray-300 shadow-lg pt-5">
         <HostSideBar/>
            </div>   
        </div>
    </div>
  )
}

export default SmallDeviceNavnbar
