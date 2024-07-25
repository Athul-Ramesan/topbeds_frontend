import  {  useState } from 'react';

const PropertySortingComponent = () => {
  const [sortOption, setSortOption] = useState('');

  const handleSort = (option:string) => {
    setSortOption(option);
    // Implement your sorting logic here based on the selected option
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">Sort By</h3>
      <div className="flex flex-col space-y-2">
        <button
          className={`px-4 py-2 rounded-md hover:bg-gray-100 ${
            sortOption === 'price-asc' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleSort('price-asc')}
        >
          Price: Low to High
        </button>
        <button
          className={`px-4 py-2 rounded-md hover:bg-gray-100 ${
            sortOption === 'price-desc' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleSort('price-desc')}
        >
          Price: High to Low
        </button>
        <button
          className={`px-4 py-2 rounded-md hover:bg-gray-100 ${
            sortOption === 'rating' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleSort('rating')}
        >
          Rating
        </button>
        {/* Add more sorting options */}
      </div>
    </div>
  );
};

export default PropertySortingComponent;