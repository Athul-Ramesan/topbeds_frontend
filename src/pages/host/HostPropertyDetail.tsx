
import { useContext } from "react";
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext";
import HostPropertySingleDetail from "../../components/host/HostPropertySingleDetail";

const HostPropertyDetail = () => {
    const{hostProperty } = useContext(HostPropertySingleContext)
    console.log("🚀 ~ HostPropertyDetail ~ hostProperty:", hostProperty)
    
  return (
    <>
    <div className=" flex flex-col gap-2  p-4 h-[410px] overflow-y-scroll overf mt-6 mx-5">
      <HostPropertySingleDetail contentHead="Photos" contentText={`${hostProperty.images.length}`} />
      <HostPropertySingleDetail contentHead="Title" contentText={`${hostProperty.title}`} />
      <HostPropertySingleDetail contentHead="Description" contentText={`${hostProperty.description}`} />
      <HostPropertySingleDetail contentHead="Price" contentText={`${hostProperty.price}`} />
      <HostPropertySingleDetail contentHead="Amenities" contentText={`${hostProperty.amenities}`} />
      <HostPropertySingleDetail contentHead="Bathrooms" contentText={`${hostProperty.bathrooms}`} />
      <HostPropertySingleDetail contentHead="Bedrooms" contentText={`${hostProperty.bedrooms}`} />
      <HostPropertySingleDetail contentHead="Max-guests" contentText={`${hostProperty.maxGuests}`} />
      {/* <HostPropertySingleDetail contentHead="Bedrooms" contentText={`${hostProperty.maxGuests}`} /> */}
    </div>
    </>
  )
}

export default HostPropertyDetail
