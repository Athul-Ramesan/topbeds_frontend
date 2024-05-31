import { FC, useContext } from "react"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import {  NavLink, useParams } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io"

interface HostPropertySingleDetailProps {
    contentHead: string,
    contentText: string
}

const HostPropertySingleDetail:FC <HostPropertySingleDetailProps> = ({contentHead,contentText}) => {
    const {propertyId} = useParams()
    

  return (
    <div className="border-[1.5px] p-3 hover:scale-105 transition-transform transform duration-500 border-gray-600 rounded-xl shadow-sm hover:shadow-xl flex-column justify-center items-center ">
      <NavLink to={`/host/manage-listing/${propertyId}/${contentHead.toLowerCase()}`} >
        <div className="flex justify-between px-4 pt-3 mt-0">
        <p className="text-xl font-semibold text-font-accent">{contentHead}</p>
        <IoIosArrowForward  size={25} className="text-font-accent"/>
        </div>
        <p className="px-4">{contentText} {contentHead === "Description" || contentHead === "Title" ||  contentHead === "Price" ||  contentHead === "House Rules" || contentHead === "Amenities" ? "" : contentHead.toLowerCase()}</p>
      </NavLink>
      </div>
  )
}

export default HostPropertySingleDetail
