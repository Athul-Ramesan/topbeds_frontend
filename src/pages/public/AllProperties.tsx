import { useEffect, useState } from "react"
import { axiosInstance } from "../../config/instances"
import ImageCard from "../../components/public/ImageCard"
import CategoryBar from "../../components/public/CategoryBar"
import LoadMoreComponent from "../testpages/LoadMoreComponent"
import InfiniteScrollComponent from "../testpages/InfiniteScrollComponent"
import LoadingSpinner from "../LoadingSpinner"
import Pagination from "../../components/Pagination"
const AllProperties = () => {
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading,setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState({
    priceRange: { min: 0, max: Infinity },
    amenities: [],
    location: '',
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {

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
        const properties = response.data?.data
        setProperties(properties)
        setTotalItems(response.data.totalItems);
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log("🚀 ~ .catch ~ err:", err)
      })

  }, [searchQuery, sortOption, filterOptions])
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  console.log(properties, 'properties');

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <>
      <div className="mt-10">
        <div className="my-8">

        <CategoryBar />
        </div>
        <ImageCard properties={currentProperties} />
      </div>
      <div className="flex justify-center m-8">

      <Pagination currentPage={currentPage} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} totalItems={totalItems}/>
      </div>
    </>

  )
}

export default AllProperties
