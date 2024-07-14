import  { ChangeEvent, FC, useState } from 'react'
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { EmojiClickData, Theme } from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react';
import { propertyApiInstance } from '../../config/instances';
import toast from 'react-hot-toast';
import { IFacility } from '../../pages/admin/Property';

interface AddFacilityProps {
    isOpen: boolean
    onClose: () => void
    setFacilities:(facililies:any)=>void
}
const AddFacilityModalPage: FC<AddFacilityProps> = ({ isOpen, onClose,setFacilities }) => {
    const [chosenEmoji, setChosenEmoji] = useState('');
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [facility, setFacility] = useState('')
    const [error, setError]= useState('')
    if (!isOpen) return null;
    const onEmojiClick = (
        emojiObject: EmojiClickData,
        //  event: MouseEvent
        ) => {
        console.log(chosenEmoji, 'chosen emojiii')
        setChosenEmoji(emojiObject.emoji);
        setShowPicker(!showPicker)
    };
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.75 },
        visible: { opacity: 1, scale: 1 },
    };
    const handleEmojiClick = ()=>{
        setShowPicker(!showPicker)
    }
    const handleOnChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setFacility(event.target.value)
    }
    const handleSubmit= async()=>{
        if(!facility.trim()){
            setError('Please enter a facility name')
        }
           try {
            const response =await propertyApiInstance.post('/add-property-facility', {name:facility, icon:chosenEmoji})
            if(!response.data){
                toast.error('Something went wrong')
            }
            console.log("🚀 ~ handleSubmit ~ response:", response)
            const newFacility = response.data.facility
            setFacilities((prev:any) => {
                return [...prev, newFacility].reverse()
              });
              
            toast.success('facility added succesfully')
            setFacility('')
            setChosenEmoji('')
            setError('')
            onClose()
           } catch (error:any) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            toast.error(error.response.data.message)
           }
            
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <motion.div
                className="bg-white bg-opacity-90 rounded-lg p-6 max-w-lg w-full"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={modalVariants}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-bold mb-4">Add new facility</h2>
                <div className="mb-4">
                    <label htmlFor="">Facility</label>
                    <input className='focus:outline-none' type="text" onChange={handleOnChange} />
                    <div className='flex items-center justify-between'>
                        <p className='text-xl font-semibold'> select an icon </p>
                        <p className='px-6 btn'
                        onClick={handleEmojiClick}
                        >click here</p>
                        <p className='text-2xl'> {chosenEmoji ? chosenEmoji :''} </p>
                    </div>
                    {showPicker && (
                        <div className="absolute top-0 left-10 z-10">
                            <EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.AUTO} />
                        </div>
                    )}
                    {error && (
                        <p className='text-red-500'>{error}</p>
                    )}
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="btn btn-error" >Cancel</button>
                    <button 
                    onClick={handleSubmit}
                    className="btn btn-success">Add</button>
                </div>
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
}

export default AddFacilityModalPage
