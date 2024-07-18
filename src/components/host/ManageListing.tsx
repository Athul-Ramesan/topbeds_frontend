import { useContext, useEffect, useState } from "react";
import PropertyList from "./PropertyList";
import { HostPropertiesContext } from "../../context/HostPropertiesContext";
import { useNavigate } from "react-router-dom";
import ToolTipAtBottom from "../ToolTipBottom";
import { MdAdd } from "react-icons/md";
import EmptyItemMessage from "./EmptyItemMessage";


// c

const ManageListing = () => {

  const { hostProperties } = useContext(HostPropertiesContext)
  const [loading, setLoading] = useState(false)
  const [showAddToolTip, setShowAddToolTip] = useState(false)

  const navigate = useNavigate()
  console.log("🚀 ~ ManageListing ~ hostProperties:", hostProperties)


  const handleClickAddIcon = () => {
    navigate('/host/add-property')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!hostProperties || hostProperties.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center w-full m-20">
          <EmptyItemMessage />
        </div>
      </>
    )
  }
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="skeleton h-32 w-32"></div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full p-4">
      {/* Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row justify-end items-center">
        {/* <input
          type="text"
          placeholder="Search listings..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 md:mb-0"
        /> */}
        <div className="flex space-x-2">
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Filter</button> */}
          {/* <div className="relative">
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
         </div> */}


          <div className="relative">
            <MdAdd
              size={40}
              onMouseEnter={() => {
                setShowAddToolTip(true)
              }}
              onMouseLeave={() => {
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
