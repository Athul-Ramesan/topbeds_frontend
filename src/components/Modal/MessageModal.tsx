import { AnimatePresence,motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { ChangeEvent, FC, useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import { useAppSelector } from '../../redux/store'
import { chatApiInstance } from '../../config/instances'
import toast from 'react-hot-toast'

interface messageModalProps{
    isOpen:boolean
    onClose: ()=>void
    hostId: string
}

const MessageModal:FC<messageModalProps>= ({isOpen,onClose,hostId}) => {
    console.log("🚀 ~ hostId:", hostId)
    const {socket,isConnected,onlineUsers} = useSocket()
    console.log("🚀 ~ onlineUsers:", onlineUsers)
    console.log("🚀 ~ isConnected:", isConnected)
    const {user} = useAppSelector(state=>state.user)
    
    const [message, setMessage] = useState('')
    if(!isOpen) return null
    const handleOnChange =(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setMessage(e.target.value)
        console.log(message,'messsageee')
    }
    const handleSendMessage =async()=>{
      const messageData = {
        receiverId: hostId,
        content: message,
        contentType: 'text',
      };
        console.log("🚀 ~ handleSendMessage ~ messageData:", messageData)
      
        const response = await chatApiInstance.post(`/send-message/${user?._id}/${hostId}`, {content:message})
        if(response){
            console.log("🚀 ~ handleSendMessage ~ response:", response)
            setMessage('')
            toast.success('message sent ! check your profile')
            onClose()
            socket?.emit('new_message', messageData)
        }
        console.log(message,'message' )
    }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Message to host</h2>
            <textarea name="" placeholder='Type message here...' className='outline-none placeholder:text-green-500' onChange={handleOnChange} id=""></textarea>
            <div className='flex justify-end gap-2'>
            <div className='btn btn-error' onClick={onClose}>Cancel</div>
            <div className='btn btn-info' onClick={handleSendMessage}>
                <Send/>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MessageModal
