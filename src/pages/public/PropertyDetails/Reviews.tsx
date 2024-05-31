import React from 'react';

const Reviews: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="mr-2">★</span>
        <span className="text-gray-600 ">4.90 · 310 reviews</span>
      </div>
      <div className="border-t border-gray-200 pt-4">
        {/* Render individual reviews */}
      </div>
    </div>
  );
};

export default Reviews;