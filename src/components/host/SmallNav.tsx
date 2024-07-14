import {  useParams } from "react-router-dom"

const SmallNav = () => {
    // const {propertyId} = useParams()
    return (
        <>
        <p  className=" w-full flex justify-center hover:scale-90 rounded-3xl text-lg font-semibold transition-transform transform duration-500 hover:bg-gray-200">Your space</p>
            {/* <NavLink className=" w-1/2 flex justify-center hover:scale-90 rounded-3xl transition-transform transform duration-500 hover:bg-gray-200" to={`/host/manage-listing/${propertyId}/details`}>
                <p className="text-lg font-semibold"> Your space </p>
            </NavLink> */}  
            {/* <NavLink className=" w-1/2 flex justify-center rounded-3xl hover:scale-90 transition-transform transform duration-500 hover:bg-gray-200 " to={`/host/manage-listing/${propertyId}/arrival`}>
                <p className="text-lg font-semibold"> Arrival guid </p>
            </NavLink> */}
        </>
    )
}

export default SmallNav
