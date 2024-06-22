import React, { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { axiosInstance } from '../../config/instances';
import { config } from '../../config/config';
import { IUserSignupData } from '../../interface/IUserSignup';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import LoadingSpinner from '../LoadingSpinner';
import HostsTable from './Components/HostsTable';
import HostsRequestTable from './Components/HostsRequestTable';
import HostsRejectedTable from './Components/HostsRejectedTable';

const Hosts: React.FC = () => {
  const [hosts, setHosts] = useState<IUserSignupData[]>([]);
  const [requestedUsers, setRequestedUsers] = useState<IUserSignupData[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [rejectedUserId, setRejectedUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [rejectedUsers, setRejectedUsers] = useState<IUserSignupData[]>([])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/user/get-all-users-with-host-status', config);
        if (response.data.data) {
          const users: IUserSignupData[] = response.data.data;
          const hostRequestsData = users.filter(user => user.hostStatus === 'requested');
          const rejectedUsersData = users.filter(user => user.hostStatus === 'rejected');
          setRequestedUsers(hostRequestsData)
          setRejectedUsers(rejectedUsersData)
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchHosts = async () => {
      console.log('Fetching users data...');
      try {
        console.log('Fetching users data...inside try');
        const response = await axiosInstance.get('/user/get-all-hosts', config);
        console.log("🚀 ~ fetchhosts ~ response:", response);
        if (response.data.hosts) {
          setHosts(response.data.hosts)
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchHosts();
  }, []);

  const handleAcceptReject = async (host: IUserSignupData, action: 'accept' | 'reject') => {
    console.log(`${action} host with ID: ${host._id}`);
    if (action === 'accept') {
      setLoading(true)
      const response = await axiosInstance.post('/user/change-host-status', { _id: host._id, hostStatus: 'accepted' }, config)
      const newHost = response.data.data
      const newHostArray = [...hosts, newHost]
      const newRequestedUsers = requestedUsers.filter(item => item._id !== newHost._id)
      setRequestedUsers(newRequestedUsers)
      setHosts(newHostArray)
      setTimeout(() => {
        setLoading(false)
      }, 1000);


      console.log("🚀 ~ handleAcceptReject ~ response:", response)
    }
    if (action === 'reject') {
      setRejectedUserId(String(host._id))
      setOpenModal(true)
    }
  };
  const handleRejectConfirm = async () => {
    setLoading(true)
    const response = await axiosInstance.post('/user/change-host-status', { _id: rejectedUserId, hostStatus: 'rejected' }, config)

    const newRejectedUser = response.data.data
    const newRequestedUsers = requestedUsers.filter(item => item._id !== newRejectedUser._id)
    const newRejectedUsers = [...rejectedUsers, newRejectedUser]
    setRequestedUsers(newRequestedUsers)
    setRejectedUsers(newRejectedUsers)
    setOpenModal(false)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    console.log("🚀 ~ handleRejectConfirm ~ response:", response)
    setRejectedUserId("")
  }
  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div className='p-4 flex gap-2 w-full'>
      <ConfirmationModal content='Are you sure? ' handleClose={() => setOpenModal(false)} open={openModal} handleConfirm={handleRejectConfirm} />
      <div className="overflow-x-auto w-4/5 rounded">
        <div role="tablist" className="tabs tabs-bordered">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Host List" />
          <div role="tabpanel" className="tab-content">
            <HostsTable hosts={hosts} />
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Pending Requests" />
          <div role="tabpanel" className="tab-content">
            <HostsRequestTable handleAcceptReject={handleAcceptReject} requestedUsers={requestedUsers} />
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Rejected" />
          <div role="tabpanel" className="tab-content">
            <HostsRejectedTable rejectedUsers={rejectedUsers} />
          </div>
        </div>
      </div>
      <div className='bg-white w-1/5'>
        <ul>
          <p className='text-center font-bold p-2 bg-leafGreenMinimal rounded-md text-red-200'>Requests</p>
          {requestedUsers.length ? (
            requestedUsers.map((request, index) => (
              <li key={index} className='rounded-md border-b p-2 flex gap-1 justify-between'>
                <p>{request.firstName} {request.lastName}</p>
                <div>
                  <button
                    title='accept'
                    className='bg-white hover:bg-leafGreenMinimal duration-500 rounded'
                    onClick={() => handleAcceptReject(request, 'accept')}
                  >
                    <TiTick size={26} color='green' />
                  </button>
                  <button
                    title='reject'
                    className='bg-white hover:bg-leafGreenMinimal duration-500 rounded'
                    onClick={() => handleAcceptReject(request, 'reject')}
                  >
                    <TiCancel color='red' size={26} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className='flex flex-col  gap-24'>
              <li className="text-center p-4">No requests available</li>
              <img src="/no-requests-available..png" alt="" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Hosts;
