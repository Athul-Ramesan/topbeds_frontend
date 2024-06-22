import React from 'react';

const Listing = () => {
  return (
    <div className="p-4">
        



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-56">
          <div className="h-1/2 overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 h-1/2 flex flex-col justify-between">
            <h2 className="text-lg font-semibold">New movie is released!</h2>
            <p className="text-gray-600">Click the button to watch on Jetflix app.</p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Watch
              </button>
            </div>
          </div>
        </div>
        
        {/* Repeat the card for multiple items */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-56">
          <div className="h-1/2 overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 h-1/2 flex flex-col justify-between">
            <h2 className="text-lg font-semibold">New movie is released!</h2>
            <p className="text-gray-600">Click the button to watch on Jetflix app.</p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Watch
              </button>
            </div>
          </div>
        </div>

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default Listing;
