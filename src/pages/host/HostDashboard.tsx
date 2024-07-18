import { useContext, useEffect, useState } from "react";
import { HostPropertiesContext } from "../../context/HostPropertiesContext";
import {  bookingApiInstance, propertyApiInstance } from "../../config/instances";
import { useAppSelector } from "../../redux/store";



const HostDashboard = () => {
    const {hostProperties,setHostProperties} = useContext(HostPropertiesContext)
    const { user } = useAppSelector(state => state.user)
    const [totalReservations, setTotalReservations] = useState(0)
    const [totalEarnings, setTotalEarnings] = useState(0)
    const [totalProperties, setTotalProperties] = useState(0)
    const [loading , setLoading] = useState(false)
    console.log("🚀 ~ HostDashboard ~ hostProperties:", hostProperties)
    useEffect(() => {
      propertyApiInstance.get(`/get-host-properties/${user?._id}`)
        .then(data => {
          setHostProperties(data.data.reverse())
          console.log("🚀 ~ useEffect ~ data:", data)
        })
        .catch(err => {
          console.log(err);
        })
    }, [])
    useEffect(()=>{
      const fetchReservationData =async()=>{
        const response = await bookingApiInstance.get('/dashboard/host-reservations')
        console.log("🚀 ~ fetchReservationData ~ response:", response)
        if(response.statusText==="OK"){
          const hostsWithTotalData = response.data
          const currentHostTotalData = hostsWithTotalData.find((host:any)=> host._id ===user?._id)
           console.log("🚀 ~ fetchReservationData ~ currentHostTotalData:", currentHostTotalData)
           setTotalReservations(currentHostTotalData.totalReservations)
           setTotalEarnings(currentHostTotalData.totalEarnings)
          setTotalProperties(currentHostTotalData.totalProperties)
            console.log("🚀 ~ fetchReservationData ~ response.data:", response.data)
          }
      }
      fetchReservationData()
    },[])
    if (loading) {
      return (
        <div className="m-10 w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="skeleton h-56 w-full"></div>
          ))}
        </div>
      );
    }
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Host Dashboard</h2>
          <p className="text-gray-600">Manage your properties and reservations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Properties</h3>
            <p className="text-3xl font-bold text-primaryColor">{hostProperties.length}</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Reservations</h3>
            <p className="text-3xl font-bold text-primaryColor">{totalReservations}</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Earnings</h3>
            <p className="text-3xl font-bold text-primaryColor">₹ {totalEarnings}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-md">
              <span className="w-8 h-8 bg-primaryColor text-white flex items-center justify-center rounded-full">P</span>
              <div>
                <p className="text-gray-700 font-semibold">New Property Added</p>
                <p className="text-gray-500 text-sm">2 days ago</p>
              </div>
            </li>
            <li className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-md">
              <span className="w-8 h-8 bg-primaryColor text-white flex items-center justify-center rounded-full">R</span>
              <div>
                <p className="text-gray-700 font-semibold">New Reservation</p>
                <p className="text-gray-500 text-sm">1 day ago</p>
              </div>
            </li>
            <li className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-md">
              <span className="w-8 h-8 bg-primaryColor text-white flex items-center justify-center rounded-full">R</span>
              <div>
                <p className="text-gray-700 font-semibold">New Review Received</p>
                <p className="text-gray-500 text-sm">5 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HostDashboard;
