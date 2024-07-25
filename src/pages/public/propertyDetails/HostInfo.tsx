import React, { useContext, useEffect, useState } from 'react';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';
import { useAppSelector } from '../../../redux/store';
import MessageModal from '../../../components/modal/MessageModal';

const HostInfo: React.FC = () => {
  const [isSubsciption, setIsSubscription] = useState(false)
  const { user } = useAppSelector(state => state.user)
  const [openMessageModal, setOpenMessageModal] = useState(false)

  const { singleProperty } = useContext(SinglePropertyDetailsContext)
  useEffect(() => {
    if (user?.subscriptions?.length! >0) setIsSubscription(true)
  }, [])
  const handleMessageHostClick=()=>{
    setOpenMessageModal(true)
}
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex-col m-10">
      <h3 className="text-xl font-bold mb-2">Meet your Host</h3>
      <div className="flex items-center mb-4">
        <img src={String(singleProperty.hostId?.profileImage)} alt="Host image" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold">{singleProperty.hostId?.firstName + " " + singleProperty.hostId?.lastName}</p>
          <p className="text-sm text-gray-600">Superhost</p>
          <p className="text-sm text-gray-600">3 Years hosting</p>
        </div>
      </div>
      <p className="mb-4">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
      <div className="mb-4">
      </div>
      {isSubsciption && (
        <div>
          <button
            onClick={handleMessageHostClick}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg">Message Host</button>
          <MessageModal hostId={String(singleProperty.hostId?._id)} isOpen={openMessageModal} onClose={()=> setOpenMessageModal(false)}/>
        </div>
      )}
    </div>
  );
};

export default HostInfo;