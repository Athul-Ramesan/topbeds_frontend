import { useEffect, useState } from "react"
import { axiosInstance } from "../../config/instances"
import ImageCard from "../../components/public/ImageCard"
import LoadingSpinner from "../LoadingSpinner"
import Pagination from "../../components/Pagination"
import PublicSearchBar from "../../components/searchBar/PublicSearchBar"
import SearchInterface from "../../components/searchBar/SearchInterface"
const AllProperties = () => {
  // const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true)
  const [currentProperties, setCurrentProperties] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    priceRange: '',
    location: '',
    guestCount: ''
  });

  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [location, setLocation] = useState('')
  const [guestCount, setGuestCount] = useState('')

  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000);
  },[])
  useEffect(() => {
    setFilterOptions({
      category: category,
      priceRange: priceRange,
      location: location,
      guestCount: guestCount
    })
  }, [category, priceRange, location, guestCount])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/property/get-all-properties', {
          params: {
            search: searchQuery,
            sort: sortOption,
            filterOptions: {
              category,
              priceRange,
              location,
              guestCount
            },
            page: currentPage,
            limit: itemsPerPage
          }
        });
  
        console.log("🚀 ~ .then ~ response:", response)
        const properties = response.data?.data.reverse();
        setCurrentProperties(properties);
        setTotalItems(response.data.totalItems);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log("🚀 ~ .catch ~ err:", err);
      }
    };
  
    fetchProperties();
  }, [searchQuery, sortOption, category, priceRange, location, guestCount, currentPage, itemsPerPage]);
  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = () => {

  }

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <>
      <div className="mt-10">
        {/* <div className="my-8">

          <CategoryBar />
        </div> */}
        <div className="w-full mt-4" >
          <SearchInterface
            setSortOption={setSortOption}
            setCategory={setCategory}
            setGuestCount={setGuestCount}
            setPriceRange={setPriceRange}
            setLocation={setLocation}
            searchQuery={searchQuery}
          />
        </div>
        <div className="my-4 px-6">
          <PublicSearchBar setSearchQuery={setSearchQuery}/>
        </div>
        <ImageCard properties={currentProperties}/>
      </div>
      <div className="flex justify-center m-8">

        <Pagination currentPage={currentPage} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </div>
    </>

  )
}

export default AllProperties
