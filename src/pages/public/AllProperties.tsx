import { useEffect, useState } from "react"
import { axiosInstance } from "../../config/instances"
import ImageCard from "../../components/public/ImageCard"
import CategoryBar from "../../components/public/CategoryBar"
import LoadMoreComponent from "../testpages/LoadMoreComponent"
import InfiniteScrollComponent from "../testpages/InfiniteScrollComponent"
import LoadingSpinner from "../LoadingSpinner"
import Pagination from "../../components/Pagination"
import PublicSearchBar from "../../components/searchBar/PublicSearchBar"
import PropertySortingComponent from "../../components/Sorting/PropertySortingComponent"
import SearchInterface from "../../components/searchBar/SearchInterface"
const AllProperties = () => {
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    priceRange: '',
    location: '',
    guestCount:''
  });

  const [category,setCategory] = useState('')
  const [priceRange,setPriceRange] = useState('')
  const [location,setLocation] = useState('')
  const [guestCount,setGuestCount] = useState('')

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  
  useEffect(() => {

    setFilterOptions({
      category:category,
      priceRange:priceRange,
      location:location,
      guestCount:guestCount
    })

    axiosInstance.get('/property/get-all-properties', {
      params: {
        search: searchQuery,
        sort: sortOption,
        filters: filterOptions,
        page: currentPage,
        itemsPerPage: itemsPerPage,
      }
    })
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response)
        const properties = response.data?.data.reverse()
        setProperties(properties)
        setTotalItems(response.data.totalItems);
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log("🚀 ~ .catch ~ err:", err)
      })

  }, [searchQuery, sortOption, category,location,priceRange,guestCount])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  console.log(properties, 'properties');

  const handleCategoryChange= ()=>{
    
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
          setCategory={setCategory} 
          setGuestCount={setGuestCount}
          setPriceRange={setPriceRange}
          setLocation={setLocation}
          />
        </div>
        <div className="my-4">
        <PublicSearchBar/>
        </div>
        <ImageCard properties={currentProperties} />
      </div>
      <div className="flex justify-center m-8">

        <Pagination currentPage={currentPage} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </div>
    </>

  )
}

export default AllProperties
