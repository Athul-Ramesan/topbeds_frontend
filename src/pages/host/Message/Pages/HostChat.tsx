// src/pages/HostChat.tsx
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { useSocket } from '../../../../context/SocketContext';
// import { useSocket } from '../contexts/SocketContext';

const HostChat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { socket, isConnected } = useSocket();

  if (!isConnected) {
    return <div className="flex items-center justify-center h-screen">Connecting...</div>;
  }

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <ChatList onSelectChat={setSelectedChat} 
      socket={socket!} 
      />
      {selectedChat ? (
        <ChatWindow chatId={selectedChat} socket={socket!} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default HostChat;