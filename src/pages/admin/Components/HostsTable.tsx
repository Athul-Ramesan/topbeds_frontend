import React, { FC, useState } from 'react'
import { IUserSignupData } from '../../../interface/IUserSignup'
import UserDetailsModal from './UserDetailsModal';

interface IHostsTableProps {
  hosts: IUserSignupData[]
}

const HostsTable: FC<IHostsTableProps> = ({ hosts }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <table className="min-w-full bg-white">

      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Details</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody className='scrollbar-thin'>
        {hosts.length ? (
          hosts.map((host, index) => (
            <>
              <tr key={index}>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {host.profileImage ? (
                          <img src={String(host.profileImage)} alt="Avatar" />
                        ) : (
                          <div className="flex items-center justify-center bg-gray-300 text-white font-bold w-full h-full">
                            {host.firstName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{host.firstName} {host.lastName}</div>
                      <div className="text-sm opacity-50">{host.address?.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className="badge badge-ghost badge-sm">{host.email}</span>
                </td>
                <UserDetailsModal key={index}
                user={host}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAccept={''}
                onReject={''}
              />
                <td className="px-4 py-2">
                  <button
                    onClick={handleOpenModal}
                    className="btn btn-ghost btn-xs">details</button>

                </td>

              </tr>
              
            </>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center p-4">No hosts available</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default HostsTable
