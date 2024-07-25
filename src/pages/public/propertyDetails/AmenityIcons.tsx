import React from 'react';
import { FaWifi, FaCar, FaTv, FaPaw, FaDoorOpen,FaMusic } from 'react-icons/fa';

interface AmenityIconProps {
  amenity: string;
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ amenity }) => {
  const getIcon = () => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <FaWifi />;
      case 'free parking spot':
        return <FaCar />;
      case 'tv':
        return <FaTv />;
      case 'pets':
        return <FaPaw />;
      case 'private entrance':
        return <FaDoorOpen />;
      case 'radio':
        return <FaMusic />;
      default:
        return null;
    }
  };

  return <span className="mr-2">{getIcon()}</span>;
};

export default AmenityIcon;