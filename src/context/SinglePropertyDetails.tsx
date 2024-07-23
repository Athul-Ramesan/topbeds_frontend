import React, { FC, createContext } from 'react';
import { IProperty } from '../interface/IProperty';
import useLocalStorage from '../hooks/UseLocalStorage';
// import { IProperty } from '../interface/IProperty';

// Defining the type for the context
interface SinglePropertyDetailsContextType {
    singleProperty: IProperty;
    setSingleProperty: React.Dispatch<React.SetStateAction<IProperty>>;
}

const defaultValue: SinglePropertyDetailsContextType = {
    singleProperty: {
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
      hostId: {},
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
    setSingleProperty: () => {},
};
export const SinglePropertyDetailsContext = createContext(defaultValue);

interface SinglePropertyDetailsProviderProps {
  children: React.ReactNode;
}

// Create the provider component
const SinglePropertyDetailsProvider: FC<SinglePropertyDetailsProviderProps> = ({ children }) => {
  const [singleProperty, setSingleProperty] = useLocalStorage("hostProperty",defaultValue.singleProperty);
// here im using useLocalStorage custom hook to persist the data even after refresh
  return (
    <SinglePropertyDetailsContext.Provider value={{ singleProperty, setSingleProperty }}>
      {children}
    </SinglePropertyDetailsContext.Provider>
  );
};

export default SinglePropertyDetailsProvider;