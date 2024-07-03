// src/components/chat/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  chatId: string;
  socket: Socket;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatName, setChatName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit('join_chat', chatId);
    socket.on('chat_history', (chatHistory: { name: string; messages: Message[] }) => {
      setChatName(chatHistory.name);
      setMessages(chatHistory.messages);
    });
    socket.on('new_message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leave_chat', chatId);
      socket.off('chat_history');
      socket.off('new_message');
    };
  }, [socket, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('send_message', { chatId, content: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gray-200 p-4 flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <h2 className="text-lg font-semibold">{chatName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'me' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-green-500 text-white'
                  : 'bg-white'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-gray-200">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-l-full p-2"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-r-full"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;