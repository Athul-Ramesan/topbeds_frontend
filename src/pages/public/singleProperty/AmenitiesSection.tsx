import React from 'react';

const AmenitiesSection: React.FC = () => {
  const amenities = [
    "Kitchen",
    "Free parking on premises",
    "Air conditioning",
    "Private back garden",
    "Dedicated workspace",
    "TV",
    "Private patio or balcony",
    "Exterior security cameras on property",
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">What this place offers</h2>
      <ul className="list-disc pl-5">
        {amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
};

export default AmenitiesSection;
