import { useEffect, useState } from "react"
import ChatListComponent, { IChat } from "../Components/ChatListComponent"
import ChatWindowComponent from "../Components/ChatWindowComponent"
import { chatApiInstance } from "../../../../config/instances"
import { useAppSelector } from "../../../../redux/store"
import toast from "react-hot-toast"
import { useSocket } from "../../../../context/SocketContext"

const ChatsPage = () => {
    const [chatList, setChatList] = useState<IChat[]>([])
    const { user } = useAppSelector(state => state.user)
    const [ chatListFetchingLoading, setChatListFetchingLoading ] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const socket = useSocket()

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setChatListFetchingLoading(true)
                const response = await chatApiInstance.get(`/chat/get-chats/${user?._id}`)
                if (response.statusText === "OK") {
                    console.log("🚀 ~ fetchChats ~ response🥶🥶🥶🥶:", response)
                    console.log(response.data)
                    setChatList(response.data)
                    setChatListFetchingLoading(false)
                } else {
                    console.log("🚀 ~ fetchChats ~ response:", response)
                    toast.error('couldnt fetch your chat now, please try after sometimes')
                }
            } catch (error: any) {
                console.log("🚀 ~ fetchChats ~ error:", error)
                
                setChatListFetchingLoading(false)
            }finally{
                setChatListFetchingLoading(false)
            }
        }
        fetchChats()
    }, [])

    
  useEffect(() => {
    console.log("Socket changed:", socket);

    
  }, [socket]);

    return (
        <div className=" h-[510px] w-full mt-3 flex overflow-hidden flex-col">
            {/* <div className="w-full h-10 ">
                <h1>Chats</h1>
            </div> */}
            <div className="w-full h-full flex">
                <ChatListComponent chatListFetchingLoading={chatListFetchingLoading}  chatList={chatList} setChatList={setChatList} />
                <ChatWindowComponent />
            </div>
        </div>
    )
}

export default ChatsPage
