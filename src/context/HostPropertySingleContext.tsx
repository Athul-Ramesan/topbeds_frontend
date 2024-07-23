import React, { FC, createContext } from 'react';
import { IProperty } from '../interface/IProperty';
import useLocalStorage from '../hooks/UseLocalStorage';
// import { IProperty } from '../interface/IProperty';

// Defining the type for the context
interface HostPropertySingleContextType {
    hostProperty: IProperty;
    setHostProperty: React.Dispatch<React.SetStateAction<IProperty>>;
}

const defaultValue: HostPropertySingleContextType = {
    hostProperty: {
      _id:"",
      title: "",
      description: "",
      location: '',
      // {
      //   address: "",
      //   city: "",
      //   state: "",
      //   country: "",
      //   coordinates: {
      //     lat: 0,
      //     lng: 0,
      //   },
      // },
      hostId: undefined,
      reviews: [""],
      availability: [{
        startDate: new Date(),
        endDate: new Date(),
        available: true,
      }],
      active: true,
      address: "",
      amenities: [""],
      houseRules: [""],
      price: 0,
      images: [""],
      bedrooms: 0,
      bathrooms: 0,
      maxGuests: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    setHostProperty: () => {},
};
export const HostPropertySingleContext = createContext(defaultValue);

interface HostPropertySingleProviderProps {
  children: React.ReactNode;
}

// Create the provider component
const HostPropertySingleProvider: FC<HostPropertySingleProviderProps> = ({ children }) => {
  const [hostProperty, setHostProperty] = useLocalStorage("hostProperty",defaultValue.hostProperty);
// here im using useLocalStorage custom hook to persist the data even after refresh
  return (
    <HostPropertySingleContext.Provider value={{ hostProperty, setHostProperty }}>
      {children}
    </HostPropertySingleContext.Provider>
  );
};

export default HostPropertySingleProvider;