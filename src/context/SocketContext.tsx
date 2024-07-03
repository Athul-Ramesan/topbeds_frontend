import { FC, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatBaseUrl } from "../config/config";

interface User{
  id:string;
  name:string
}

interface SocketContextType{
  socket:Socket | null
  isConnected: boolean
  onlineUsers: User[]
}
interface SocketProviderProps{
  children: React.ReactNode
  }
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: []
})


export const useSocket = ()=> useContext(SocketContext)

export const SocketProvider : FC <SocketProviderProps>= ({children})=>{

  const [socket , setSocket] = useState<Socket | null>(null)
  const [isConnected , setIsConnected] = useState<boolean>(false)
  const [onlineUsers , setOnlineUsers] = useState<User[]>([])

  useEffect(()=>{
    const newSocket = io(ChatBaseUrl)
    setSocket(newSocket)
    newSocket.on("connect",()=>setIsConnected(true))
    newSocket.on("disconnect",()=>{
      setIsConnected(false)
      // setOnlineUsers([])
      setSocket(null)
    })
    newSocket.on("online_users", (users:User[])=>{
      setOnlineUsers(users)
    })
    newSocket.on('user_connected',(user:User)=>{
      setOnlineUsers(prevUsers=>[...prevUsers,user])
    })
    newSocket.on('user_disconnected',(user:User)=>{
      setOnlineUsers(prevUsers=>prevUsers.filter(prevUser=>prevUser.id!==user.id))
      })

      return ()=>{
        newSocket.off("online_users")
        newSocket.off("user_connected")
        newSocket.off("user_disconnected")
        newSocket.close()
      }
  },[])
  return (
    <SocketContext.Provider value={{socket , isConnected , onlineUsers}}>
      {children}
    </SocketContext.Provider>
  )
}