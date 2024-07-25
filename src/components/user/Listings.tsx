import React from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import ListingItem from './ListingItem';

const Listings: React.FC = () => {
    return (
        <div className="mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Listings by: Alisa Noory</h3>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <FaSortAmountDown />
                    <span>Sort by:</span>
                    <select className="px-2 py-1 border rounded-md">
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="price_asc">Price Low to High</option>
                        <option value="price_desc">Price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ListingItem />
                <ListingItem />
                {/* Add more ListingItem components as needed */}
            </div>
        </div>
    );
};

export default Listings;
