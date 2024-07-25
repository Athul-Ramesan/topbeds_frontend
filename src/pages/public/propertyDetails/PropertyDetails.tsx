import React from 'react';
import PropertyImages from './PropertyImages';
import Reviews from './Reviews';
import PropertyInfo from './PropertyInfo';
import HostInfo from './HostInfo';

const PropertyDetails: React.FC = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <PropertyImages />
        <Reviews />
      </div>
      <div>
        <PropertyInfo />
      </div>
    </div>
        <HostInfo />
    </>
  );
};

export default PropertyDetails;