// src/components/chat/ChatList.tsx
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  socket: Socket;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, socket }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    socket.emit('get_chats');
    socket.on('chats_list', (chatsList: Chat[]) => {
      setChats(chatsList);
    });

    return () => {
      socket.off('chats_list');
    };
  }, [socket]);

  return (
    <div className="w-1/3 bg-black border-r overflow-y-auto">
      <div className="bg-green-200 p-4">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-4 hover:bg-gray-100 cursor-pointer border-b"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="flex-1">
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{chat.timestamp}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs mt-1 inline-block">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;