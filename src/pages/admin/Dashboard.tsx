import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import SmallDeviceNavbar from "./components/SmallDeviceNavbar";
import SideNavbar from "./components/SideNavbar";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex lg:flex-row flex-col overflow-y-hidden h-screen bg-gray-100 font-mono">
      <SmallDeviceNavbar />
      <div className="hidden lg:block px-5 py-3 flex-shrink-0 border-r border-r-gray-300">
        <SideNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
