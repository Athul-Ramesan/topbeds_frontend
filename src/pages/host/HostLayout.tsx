import { Outlet } from "react-router-dom"
import HostSideBar from "../../components/host/HostSideBar"
import SmallDeviceNavnbar from "../../components/host/SmallDeviceNavnbar"

const HostLayout = () => {
  return (
    <div>
      {/* small device  */}

    <div className="flex lg:flex-row flex-col overflow-y-hidden h-screen bg-gray-100">
      <SmallDeviceNavnbar/>
      {/* side bar here */}
      <div className="hidden lg:block px-5 py-3 flex-shrink-0 border-r border-r-gray-300">

      <HostSideBar/>
      </div>
      <Outlet/>
    </div>
    </div>
  )
}

export default HostLayout
