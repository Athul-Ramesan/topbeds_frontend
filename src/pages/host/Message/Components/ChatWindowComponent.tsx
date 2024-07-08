
import  { FC, useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useSocket } from '../../../../context/SocketContext';
import { IChat, IMessage } from '../../../../interface/chatInterfaces';
import { useAppSelector } from '../../../../redux/store';
import { IUserSignupData } from '../../../../interface/IUserSignup';
import CallButton from '../../../user/videoCall/CallButton';

interface ChatWindowComponentProps {
  selectedChat: IChat | null;
}

const ChatWindowComponent: FC<ChatWindowComponentProps> = ({ selectedChat }) => {
  console.log("🚀 ~ selectedChat:", selectedChat)
  const { socket } = useSocket();
  const { user } = useAppSelector(state => state.user);
  console.log("🚀 ~ user:inside chat windowwwwwwwwwwwwwwwwwww", user)
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
      socket?.emit('join_chat', selectedChat._id);
      socket?.emit('mark_messages_seen', { chatId: selectedChat._id });
    }
  }, [selectedChat, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('new_message_send', (message: IMessage) => {
        console.log("🚀 ~ socket.on ~'new_message_send message:", message)
    
        setMessages(prev => [...prev, message]);
      });

      socket.on('messages_seen', ({ userId }) => {
        if (userId !== user?._id) {
          setMessages(prev =>
            prev.map(msg =>
              msg.sender._id === user?._id ? { ...msg, receiverSeen: true } : msg
            )
          );
        }
      });

      return () => {
        socket.off('new_message_send');
        socket.off('messages_seen');
      };
    }
  }, [socket, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedChat) {
      const messageData = {
        chatId: selectedChat._id,
        receiverId: selectedChat.participants.find(p => p._id !== user?._id)?._id,
        content: inputMessage,
        contentType: 'text',
      };
      console.log("🚀 ~ handleSendMessage ~ messageData:", messageData)
      socket?.emit('new_message', messageData);
      setInputMessage('');
    }
  };

  const otherParticipant = selectedChat?.participants.find(p => p._id !== user?._id) as IUserSignupData;

  if (!selectedChat) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start messaging</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={otherParticipant.profileImage || '/default-avatar.png'}
            alt={String(otherParticipant.firstName)}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h2 className="ml-3 font-semibold">{otherParticipant.firstName} {otherParticipant.lastName}</h2>
        </div>
        <CallButton recipientId={String(otherParticipant._id)}/>
        {/* <button className="p-2 rounded-full bg-blue-500 text-white">
          <Phone size={20} />
        </button> */}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {user && messages?.map(message => (
          <div
            key={message?._id}

            className={`flex ${message?.sender?._id == user?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message?.sender?._id == user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              <p>{message?.content}</p>
              <div className="text-xs mt-1 text-right">
                {new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {message.sender?._id === user?._id && (
                  <span className="ml-1">
                    {message?.receiverSeen ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg  outline-none border-gray-300 "
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ><div className='rounded-full bg-blue-500'>

            <Send className='' size={20} />
          </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowComponent;