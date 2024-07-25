import  { FC } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';


interface AddFacilityProps {
    isOpen: boolean
    onClose: ()=>void
}

const AddFacility: FC<AddFacilityProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.75 },
        visible: { opacity: 1, scale: 1 },
    };

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
                    <input type="text" />
                    <label htmlFor="">Icon</label>
                    <input type="text" />
                </div>
                        <div className="flex justify-end space-x-4">
                            <button className="btn btn-error" >Cancel</button>
                            <button className="btn btn-success">Add</button>
                        </div>
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
};

export default AddFacility;
