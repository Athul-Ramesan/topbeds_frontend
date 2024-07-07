import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bookingApiInstance } from '../../../config/instances';

const RecentActivitiesTable = () => {
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApiInstance.get('/dashboard/recent-activities');
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const TableSection = ({ title, data, columns }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column === 'Date' ? formatDate(item.createdAt) :
                     column === 'User' ? `${item.user?.firstName} ${item.user?.lastName}` :
                     column === 'Property' ? item.property?.title :
                     column === 'First Name' ? `${item.firstName}` :
                     column === 'Last Name' ? `${item.lastName}` :
                     column === 'Total Price' ? `₹${item.totalPrice}` :

                     column === 'Host' ? (`${item} ${item.hostId?.lastName}`? `${item.hostId?.firstName} ${item.hostId?.lastName}` : 'Akhil Ramesh' ) :
                     
                     column === 'Price' ? `₹${item.price}` :
                     column === 'Booking Status' ? `Cancelled` :
                     item[column.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Activities</h1>
      
      <TableSection 
        title="Latest Bookings" 
        data={activities.latestBookings}
        columns={['Date', 'User', 'Property', 'Total Price']}
      />

      <TableSection 
        title="Latest Cancellations" 
        data={activities.latestCancellations}
        columns={['Date', 'User', 'Property', 'Booking Status']}
      />

      <TableSection 
        title="New User Registrations" 
        data={activities.newUserRegistrations}
        columns={['Date', 'First Name', 'Last Name', 'Email']}
      />

      <TableSection 
        title="New Property Listings" 
        data={activities.newPropertyListings}
        columns={['Date', 'Title', 'Host', 'Price']}
      />
    </div>
  );
};

export default RecentActivitiesTable;