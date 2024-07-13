import  { FC } from 'react'
import { motion } from 'framer-motion';

interface ConfirmationModalNewProps{
    open: boolean;
    onClose:()=>void;
    onConfirm:(id:string)=>void;
    confirmationId: string
}
const ConfirmationModalNew:FC<ConfirmationModalNewProps> = ({onClose,open,onConfirm,confirmationId}) => {

    if(!open){
        return null
    }
    const handleConfirm =()=>{
        onConfirm(confirmationId)
        onClose()
    }
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
                <h1>hiiiiiiii</h1>

                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="btn btn-error" >Cancel</button>
                    <button 
                    onClick={handleConfirm}
                    className="btn btn-success">Confirm</button>
                </div>
            </motion.div>
    </div>
  )
}

export default ConfirmationModalNew
