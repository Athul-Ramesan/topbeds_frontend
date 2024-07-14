// SocketContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatBaseUrl } from '../config/config';
import { useAppSelector } from '../redux/store';
import toast from 'react-hot-toast';

// interface User {
//   id: string;
//   name: string;
// }

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

interface SocketProviderProps{
  children: React.ReactNode;
}
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useAppSelector(state => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (user?._id) {
      const newSocket = io(ChatBaseUrl, {
        query: { userId: user._id },
      });

      setSocket(newSocket);

      newSocket.on('incomingCall',({data})=>{
        console.log(data,'incoming dataa')
        toast((t) => (
          <div className="bg-green-100 p-4 rounded-md">
            <p className="font-medium">Incoming call</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  window.location.href = data.link;
                  toast.dismiss(t.id);
                }}
              >
                Join
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => toast.dismiss(t.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ), {
          duration: 20000, 
          position: 'top-right',
        });
      })
      newSocket.on('connect', () => setIsConnected(true));
      newSocket.on('disconnect', () => setIsConnected(false));
      newSocket.on('online_users', (users: string[]) => setOnlineUsers(users));
      newSocket.on('user_connected', ({ userId }) => setOnlineUsers(prev => [...prev, userId]));
      newSocket.on('user_disconnected', ({ userId }) => setOnlineUsers(prev => prev.filter(id => id !== userId)));

      return () => {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('online_users');
        newSocket.off('user_connected');
        newSocket.off('user_disconnected');
        newSocket.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};