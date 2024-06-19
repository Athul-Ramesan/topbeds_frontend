import { Edit3 } from 'lucide-react';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FaCheck, FaInbox, FaRegUser } from 'react-icons/fa6';
import ModalIndex from '../Modal/ModalIndex';
import { UpdateNameAction } from '../../redux/actions/userAction/updateName';
import toast from 'react-hot-toast';
import { validateString } from '../../utils/validationSchema/validateString';
import { validatePhoneNumber } from '../../utils/validationSchema/validatePhoneNumber';
import { UpdatePhoneAction } from '../../redux/actions/userAction/updatePhone';

const UserContacts: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const [isEdit, setIsEdit] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)
    const [error, setError] = useState('')
    const [isEditPhone, setIsEditPhone] = useState(false)

    const dispatch = useAppDispatch()

    const handleEditClick = () => {
        setIsEdit(true)
    }
    const handleEditPhoneClick = ()=>{
        setIsEditPhone(true)
    }
    const handleCancelClick = () => {
        setIsEdit(false)
        setFirstName('')
        setLastName('')
        setPhone('')
        setError('')
        setIsEditPhone(false)
        setButtonLoading(false)
    }
    const handleSave = async () => {
        const _id = user?._id
        if (firstName) {
            try {
                const firstNameValidation = validateString(firstName)
                const lastNameValidation = validateString(lastName)
                if (firstNameValidation != 'Valid' || lastNameValidation != 'Valid') {
                    setError(`Name validation failed: ${firstNameValidation}`)
                    return
                }
                setButtonLoading(true)
                const response = await dispatch(UpdateNameAction({ _id, firstName, lastName }))
                console.log("🚀 ~ handleSave ~ response:", response)
                if (response.type === 'user/update-user-name/fulfilled') {
                    setTimeout(() => {
                        setIsEdit(false)
                        toast.success('User details updated')
                        setButtonLoading(false)
                        setError('')
                    }, 1000);

                } else {
                    toast.error('Failed to update user details')
                }
            } catch (error: any) {
                console.log("🚀 ~ handleSave ~ error:", error)
            }finally{
                setError('')
                setButtonLoading(false)

            }
        }
        if (phone) {
            try {
                const phoneValidation = validatePhoneNumber(phone)
                if (phoneValidation != 'Valid') {
                    setError(`Phone validation failed: ${phoneValidation}`)
                    return
                }
                setButtonLoading(true)
                const response = await dispatch(UpdatePhoneAction({ _id, phone}))
                console.log("🚀 ~ handleSave ~ response:", response)
                if (response.type === 'user/update-user-phone/fulfilled') {
                    setTimeout(() => {
                        setIsEditPhone(false)
                        toast.success('User details updated')
                        setButtonLoading(false)
                        setError('')
                    }, 1000);
                }
            } catch (error: any) {
                toast.error('Failed to update user details')
            }
        }
    }
    return (
        <div className="mt-4 bg-gray-100 rounded-md shadow-md">
            {/* <ModalIndex  */}
            <div className='flex justify-between bg-bg-300 rounded-md shadow-md border-b border-gray-500 p-3'>
                <h3 className="text-lg font-semibold mb-4  text-center ">User Contacts</h3>

            </div>
            <ul className="space-y-2">
            {error && <p className="text-red-500 mb-4 text-center p-2">{error}</p>}
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaRegUser />
                    <div className='flex justify-between w-full'>


                        {isEdit ? (
                            <>
                                <input type="text" onChange={(e) => {
                                    setFirstName(e.target.value)
                                }} placeholder='type your first name..' className='password placeholder:text-green-500' />
                                <input type="text" onChange={(e) => {
                                    setLastName(e.target.value)
                                }} placeholder='type your last name..' className='password mx-4 placeholder:text-green-500' />
                                <div className='flex justify-end gap-10'>

                                    <button
                                        onClick={handleCancelClick}
                                        className='hover:scale-110 rounded-md px-2 hover:text-black duration-500'>
                                        cancel
                                    </button>
                                    <button onClick={handleSave} className={`
                                 rounded-md px-2 bg-black text-gray-400 hover:scale-110 duration-500`}>
                                        {buttonLoading ? '.......' : 'save'}
                                    </button>
                                </div>
                            </>
                        ) :
                            (
                                <>

                                    <span className='px-4 font-semibold font-sans'>{!firstName ? user?.firstName : firstName} {!lastName ? user?.lastName : lastName}</span>
                                    <Edit3
                                        onClick={handleEditClick}
                                        className='cursor-pointer hover:scale-105 transition duration-500' />
                                </>
                            )
                        }
                    </div>
                </li>
               
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaPhone />
                    <div className='flex justify-between w-full'>


                        {isEditPhone ? (
                            <>
                                <input type="text" onChange={(e) => {
                                    setPhone(e.target.value)
                                }} placeholder='type your phone number..' className='password placeholder:text-green-500' />
                              
                                <div className='flex justify-end gap-10'>
                                    <button
                                        onClick={handleCancelClick}
                                        className='hover:scale-110 rounded-md px-2 hover:text-black duration-500'>
                                        cancel
                                    </button>
                                    <button onClick={handleSave} className={`
                                 rounded-md px-2 bg-black text-gray-400 hover:scale-110 duration-500`}>
                                        {buttonLoading ? '.......' : 'save'}
                                    </button>
                                </div>
                            </>
                        ) :
                            (
                                <>

                                    <span className='px-4 font-semibold font-sans'>{!phone ? (user?.phone ? user.phone : 'Add your phone number') : phone} </span>
                                    <Edit3
                                        onClick={handleEditPhoneClick}
                                        className='cursor-pointer hover:scale-105 transition duration-500' />
                                </>
                            )
                        }
                    </div>
                </li>
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaEnvelope />
                    <span className='font-sans font-semibold px-4'>{user?.email}</span>
                </li>
                {/* <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaGlobe />
                    <span>{user?.address?.city}</span>
                </li> */}
                <li className="flex items-center space-x-2 border-b border-b-gray-300 p-4">
                    <FaCheck className='text-green-500 ' />
                    <span className='px-4 font-sans font-semibold'>Email Verified</span>
                </li>
            </ul>
        </div>
    );
};

export default UserContacts;
