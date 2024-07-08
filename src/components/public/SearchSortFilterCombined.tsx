import { ChangeEvent, FC, FormEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import getCityByCountry from '../../utils/locationAPI/getCityByCountry';
import { ICitiesWithId } from '../searchBar/SearchInterface';
import { debounce, filter } from 'lodash'
import { axiosInstance } from '../../config/instances';
import { IProperty } from '../../interface/IProperty';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../pages/LoadingSpinner';

interface SearchSortFileterCombinedProps {
    isOpen: boolean;
    onClose: () => void
}

const SearchSortFilterCombined: FC<SearchSortFileterCombinedProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [locationSuggestion, setLocationSuggestion] = useState<string[]>([])
    const [filters, setFilters] = useState({
        location: '',
        startDate: '',
        endDate: '',
        guests: 1,
        minPrice: '',
        maxPrice: '',
        category: '',
    });
    const navigate= useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [results, setResults] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // if(e.target.type==='number'){
        //     const isNumber = isNumeric(e.target.value)
        //     if(!isNumber){
        //         return setErrorMessage('Type only numbers')
        //     }
        // }
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('clicked search button')
        try {
            setLoading(true)
            const response = await axiosInstance.get('/property/search', { params: filters });
            console.log("🚀 ~ handleSearch ~ response:", response)
            setResults(response.data);
            onClose()
            setTimeout(() => {
                setLoading(false)
                navigate('/index/searchResult',{state: response.data})
            }, 2000);
        } catch (error) {
            console.error('Error searching properties:', error);
            setLoading(false)
        }
    };
    let cachedCities: ICitiesWithId[] = []
    const fetchLocationSuggestions = async (query: string) => {
        if (query.length < 2) {
            return setLocationSuggestion([])
        }

        try {
            if (cachedCities.length === 0) {
                cachedCities = await getCityByCountry()
            }
            const filteredCities = cachedCities.filter((city) => {
                return city.name.toLowerCase().includes(query.toLowerCase())
            })
            console.log("🚀 ~ filteredCities ~ filteredCities:", filteredCities)
            const suggestions = filteredCities.map((city) => {
                return city.name
            })
            setLocationSuggestion(suggestions)
        } catch (error: any) {
            console.error("Error fetching location suggestions:", error);
            setLocationSuggestion([]);
        }
    }
    const handleLocationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFilters({ ...filters, location: value })
        debouncedFetchLocationSuggestions(value)
    }

    useEffect(() => {
        return () => {
            setErrorMessage('')
        }
    }, [])

   
    const debouncedFetchLocationSuggestions = useCallback(
        debounce(fetchLocationSuggestions, 300),
        []
    );
    const handleSuggestionClick = (selectedCity: string) => {
        setFilters(prev => ({ ...prev, location: selectedCity }));
        setLocationSuggestion([]);
    };
    const getCurrentDate = (): string => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    const todayDate = getCurrentDate()
    if(loading){
        return <LoadingSpinner/>
    }
    return (
        <div
            className=" fixed flex items-center justify-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white border-x border-primaryColor border-b rounded-b-lg shadow-lg"
                    >
                        <form onSubmit={handleSearch} className="p-4 space-y-4">
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={filters.location}
                                onChange={handleLocationInputChange}
                                className="w-full p-2 border rounded  placeholder:text-primaryColor border-primaryColor outline-none text-primaryColor "
                            />
                            {locationSuggestion.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {locationSuggestion.map((city, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-700"
                                            onClick={() => handleSuggestionClick(city)}
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex space-x-4 ">
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleInputChange}
                                    className="w-1/2 p-2 border rounded   placeholder:text-primaryColor border-primaryColor outline-none"
                                    min={todayDate}
                                />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={handleInputChange}
                                    className="w-1/2 p-2 border rounded  placeholder:text-primaryColor border-primaryColor outline-none"
                                    min={filters.startDate}
                                />
                            </div>
                            <input
                                type="number"
                                name="guests"
                                placeholder="Guests"
                                value={filters.guests}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full p-2 border rounded  border-primaryColor outline-none"
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min Price"
                                    value={filters.minPrice}
                                    onChange={handleInputChange}
                                    className="w-1/2 p-2 border rounded  border-primaryColor outline-none "
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max Price"
                                    value={filters.maxPrice}
                                    onChange={handleInputChange}
                                    className="w-1/2 p-2 border rounded  border-primaryColor outline-none "
                                />
                            </div>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded  border-primaryColor outline-none placeholder:text-green-300"
                            >
                                <option value="">Select Category</option>
                                <option value="House">House</option>
                                <option value="Resort">Resort</option>
                                <option value="Cabin">Cabin</option>
                                <option value="Apartment">Apartment</option>
                            </select>
                            <button type="submit" className="w-full bg-primaryColor text-white p-2 rounded hover:text-green-100">
                                Search
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            
        </div>
    );
};

export default SearchSortFilterCombined;