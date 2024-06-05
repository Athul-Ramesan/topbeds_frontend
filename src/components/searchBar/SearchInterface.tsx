import React, { useState } from 'react';
import DropDownCommon from '../DropDownCommon';
import { FaSortAmountDown } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineCollectionsBookmark } from "react-icons/md";



interface Category {
    name: string;
    image: string;
    listings: number;
}

const categories: Category[] = [
    { name: 'Apartment', image: '/1.jpg', listings: 10 },
    { name: 'Apartment', image: '/1.jpg', listings: 10 },

];
interface SearchInterfaceProps {
    setCategory: (category:string) => void;
    setPriceRange: (priceRange:string) => void;
    setLocation: (location:string) => void;
    setGuestCount: (guestCount:string) => void;
}
const SearchInterface: React.FC<SearchInterfaceProps> = ({setCategory,setGuestCount,setLocation,setPriceRange}) => {
    const [isFilter, setIsFilter] = useState(true)

    const handleFilterClick = () => {
        setIsFilter(true)
    }
    const handleCategoryClick = () => {
        setIsFilter(false)
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <span className='text-lg font-semibold'>Search Result for: </span>
                <div className='flex justify-end items-center gap-4'>
                    <FaSortAmountDown />
                    <span className=''>Sort by :</span>
                    <select className='px-2' name="" id="">
                        <option className='' value="">Popularity</option>
                        <option value="">Rating</option>
                        <option value="">Price Low to High</option>
                        <option value="">Price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="mb-8">
                <div className='flex gap-1'>
                    <div
                        onClick={handleFilterClick}
                        className="text-lg w-1/2  flex gap-2 justify-center bg-bg-300 font-semibold mb-2 items-center py-2 cursor-pointer">
                        <HiAdjustmentsHorizontal />
                        <span>Filter</span>
                    </div>
                    <div
                        onClick={handleCategoryClick}
                        className="text-lg w-1/2  flex gap-2 justify-center bg-bg-300 font-semibold mb-2 items-center py-2 cursor-pointer">
                        <MdOutlineCollectionsBookmark />
                        <span> Categories</span>
                    </div>
                </div>
                {/* Add filter options */}
                <div className=''>
                    {isFilter ? (

                        <div className='md:px-6 px-2 grid grid-cols-2 md:grid-cols-4'>
                            <DropDownCommon setItem={setCategory} heading='categories' list={["Apartments", "Resorts", "House", "Cabin"]} />
                            <DropDownCommon setItem={setPriceRange} heading='price-range' list={["500-1500", '1500-2500', "2500-3500", "3500 and Above"]} />
                            <DropDownCommon setItem={setLocation} heading='location' list={['']} />
                            <DropDownCommon setItem={setGuestCount} heading='No of guests' list={['1', '2', '3', '4', '5', '6', '7', '8', '9']} />
                        </div>
                    )
                        :
                        (

                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.map((category) => (
                                        <div key={category.name} className="bg-white rounded shadow p-4">
                                            <img src={category.image} alt={category.name} className="w-full h-40 object-cover mb-2" />
                                            <h3 className="text-lg font-semibold">{category.name}</h3>
                                            <p className="text-gray-500">{category.listings} listings</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchInterface;