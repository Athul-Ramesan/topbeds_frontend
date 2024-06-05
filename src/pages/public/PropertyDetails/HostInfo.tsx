import React, { useContext } from 'react';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';

const HostInfo: React.FC = () => {
  const {singleProperty} = useContext(SinglePropertyDetailsContext)
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex-col m-10">
      <h3 className="text-xl font-bold mb-2">Meet your Host</h3>
      <div className="flex items-center mb-4">
        <img src="path/to/host-logo.png" alt="Host Logo" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold">{singleProperty.hostId?.firstName +" "+singleProperty.hostId?.lastName}</p>
          <p className="text-sm text-gray-600">Superhost</p>
          <p className="text-sm text-gray-600">3 Years hosting</p>
        </div>
      </div>
      <p className="mb-4">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
      <div className="mb-4">
        <p className="font-bold">Host details</p>
        <p className="text-sm text-gray-600">Response rate: 97%</p>
        <p className="text-sm text-gray-600">Responds within a few hours</p>
      </div>
      <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Message Host</button>
    </div>
  );
};

export default HostInfo;