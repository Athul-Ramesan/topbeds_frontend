import {  Edit3 } from 'lucide-react';
import React from 'react';
import { FaPhone, FaEnvelope,} from 'react-icons/fa';
import { useAppSelector } from '../../redux/store';
import { FaCheck, FaInbox } from 'react-icons/fa6';
import ModalIndex from '../Modal/ModalIndex';

const UserContacts: React.FC = () => {
    const {  user} = useAppSelector(state=>state.user)

    const handleEditClick = ()=>{

    }
    return (
        <div className="mt-4 bg-gray-100 rounded-md shadow-md">
            {/* <ModalIndex  */}
           <div className='flex justify-between bg-bg-300 rounded-md shadow-md border-b border-gray-500 p-3'>
           <h3 className="text-lg font-semibold mb-4  text-center ">User Contacts</h3>
            <Edit3 
            onClick={handleEditClick}
            className='cursor-pointer hover:scale-105 transition duration-500'/>
           </div>
            <ul className="space-y-2">
                {/* <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaMapMarkerAlt />
                    <span>Location</span>
                </li> */}
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaPhone />
                    <span>{user?.phone ? user.phone : 'Add your phone number'}</span>

                </li>
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaEnvelope />
                    <span>{user?.email}</span>
                </li>
                {/* <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaGlobe />
                    <span>{user?.address?.city}</span>
                </li> */}
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaCheck />
                    <span>Email Verified</span>
                </li>
            </ul>
        </div>
    );
};

export default UserContacts;
