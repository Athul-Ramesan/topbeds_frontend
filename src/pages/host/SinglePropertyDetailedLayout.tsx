import { FaArrowLeft } from "react-icons/fa6";
import { NavLink, Outlet, useParams } from "react-router-dom";
import SmallNav from "../../components/host/SmallNav";
import HostPropertySingleDetail from "../../components/host/HostPropertySingleDetail";
import HostPropertyDetail from "./HostPropertyDetail";
import { useContext, useEffect } from "react";
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext";

const SinglePropertyDetailedLayout = () => {
    const { propertyId } = useParams()
    
    return (
        <>
        
            
            <div className="flex justify-between w-full px-10">
                <div className="mt-28  w-1/2 border-r-2 border-gray-300">

                    {/* heading area */}
                    <div className="flex items-center p-3 gap-1">
                        <div className="inline-block hover:bg-gray-300 rounded-full">
                            <FaArrowLeft size={30} className="p-1" />
                        </div>
                        <h1 className="text-2xl text-gray-700 font-semibold">Listing Editor</h1>
                    </div>
                    {/* heading area ends */}

                    {/* nav */}
                    <div className="flex rounded-2xl justify-between px-0.5 py-0.5  mx-12 ">
                        <SmallNav />
                    </div>
                    <div>
                        <HostPropertyDetail/>
                    </div>
                </div>
                <div className="mt-28 w-1/2">
                        <Outlet/>
                </div>
            </div>

        
        </>
    )
}

export default SinglePropertyDetailedLayout
