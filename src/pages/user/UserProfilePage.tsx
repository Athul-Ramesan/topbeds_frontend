import React from 'react';
import UserProfileHeader from '../../components/User/UserProfileHeader';
import UserInfo from '../../components/User/UserInfo';
import Listings from '../../components/User/Listings';
import UserContacts from '../../components/User/UserContacts';
import GetInTouch from '../../components/User/GetInTouch';


const UserProfilePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 p-4">
                    <UserProfileHeader />
                    {/* <UserInfo /> */}
                    {/* <Listings /> */}
                    <UserContacts />
                </div>
                <div className="w-full lg:w-1/4 p-4">
                    <GetInTouch />
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
