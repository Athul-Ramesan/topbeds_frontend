import React from 'react';

const DetailsSection: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p>Campervan/Motorhome in Calaca, Philippines</p>
          <p>2 guests · 1 bedroom · 1 bathroom</p>
        </div>
        <div>
          <span className="text-lg font-bold">₹17,933/night</span>
        </div>
      </div>
      <div>
        <p>Hosted by Camper And Cabin</p>
        <p>Superhost · 3 years hosting</p>
      </div>
    </div>
  );
};

export default DetailsSection;
