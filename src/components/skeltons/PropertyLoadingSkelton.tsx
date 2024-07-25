import React from 'react';

const PropertyLoadingSkelton: React.FC = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default PropertyLoadingSkelton;