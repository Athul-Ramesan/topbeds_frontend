import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { axiosInstance } from "../../config/instances";

const properties = [
  {
    id: 1,
    title: "Cozy Cottage",
    description: "A charming cottage with a beautiful lake view.",
    status: "Active",
    image: "https://via.placeholder.com/150",
    price: "$120/night",
  },
  {
    id: 2,
    title: "Modern Apartment",
    description: "A stylish apartment in the city center.",
    status: "Inactive",
    image: "https://via.placeholder.com/150",
    price: "$150/night",
  },
  // Add more properties as needed
];

const ManageListing = () => {
  const {user} = useAppSelector(state=> state.user)
  console.log("🚀 ~ ManageListing ~ user:", user)
  const userId  = user?._id
  //need to change the userId to hostId
  useEffect(()=>{
    axiosInstance.get(`/get-host-properties/${userId}`)
      .then(data=>{
        console.log(data);
      })
      .catch(err=>{
        console.log(err); 
        })
  },[])
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
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Filter</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add New Listing</button>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Manage Listings</h2>

      {/* Listings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white p-4 rounded shadow">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold mb-2">{property.title}</h3>
            <p className="text-gray-700 mb-2">{property.description}</p>
            <p className="text-gray-700 font-semibold mb-2">{property.price}</p>
            <p className={`mb-2 ${property.status === "Active" ? "text-green-500" : "text-red-500"}`}>{property.status}</p>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">Edit</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hide from Listing</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageListing;
