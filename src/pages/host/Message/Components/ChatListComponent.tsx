import { Search, Send } from "lucide-react"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { IUserSignupData } from "../../../../interface/IUserSignup"
import { useSocket } from "../../../../context/SocketContext"
import { useAppSelector } from "../../../../redux/store"
import { ChatListSkeleton } from "../../../../components/Skeltons/ChatListSkelton"
import { VideoCameraIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline"
import { MdOutlineVideoCall, MdVideoCall } from "react-icons/md"
import { RiVideoChatFill } from "react-icons/ri"


export interface IMessage {
    _id: string
    sender: IUserSignupData;
    receiverId?: string
    receiver: IUserSignupData;
    content: string;
    contentType: string;
    receiverSeen: boolean;
}
export interface IChat {
    _id: string
    participants: IUserSignupData[]
    // type:string
    lastSeen: {
        participant: IUserSignupData,
        seenAt: Date
    }
    messages: IMessage[]
    requestStatus: string;
}
interface ChatListComponentProps {
    chatList: IChat[];
    setChatList: (chatList: IChat[]) => void
    chatListFetchingLoading: boolean
}
const ChatListComponent: FC<ChatListComponentProps> = ({ chatList, setChatList, chatListFetchingLoading }) => {
    const { socket, isConnected, onlineUsers } = useSocket();
    const [isChatSelected, setIsChatSelected] = useState(false)

    const [selectedChat, setSelectedChat] = useState<IChat>()
    const [contentType, setContentType] = useState('')
    const [selectedReceiver, setSelectedReceiver] = useState<IUserSignupData>()
    const [senderMessages, setSenderMessages] = useState<IMessage[]>([])
    const [receiverMessages, setReceiverMessages] = useState<IMessage[]>([])
    const [message, setMessage] = useState('')
    const [chatId, setChatId] = useState('')
    const bottomRef = useRef<HTMLDivElement | null>(null)
    const { user } = useAppSelector(state => state.user)
    console.log("🚀 ~ ChatListComponent ~ onlineUsers:", onlineUsers)
    console.log("🚀 ~ ChatListComponent ~ isConnected:", isConnected)
    console.log("🚀 ~ ChatListComponent ~ socket:", socket)

    useEffect(() => {

        socket?.on("new_message_send", (message: IMessage) => {
            if (message.sender === user?._id) {
                setSenderMessages(prev => [...prev, message])
            } else {
                setReceiverMessages(prev => [...prev, message])
            }
        })

    }, [socket])
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
    }, [chatId]);
    const onChatClick = (chatId: string) => {

        socket?.emit('join_chat', chatId)
        setChatId(chatId)
        const selectedChat: IChat = chatList.find(chat => chat._id === chatId)!
        setSelectedChat(selectedChat)
        const receiver = selectedChat.participants.find(participant => participant._id !== user?._id)
        setSelectedReceiver(receiver!)
        const selectedChatMessages = selectedChat.messages
        console.log("🚀 ~ onChatClick ~ selectedChatMessages:", selectedChatMessages)
        const senderMessages = selectedChatMessages.filter(senderMessage => senderMessage.sender._id === user?._id)
        setSenderMessages(senderMessages)
        const receiverMessages = selectedChatMessages.filter(senderMessage => senderMessage.sender._id !== user?._id)
        setReceiverMessages(receiverMessages)

        setIsChatSelected(true)
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
        setContentType('text')
    }
    const handleSubmitMessage = () => {
        console.log('before sending message socket')
        const messageData = {
            receiverId: selectedReceiver?._id,
            content: message,
            contentType: contentType,
            chatId
        }
        socket?.emit('new_message', messageData)
        console.log('after sending message socket')
    }
    return (
        <>
            <div className="w-1/2 h-full border-x border-gray-300 px-2">
                <div className="w-full h-20 flex items-center ">
                    <div className="flex w-full  h-10 items-center rounded-lg border">
                        <input type="text" placeholder="search user..." className=" bg-transparent outline-none border-none" />
                        <Search className="me-2" size={27} />
                    </div>
                </div>
                {chatListFetchingLoading ? (
                    <ChatListSkeleton />
                ) :
                    (
                        <div className="h-full w-full overflow-y-auto">
                            {
                                chatList.map((chat, index) => (
                                    <div key={index}
                                        onClick={() => onChatClick(chat._id)}
                                        className="cursor-pointer  h-16 border-x-0 flex border items-center">
                                        <div className="size-12 rounded-full">
                                            <img sizes="" className=" size-full object-cover rounded-full" src="/athul.JPG" alt="" />
                                        </div>
                                        <div className="h-full w-full flex flex-col py-1 px-2">
                                            <h1 className="font-bold">
                                                {chat.participants
                                                    .filter(participant => participant._id != user?._id)
                                                    .map((participant) => participant.firstName)
                                                }</h1>
                                            <p className="text-gray-500 line-clamp-2">{
                                                chat.messages
                                                    .map(message => message.content)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    )}
            </div>

            <div className="h-full  w-full border  flex flex-col">
                {/* header */}
                {selectedChat ? (
                    <>

                        <div className="w-full px-4  h-20 border-b  border-gray-400 shadow-md flex items-center justify-between ">
                            <div className="flex items-center h-ful">
                                <div className="h-full p-1 w-16 rounded-full flex items-center">
                                    <img sizes="" className="size-10 object-cover rounded-full" src="/athul.JPG" alt="" />
                                </div>
                                <div>
                                    <h1 className=" px-4">{selectedReceiver?.firstName} {selectedReceiver?.lastName}</h1>
                                </div>
                            </div>
                            <div className="h-full flex items-center px-10">
                                <RiVideoChatFill size={30} />
                            </div>

                        </div>

                        {/* messages window */}
                        <div ref={bottomRef} className="w-full h-full overflow-y-auto flex flex-col justify-between bg-[url(/whatsapp.jpg)] bg-contain">

                            <div className="h-full p-2 overflow-auto">
                                {receiverMessages.length > 0 && (
                                    receiverMessages.map((message, index) => (
                                        <div key={index} className="chat chat-start">
                                            <div className="chat-bubble">{message.content}</div>
                                        </div>
                                    ))
                                )}
                                {senderMessages.length > 0 && (
                                    senderMessages.map((message, index) => (
                                        <div key={index} className="chat chat-end">
                                            <div className="chat-bubble">{message.content}</div>
                                        </div>
                                    ))
                                )}
                            </div>


                            <div className="h-20 flex gap-2 items-center px-2">
                                <input
                                    onChange={onChangeInput}
                                    type="text" placeholder="Type a message..." className="px-3 outline-none placeholder:px-2" style={{ borderRadius: '25px' }} />
                                <button
                                    onClick={handleSubmitMessage}
                                    className="size-10 flex items-center justify-center bg-blue-500 text-white rounded-full duration-300 ">
                                    <Send className="w-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) :
                    (
                        <>
                            <div className="w-full px-4 h-20 border-b bg-bg-300 border-gray-300 shadow-md flex items-center ">
                                <div className="h-full p-1 w-16 rounded-full flex items-center">

                                </div>
                                <div>
                                    <h1 className=" px-4">{selectedReceiver?.firstName} {selectedReceiver?.lastName}</h1>
                                </div>

                            </div>
                            <div className="flex  bg-[url(/whatsapp.jpg)]  justify-center items-center w-full h-full text-font-color-200 text-xl font-semibold">Select a chat to start messaging.....</div>
                        </>
                    )}
            </div>
        </>
    )
}

export default ChatListComponent
