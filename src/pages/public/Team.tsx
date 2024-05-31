import React from 'react';

const Team = () => {
  return (
    <div className="bg-white p-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-3">Meet the Team</h2>
          <p className="text-lg">
            Our team is composed of passionate travelers, tech enthusiasts, and customer service experts dedicated to making your travel experience as enjoyable as possible. We work tirelessly to ensure that WanderStay is always improving and evolving to meet your needs.
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <img src="/working-team.jpg" alt="Meet the Team" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Team;
