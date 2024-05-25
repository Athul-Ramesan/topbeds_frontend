import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { axiosInstance } from "../../config/instances";
import { IProperty } from "../../interface/IProperty";
import PropertyList from "./PropertyList";
import { HostPropertiesContext } from "../../context/HostPropertiesContext";
import { useNavigate } from "react-router-dom";
import { BiFilter} from "react-icons/bi";
import ToolTipAtBottom from "../ToolTipBottom";
import { MdAdd } from "react-icons/md";


// c

const ManageListing = () => {
  const { user } = useAppSelector(state => state.user)
  const [properties, setProperties] = useState<IProperty[]>([])
  const { hostProperties, setHostProperties } = useContext(HostPropertiesContext)
  const [showFilterToolTip,setShowFilterToolTip] = useState(false)
  const [showAddToolTip,setShowAddToolTip] = useState(false)

  const navigate = useNavigate()
  console.log("🚀 ~ ManageListing ~ hostProperties:", hostProperties)

  console.log("🚀 ~ ManageListing ~ properties:", properties)

  console.log("🚀 ~ ManageListing ~ user:", user)
  const userId = user?._id
  //need to change the userId to hostId
  useEffect(() => {
    axiosInstance.get(`/property/get-host-properties/${userId}`)
      .then(data => {
        setProperties(data.data)
        setHostProperties(data.data)
        console.log("🚀 ~ useEffect ~ data:", data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleClickAddIcon =()=>{
    navigate('/host/add-property')
  }
  const handleClickFilterIcon = ()=>{
    
  }
  return (
    <div className="w-full p-4">
      {/* Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search listings..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 md:mb-0"
        />
        <div className="flex space-x-2">
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Filter</button> */}
         <div className="relative">
         <BiFilter
         size={40}
          onMouseEnter={()=>{
            setShowFilterToolTip(true)
          }}
          onMouseLeave={()=>{
            setShowFilterToolTip(false)
          }}
         onClick={handleClickFilterIcon}
          />
          <ToolTipAtBottom
          toolTipText="filter"
          showToolTip={showFilterToolTip}
          />
         </div>


         <div className="relative">
         <MdAdd 
         size={40}
          onMouseEnter={()=>{
            setShowAddToolTip(true)
          }}
          onMouseLeave={()=>{
            setShowAddToolTip(false)
          }}
          onClick={handleClickAddIcon}
          />
          <ToolTipAtBottom
          toolTipText="add property"
          showToolTip={showAddToolTip}
          />
         </div>


          

        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Manage Listings</h2>

      {/* Listings Cards */}
      <PropertyList properties={properties} />
    </div>
  );
};

export default ManageListing;
