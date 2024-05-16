import { FaBedPulse } from "react-icons/fa6";
import DropDown from "./DropDown";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopbedsLogo from "./TopbedsLogo";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector(state => state.user)

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <DropDown isOpen={isOpen} toggleDropDown={toggleDropDown} setIsOpen={setIsOpen} />
      <header className="flex justify-between">

        <TopbedsLogo />
        <div className="flex gap-2 border border-gray-500  rounded-full shadow-sm py-2 px-4 shadow-gray-400">
          <div>Anywhere</div>
          <div className="border-l border-gray-300 p-2 "></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primaryColor rounded-full text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        {user && (
          <>
            <Link to={'/user/become-host'}>Become host?</Link>
            <Link to={"/host/dashboard"}>Host Profile</Link>
          </>
        )}

        {!user && (
          <>
            <div className="flex gap-4 items-center">
              <Link className="hover:bg-primaryColor rounded-lg duration-200 transition-all  p-1  hover:text-white" to={'/index/about'}>About</Link>
              <Link to={'/auth/login'}>SignIn</Link>
            </div>
          </>
        )}

        {user && (
          <div onClick={toggleDropDown} className="flex items-center gap-2 border border-gray-500  rounded-full py-2 px-2 shadow-sm shadow-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <div className="bg-gray-500 text-white  rounded-full p-1 w-6 h-6 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>


            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header