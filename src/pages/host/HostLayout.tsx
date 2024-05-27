import { Outlet } from "react-router-dom"
import HostSideBar from "../../components/host/HostSideBar"
import SmallDeviceNavnbar from "../../components/host/SmallDeviceNavnbar"
import HostPropertiesProvider from "../../context/HostPropertiesContext"
import HostPropertySingleProvider from "../../context/HostPropertySingleContext"


const HostLayout = () => {
  return (
    <div>
      {/* small device  */}
    <HostPropertiesProvider>
    <HostPropertySingleProvider>
    <div className="flex lg:flex-row flex-col  relative">
      <SmallDeviceNavnbar/>
      {/* side bar here */}
      <div className="hidden w-1/5 lg:block px-5 py-3 flex-shrink-0 border-r sticky left-0 top-0 h-screen border-r-gray-300">

      <HostSideBar/>
      </div>
      <Outlet/>
    </div>
    </HostPropertySingleProvider>
    </HostPropertiesProvider>
    </div>
  )
}

export default HostLayout
