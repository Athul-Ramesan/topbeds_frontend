import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 p-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Welcome to <span className='text-primaryColor font-semibold'>TopBeds</span>, your ultimate travel companion for discovering and booking unique accommodations around the world. Whether you're planning a relaxing vacation, an adventurous trek, or a spontaneous weekend getaway, WanderStay connects you with a diverse range of hosts offering comfortable and memorable stays.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/about2.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
