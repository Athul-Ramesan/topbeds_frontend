import React, { FC } from 'react'
import { IUserSignupData } from '../../../interface/IUserSignup'


interface TableUsersProps {
    currentPageUsers : IUserSignupData[]
    handleBlockUnblock: (userId:string , isBlocked:boolean)=> void
}
const TableUsers:FC<TableUsersProps> = ({currentPageUsers,handleBlockUnblock}) => {
  return (
    <table className="table w-[750]">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>    
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {user.profileImage ? (
                              <img src={String(user.profileImage)} alt="Avatar" />
                            ) : (
                              <div className="flex items-center justify-center bg-gray-300 text-white font-bold w-full h-full">
                                {user.firstName?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.firstName} {user.lastName}</div>
                          <div className="text-sm opacity-50">{user.address?.city}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td className={`${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </td>
                    <td>
                      <button
                        className={`${user.isBlocked ? "bg-leafGreenMinimal text-stone-300 hover:text-black" : 'bg-red-400'} btn btn-ghost btn-xs`}
                        onClick={() => handleBlockUnblock(String(user._id), Boolean(user.isBlocked))}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  )
}

export default TableUsers
