import { Link, useNavigate } from "react-router-dom";

const EmptyItemMessage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center  py-10 w-full bg-gray-100 text-center rounded-lg shadow-lg mx-4">
          <div className="mb-4 text-4xl text-gray-700 font-bold"> 📭</div>
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            List is empty
          </h2>
          <p className="mb-4 text-gray-600">
            Earn more by adding your property by clicking the{" "}
            <span className="text-primaryColor font-semibold">Add Property</span>{" "}
            button.
          </p>
          <p className="text-gray-500">
            Enjoy the host community.
          </p>
          <button 
          onClick={()=>{
            console.log('button clicked add-property on emptyitemmessage component')
            navigate('/host/add-property')
          }} className="mt-6 px-6 py-2 bg-primaryColor text-white rounded-lg shadow hover:bg-primaryDarkColor transition-all duration-300 ease-in-out">
            Add Property
          </button>
        </div>
      );
}

export default EmptyItemMessage
