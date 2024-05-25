import React, { FC, createContext, useState } from 'react';
import { IProperty } from '../interface/IProperty';

// Defining the type for the context
interface HostPropertiesContextType {
    hostProperties: IProperty[];
    setHostProperties: React.Dispatch<React.SetStateAction<IProperty[]>>;
}

const defaultValue: HostPropertiesContextType = {
    hostProperties: [],
    setHostProperties: () => {},
};
export const HostPropertiesContext = createContext(defaultValue);

interface HostPropertiesProviderProps {
  children: React.ReactNode;
}

// Create the provider component
const HostPropertiesProvider: FC<HostPropertiesProviderProps> = ({ children }) => {
  const [hostProperties, setHostProperties] = useState<IProperty[]>([]);

  return (
    <HostPropertiesContext.Provider value={{ hostProperties, setHostProperties }}>
      {children}
    </HostPropertiesContext.Provider>
  );
};

export default HostPropertiesProvider;