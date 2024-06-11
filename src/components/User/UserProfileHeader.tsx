import { Edit3 } from 'lucide-react';
import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import ProfileImage from './ProfileImage';
import 'react-image-crop/dist/ReactCrop.css'

const UserProfileHeader: React.FC = () => {
    const handleProfileImageChange = () => {

    }
    return (
        <div className="relative bg-slate-800 rounded-lg">
            <img
                src="/1.jpg"
                alt="Header"
                className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-4 flex items-center space-x-4 ">
                {/* <img
                    src="/1.jpg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4  border-white"
                /> */}
                <div className='w-24 h-24 rounded-full border-4  border-white'>
                    <ProfileImage />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Alisa Noory</h2>
                    <p className="text-white">Chamber Company</p>
                </div>
                {/* <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                    <FaUserPlus />
                    <span>Follow</span>
                </button> */}
            </div>
        </div>
    );
};

export default UserProfileHeader;
