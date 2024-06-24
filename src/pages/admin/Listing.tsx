import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/instances';
import LoadingSpinner from '../LoadingSpinner';
import Card from './Components/Card';
import { IProperty } from '../../interface/IProperty';

const Listing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true)
  const [currentProperties, setCurrentProperties] = useState<IProperty[]>([])
  const [totalPages, setTotalPages] = useState(1)
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
        const totalPages = Math.ceil((response.data.totalItems) / itemsPerPage)
        setTotalPages(totalPages)
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
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }
  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div className="p-4 overflow-y-auto ">
      <div className="flex my-2 w-full">
        <input
          type="text"
          placeholder="Search Listing"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="focus:outline-none w-full max-w-xs"

        />
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Listing" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {currentProperties.map((property) => (
                <Card property={property} key={property._id} location={'location'} description={property.description} price={property.price} image={property.images[0]} />
              )
              )}
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab bg-blue-100"
          aria-label="Apartments"
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {currentProperties.filter(item => item.category === 'Apartment').map((property) => (
                <Card key={property._id} property={property} location={'location'} description={property.description} price={property.price} image={property.images[0]} />
              )
              )}
            </div>
          </div>

        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab bg-orange-200" aria-label="Resorts" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {currentProperties.filter(item => item.category === 'Resort').map((property) => (
                <Card property={property} key={property._id} location={'location'} description={property.description} price={property.price} image={property.images[0]} />
              )
              )}
            </div>
          </div>

        </div>
        <input type="radio" name="my_tabs_2" role="tab" className="tab bg-yellow-200" aria-label="House" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {currentProperties.filter(item => item.category === 'House').map((property) => (
                <Card property={property} key={property._id} location={'location'} description={property.description} price={property.price} image={property.images[0]} />
              )
              )}
            </div>
          </div>

        </div>
        <input type="radio" name="my_tabs_2" role="tab" className="tab bg-violet-200" aria-label="Cabin" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {currentProperties.filter(item => item.category === 'Cabin').map((property) => (
                <Card property={property} key={property._id} location={'location'} description={property.description} price={property.price} image={property.images[0]} />
              )
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="join flex justify-center mb-4">
        <button className={`join-item btn ${currentPage <= 1 ? 'btn-disabled' : ''}`} onClick={handlePrevClick}>«</button>
        <button className="join-item btn">{currentPage}</button>
        <button className={`join-item btn ${currentPage >= totalPages ? 'btn-disabled' : ''}`} onClick={handleNextClick}>»</button>
      </div>
    </div>
  );
};

export default Listing;
