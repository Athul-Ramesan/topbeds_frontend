import  { FC, useState } from 'react'
import { IUserSignupData } from '../../../interface/IUserSignup'
import UserDetailsModal from './UserDetailsModal'

interface IHostsRequestTableProps {
  requestedUsers: IUserSignupData[]
  handleAcceptReject: (host: IUserSignupData, action: "accept" | "reject") => Promise<void>
}
const HostsRequestTable: FC<IHostsRequestTableProps> = ({ requestedUsers, handleAcceptReject }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <div>
      <table className="min-w-full bg-white w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        {requestedUsers.length !== 0 && (
          requestedUsers.map((item, index) => (
            <tbody className='scrollbar-thin'>
              <tr key={index}>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {item.profileImage ? (
                          <img src={String(item.profileImage)} alt="Avatar" />
                        ) : (
                          <div className="flex items-center justify-center bg-gray-300 text-white font-bold w-full h-full">
                            {item.firstName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.firstName} {item.lastName}</div>
                      <div className="text-sm opacity-50">{item.address?.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className="badge badge-ghost badge-sm">{item.email}</span>
                </td>
                <td className="px-4 py-2">
                  <button 
                  onClick={handleOpenModal}
                  className="btn btn-ghost btn-xs">details</button>
                </td>
                <UserDetailsModal
                  user={item}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onAccept={handleAcceptReject}
                  onReject={handleAcceptReject}
                />
                <td className="px-4 py-2">

                  <button
                    onClick={() => handleAcceptReject(item, 'accept')}
                    className="btn btn-ghost btn-xs text-green-600">Accept</button>
                  <button
                    onClick={() => handleAcceptReject(item, 'reject')}
                    className="btn btn-ghost btn-xs text-red-500">Reject</button>
                </td>
              </tr>
            </tbody>
          ))

        )}
      </table>
      {
        !requestedUsers.length && (
          <div className='flex flex-col justify-center items-center'>
            <ul>

              <li className="text-center p-4">No requests available</li>
              <img className='w-80' src="/no-requests-available..png" alt="" />
            </ul>
            {/* <tr>
                      <td colSpan={4} className="text-center p-4">No requests available</td>
                      </tr> */}
          </div>
        )
      }
    </div>
  )
}

export default HostsRequestTable
