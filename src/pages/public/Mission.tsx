import React from 'react';

const Mission = () => {
  return (
    <div className="bg-white p-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <img src="/about-man-walking.jpg" alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-lg">
            At <span className='text-primaryColor font-semibold'>TopBeds</span>, our mission is to create a seamless and enriching travel experience by connecting travelers with local hosts who offer unique and personalized accommodations. We believe that every journey should be special, and we strive to provide our users with exceptional options that cater to their specific needs and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
