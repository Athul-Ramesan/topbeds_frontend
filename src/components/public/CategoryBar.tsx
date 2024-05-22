import React from 'react';

const categories = [
  { name: 'Amazing pools', icon: '🏊‍♂️' },
  { name: 'Icons', icon: '⭐' },
  { name: 'Farms', icon: '🚜' },
  { name: 'OMG!', icon: '😲' },
  { name: 'Castles', icon: '🏰' },
  { name: 'Beachfront', icon: '🏖️' },
  { name: 'Amazing views', icon: '🌄' },
  { name: 'Lakefront', icon: '🏞️' },
  { name: 'Cabins', icon: '🏡' },
];

const CategoryBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-3 py-2 border rounded-lg">
          <span className="material-icons">tune</span>
          <span className="ml-2">Filters</span>
        </button>
        <div className="flex items-center">
          <span className="mr-2">Display total before taxes</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
