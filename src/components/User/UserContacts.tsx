import {  Edit3 } from 'lucide-react';
import React from 'react';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const UserContacts: React.FC = () => {
    return (
        <div className="mt-4 bg-gray-100 rounded-md shadow-md">
           <div className='flex justify-between bg-bg-300 rounded-md shadow-md border-b border-gray-500 p-3'>
           <h3 className="text-lg font-semibold mb-4  text-center ">User Contacts</h3>
            <Edit3 className='cursor-pointer hover:scale-105 transition duration-500'/>
           </div>
            <ul className="space-y-2">
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaMapMarkerAlt />
                    <span>Location</span>
                </li>
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaPhone />
                    <span>Phone</span>
                </li>
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaEnvelope />
                    <span>email</span>
                </li>
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaGlobe />
                    <span>website</span>
                </li>
            </ul>
        </div>
    );
};

export default UserContacts;
