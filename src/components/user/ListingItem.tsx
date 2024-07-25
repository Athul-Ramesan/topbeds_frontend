import React from 'react';

const ListingItem: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img
                src="path-to-listing-image.jpg"
                alt="Listing"
                className="w-full h-32 object-cover rounded-md"
            />
            <h4 className="text-lg font-semibold mt-2">Luxary Restaurant</h4>
            <p className="text-gray-500">27th Brooklyn, New York, USA</p>
            <div className="flex items-center mt-2">
                <span className="text-yellow-500 mr-2">4.8</span>
                <span className="text-gray-500">rating</span>
            </div>
        </div>
    );
};

export default ListingItem;
