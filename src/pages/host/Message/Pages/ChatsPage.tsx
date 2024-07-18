import { useEffect, useState } from "react"
import ChatListComponent from "../Components/ChatListComponent"
import ChatWindowComponent from "../Components/ChatWindowComponent"
import { chatApiInstance } from "../../../../config/instances"
import { useAppSelector } from "../../../../redux/store"
import toast from "react-hot-toast"
import { useSocket } from "../../../../context/SocketContext"
import { IChat, IMessage } from "../../../../interface/chatInterfaces"
import { useNavigate } from "react-router-dom"

const ChatsPage = () => {
    const [chatList, setChatList] = useState<IChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
    const [chatListFetchingLoading, setChatListFetchingLoading] = useState(false);
    const { socket } = useSocket();
    const { user } = useAppSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(() => {
        fetchChats();
    }, [user]);
    const fetchChats = async () => {
        try {
            setChatListFetchingLoading(true);
            console.log('inside fetch chaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat');
            
            const response = await chatApiInstance.get(`/get-chats/${user?._id}`);
            
            console.log("🚀 ~ fetchChats ~ response:", response)
            if (response.status === 200) {
                console.log("🚀 ~ fetchChats ~ response when reloading:", response)
                setChatList(response.data);
            } else {
                toast.error("Couldn't fetch your chats now, please try again later");
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
            toast.error("An error occurred while fetching chats");
        } finally {
            setChatListFetchingLoading(false);
        }
    };


    const updateChatList = (message: IMessage) => {
        console.log("🚀 ~ updateChatList ~ message:", message)
        console.log(chatList,'chatlistttt')
        setChatList((prevList:any) => {
            const updatedList = prevList?.map((chat:any) => {
                if (chat._id === message.chatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, message],
                    };
                }
                return chat;
            });

           
            return updatedList?.sort((a:any, b:any) => {
                const aLastMessage = a.messages[a.messages.length - 1];
                const bLastMessage = b.messages[b.messages.length - 1];
                return new Date(bLastMessage.createdAt).getTime() - new Date(aLastMessage.createdAt).getTime();
            });
        });


        if (selectedChat && message.chatId === selectedChat._id) {
            setSelectedChat((prevChat) => {
                if (prevChat) {
                    return {
                        ...prevChat,
                        messages: [...prevChat.messages, message],
                    };
                }
                return null;
            });
        }
    };
    const handleChatSelect = (chat: IChat) => {
        setSelectedChat(chat);
    };
    useEffect(() => {
        if (socket) {
            socket.on('incoming_video_call', ({ callerId, roomID }) => {
                navigate(`/user/video-call?callerId=${callerId}&roomID=${roomID}`);
              });
            socket.on("new_message_send", (message: IMessage) => {
                updateChatList(message);
            });

            return () => {
                socket.off("new_message_send");
            };
        }
    }, [socket]);


    return (
        <div className=" h-[510px] w-full mt-3 flex overflow-hidden flex-col">
            {/* <div className="w-full h-10 ">
                <h1>Chats</h1>
            </div> */}
            <div className="w-full h-full flex">
                <ChatListComponent
                    chatList={chatList}
                    setChatList={setChatList}
                    chatListFetchingLoading={chatListFetchingLoading}
                    onChatSelect={handleChatSelect}
                />
                {/* <ChatListComponent chatListFetchingLoading={chatListFetchingLoading} chatList={chatList} setChatList={setChatList} /> */}
                <ChatWindowComponent selectedChat={selectedChat} />
            </div>
        </div>
    )
}

export default ChatsPage
