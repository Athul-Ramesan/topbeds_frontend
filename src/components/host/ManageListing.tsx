import { useContext, useState } from "react";
import PropertyList from "./PropertyList";
import { HostPropertiesContext } from "../../context/HostPropertiesContext";
import { useNavigate } from "react-router-dom";
import { BiFilter} from "react-icons/bi";
import ToolTipAtBottom from "../ToolTipBottom";
import { MdAdd } from "react-icons/md";
import EmptyItemMessage from "./EmptyItemMessage";


// c

const ManageListing = () => {
  
  const { hostProperties } = useContext(HostPropertiesContext)
  const [showFilterToolTip,setShowFilterToolTip] = useState(false)
  const [showAddToolTip,setShowAddToolTip] = useState(false)

  const navigate = useNavigate()
  console.log("🚀 ~ ManageListing ~ hostProperties:", hostProperties)


  const handleClickAddIcon =()=>{
    navigate('/host/add-property')
  }
  const handleClickFilterIcon = ()=>{
    
  }
  if(!hostProperties || hostProperties.length===0){
    return (
      <>
      <div className="flex justify-center items-center w-full m-20">
      <EmptyItemMessage/>
      </div>
      </>
    )
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
          toolTipText="add"
          showToolTip={showAddToolTip}
          />
         </div>


          

        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Manage Listings</h2>

      {/* Listings Cards */}
      <PropertyList properties={hostProperties} />
    </div>
  );
};

export default ManageListing;
