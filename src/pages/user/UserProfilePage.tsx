import React, { useEffect, useState } from 'react';
import UserProfileHeader from '../../components/user/UserProfileHeader';
import UserContacts from '../../components/user/UserContacts';
import SecuritySection from '../../components/user/SecuritySection';
import SubscriptionOption from '../../components/user/SubscriptionOption';
import { BookingResponse } from '../../interface/IBooking';
import { bookingApiInstance } from '../../config/instances';
import { useAppSelector } from '../../redux/store';
import VerticalTabs from '../../components/tabs/VerticalTabs';
import UserReviews from '../../components/user/review/UserReviews';


const UserProfilePage: React.FC = () => {

    const [bookings, setBookings] = useState<BookingResponse | null>({
        upcomingBookings:[],
        completedBookings:[]
    });
    const {user} = useAppSelector(state=>state.user)
    const [isLoading, setIsLoading] = useState(true);
    console.log("🚀 ~ isLoading:", isLoading)
    const [error, setError] = useState<string | null>(null);
    console.log("🚀 ~ error:", error)

    useEffect(() => {
        const fetchBookings = async () => {
          try {
            setIsLoading(true);
            const response = await bookingApiInstance.get(`/user/${user?._id}`);
            if (!response.data) {
                throw new Error('Failed to fetch bookings');
                }
            console.log("🚀 ~ fetchBookings ~ response:", response)
            const data = response.data
            setBookings(data);
            setError(null);
          } catch (err) {
            setError('An error occurred while fetching bookings');
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchBookings();
      }, []);

    // if (!bookings) return <div>Loading...</div>;
    return (
        <div className='mt-10'>
            
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold font-mono" aria-label="Profile" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 b">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-3/4 p-4">
                                <UserProfileHeader />
                                {/* <UserInfo /> */}
                                {/* <Listings /> */}
                                <UserContacts />
                                {user?.isGoogle ? '' :<SecuritySection />}
                            </div>
                            <div className="w-full lg:w-1/4 p-4">
                                <SubscriptionOption />
                            </div>
                        </div>
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab bg-red-200 font-mono font-extrabold"
                    aria-label="Booking Management"
                     />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 h-screen">

                        <VerticalTabs bookings={bookings}/>
                    {/* <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
                        <BookingList
                            bookings={bookings.upcomingBookings}
                            title="Upcoming Bookings"
                            isUpcoming={true}
                        />
                        <BookingList
                            bookings={bookings.completedBookings}
                            title="Past Bookings"
                            isUpcoming={false}
                        />
                    </div> */}
                </div>

                {/* <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    Tab content 3
                </div> */}
                <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold font-mono" aria-label="Reviews" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 b">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col lg:flex-row">
                            <UserReviews/>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default UserProfilePage;
