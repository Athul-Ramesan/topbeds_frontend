import { NavLink, useNavigate } from "react-router-dom";

import { RiDashboardLine } from "react-icons/ri";
import { FiBox, FiLogOut } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { AiOutlineTags } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { useAppDispatch } from "../../../redux/store";
import TopbedsLogo from "../../../components/TopbedsLogo";
import { userLogoutAction } from "../../../redux/actions/userActions";

const SideNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate("/auth/login");
  };

  return (
    <>
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <TopbedsLogo />
      </div>
      <div className="text-gray-600 font-semibold mt-5">
        <p className="side-nav-sub-title">Menu</p>
        <NavLink className="side-nav-link-sp-admin" to="/admin/">
          <RiDashboardLine />
          Dashboard
        </NavLink>
        
        <NavLink className="side-nav-link-sp-admin" to="listing">
          <FiBox />
          Listing
        </NavLink>
        {/* <NavLink className="side-nav-link-sp-admin" to="bookings">
          <BsCardChecklist />
          Bookings
        </NavLink> */}

        <NavLink className="side-nav-link-sp-admin" to="subscription">
          <ImStack />
          Subscription
        </NavLink>

        <NavLink className="side-nav-link-sp-admin" to="property">
          <AiOutlineTags />
          Property
        </NavLink>
        
        <p className="side-nav-sub-title">User Management</p>
        
        <NavLink className="side-nav-link-sp-admin" to="users">
          <FaUsers />
          Users
        </NavLink>
        <NavLink className="side-nav-link-sp-admin" to="hosts">
          <FaUsers />
          Hosts
        </NavLink>
        <p className="side-nav-sub-title">Other</p>
        {/* <NavLink className="side-nav-link-sp-admin" to="settings">
          <FiSettings />
          Settings
        </NavLink> */}
        <p
          className="side-nav-link-sp-admin cursor-pointer w-full"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </p>
      </div>
    </>
  );
};

export default SideNavbar;
