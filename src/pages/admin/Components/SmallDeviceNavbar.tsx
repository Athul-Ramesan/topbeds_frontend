import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import TopbedsLogo from "../../../components/TopbedsLogo";
import SideNavbar from "./SideNavbar";

const SmallDeviceNavbar = () => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const toggleSideNavbar = () => {
    console.log('show navbar clicked')
    setShowSideNavbar(!showSideNavbar);
  };

  return (
    <div className="lg:hidden p-5 shadow-lg z-10 flex items-center justify-between">
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <TopbedsLogo />
      </div>
      <div
        className="text-xl text-gray-500 active:text-black"
        onClick={toggleSideNavbar}
      >
        <GiHamburgerMenu />
      </div>

      <div
        className={`side-navbar-admin ${
          showSideNavbar ? "show" : ""
        } absolute top-0 left-0  bg-opacity-40`}
        onClick={toggleSideNavbar}
      >
        <div className="h-screen w-fit bg-gray-100 px-5 py-3 flex-shrink-0 border-r border-r-gray-300 shadow-lg pt-5">
          <SideNavbar />
        </div>
      </div>
    </div>
  );
};

export default SmallDeviceNavbar;
