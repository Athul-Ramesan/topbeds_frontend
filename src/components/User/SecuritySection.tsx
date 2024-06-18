import {  Edit3 } from 'lucide-react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {FaLock } from 'react-icons/fa6';
import { validatePassword } from '../../utils/validationSchema/validatePassword';
import { UpdatePasswordAction } from '../../redux/actions/userAction/updatePassword';
import toast from 'react-hot-toast';

const SecuritySection: React.FC = () => {
    const { user} = useAppSelector(state=>state.user)
    console.log("🚀 ~ user inside securitysection:", user)
    
    const dispatch = useAppDispatch()
    const [isEdit,setIsEdit] = useState(false)
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError]= useState('')
    const [message,setMessage] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)


    const handleEditClick = async()=>{
        setIsEdit(true)
    }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          setMessage('');
          return;
        }
        const result = validatePassword(newPassword)
        if (result !== 'Password is valid') {
          setError(`Password validation failed: ${result}`)
          return;
        }
        setButtonLoading(true)
        try {
            const _id = user?._id
          const response = await dispatch(UpdatePasswordAction({_id , oldPassword, newPassword}))
          if(response.type==='user/update-user-password/fulfilled'){
            setButtonLoading(false)
            setTimeout(() => {
                setIsEdit(false)
            }, 2000);
            toast.success('password updated successfully')
            setMessage('password updated successfully')
          }else if(response.type==='user/update-user-password/rejected'){
            setButtonLoading(false)
            if(response.payload==="old password doesn't match"){
                setError('Old password does not match')
                toast.error('Old password does not match')
                return
            }else{
                setError('Failed to update password please try again')
                return
            }
          }
          console.log("🚀 ~ handleOnSubmit ~ response:", response)
        setError('')
          
        } catch (err: any) {
          setError(err.response.data.error);
          setMessage('');
          setButtonLoading(false)
        }finally{
            setButtonLoading(false)
        }
      };
      const handleCancelClick = ()=>{
        setIsEdit(false)
      }
    return (
        <div className="mt-4 bg-gray-100 rounded-md shadow-md">
            {/* <ModalIndex  */}
           <div className='flex justify-between bg-bg-300 rounded-md shadow-md border-b border-gray-500 p-3'>
           <h3 className="text-lg font-semibold mb-4  text-center ">Password & Security</h3>
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

                    {isEdit ? (
                    <form className='w-full' onSubmit={handleOnSubmit}>
                        <div className='flex flex-col w-2/3 '>
                        <div className='flex justify-center items-center gap-6'>
                        <FaLock />
                        <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type="password" placeholder='old password' className='password' name='oldPassword'/>
                        </div>
                        <div className='flex justify-center items-center gap-6'>
                        <FaLock />
                        <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                         type="password" placeholder='new password' className='password' name='newPassword' />
                        </div>
                        <div className='flex justify-center items-center gap-6'>
                        <FaLock />
                        <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" placeholder='confirm password' className='password' name='confirmPassword' />
                        </div>
                        </div>
                        {error && <p className="text-red-500 mb-4 text-center p-2">{error}</p>}
                        {message && (
                            <p className='text-md font-serif font-semibold text-leafGreen'>{message}</p>
                        )}
                        <div className='flex justify-end gap-10'>
                        <button
                        onClick={handleCancelClick}
                        className='hover:scale-110 rounded-md px-3 py-1duration-500 hover:text-black duration-500'>
                            cancel
                        </button>  
                        <button type='submit' className={`
                            ${buttonLoading ? 'spinner' : ''}
                            rounded-md px-3 py-1 bg-black text-gray-400 hover:scale-110 duration-500`}>
                            save
                        </button>
                        </div>
                        
                </form>
                    )
                    :
                    (
                        <>
                    <FaLock />
                    <span  className='px-4'>**********</span>
                    </>
                    )
                    }

                </li>
               
            </ul>
        </div>
    );
};

export default SecuritySection;
