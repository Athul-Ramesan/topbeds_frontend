import React, { ChangeEvent, useEffect, useState } from 'react';
import DropDownCommon from '../DropDownCommon';
import { FaSortAmountDown } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import getCityByCountry from '../../utils/locationAPI/getCityByCountry';



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
    setCategory: (category: string) => void;
    setPriceRange: (priceRange: string) => void;
    setLocation: (location: string) => void;
    setGuestCount: (guestCount: string) => void;
    setSortOption: (sortOption: string) => void
    searchQuery: string
}
export interface ICitiesWithId {
    id: number;
    name: string;
}


const SearchInterface: React.FC<SearchInterfaceProps> = ({ setCategory, setGuestCount, setLocation, setPriceRange, setSortOption, searchQuery }) => {
    const [isFilter, setIsFilter] = useState(true)
    const [cities,setCities] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>('')
    const [selectedValue,setSelectedValue] = useState('')

    useEffect(() => {

        const getCities = async () => {
            setLoading(true)
            setError('')
            try {
                const ArrayOfcities = await getCityByCountry()
                const result =  ArrayOfcities.map(item=> item.name)
                setCities(result)
            } catch (error: any) {
                setError('Failed to fetch cities');
                console.error('Error fetching cities:', error);
            }finally{
                setLoading(false)
            }
        }

        getCities()


    }, [])
    const handleFilterClick = () => {
        setIsFilter(true)
    }
    const handleCategoryClick = () => {
        setIsFilter(false)
    }
    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value)
    }
    const handleSetLocation = (e:ChangeEvent<HTMLSelectElement>)=>{
        setLocation(e.target.value)
        setSelectedValue(e.target.value)
    }
    return (
        <div className="container mx-auto px-4 py-8 bg-blue-300">
            <div className="flex justify-between items-center mb-4">
                {searchQuery ? (

                    <span className='text-lg font-semibold'>Search Result for:
                        <span className='text-font-color-200 text-md px-4'> {searchQuery}</span>
                    </span>
                )
                    :
                    (
                        <span className='text-lg font-semibold'> </span>
                    )}
                <div className='flex justify-end items-center gap-4'>
                    <FaSortAmountDown />
                    <span className=''>Sort by :</span>
                    <select className='px-2' name="" id="" onChange={handleSortChange} >
                        <option className='' value="">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="price_asc">Price Low to High</option>
                        <option value="price_desc">Price High to Low</option>
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
                            <DropDownCommon setItem={setCategory} heading='categories' list={["Apartment", "Resort", "House", "Cabin"]} />
                            <DropDownCommon setItem={setPriceRange} heading='price-range' list={["500-1500", '1500-2500', "2500-3500", "3500 and Above"]} />
                            {loading ? (
                                <div>
                                    ....loading cities
                                </div>
                            ):(
                                <>

                                <select className='bg-leafBackground-200 border-b-[1px] border-black focus:border-none h-14' onChange={handleSetLocation} value={selectedValue}>
                                    <option value="">
                                        Location
                                    </option>
                                        {cities.map((city,index)=>(
                                            <option key={index} value={city}>{city}</option>
                                            ))}
                                </select>
                                    </>
                              
                            )
                        }
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