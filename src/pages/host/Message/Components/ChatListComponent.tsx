// ChatListComponent.tsx

import { FC, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { IChat, IMessage } from '../../../../interface/chatInterfaces';
import { useSocket } from '../../../../context/SocketContext';
import { useAppSelector } from '../../../../redux/store';
import { IUserSignupData } from '../../../../interface/IUserSignup';
import { ChatListSkeleton } from '../../../../components/Skeltons/ChatListSkelton';

interface ChatListComponentProps {
    chatList: IChat[];
    setChatList: (chatList: IChat[]) => void;
    chatListFetchingLoading: boolean;
    onChatSelect: (chat: IChat) => void;
}

const ChatListComponent: FC<ChatListComponentProps> = ({
    chatList,
    setChatList,
    chatListFetchingLoading,
    onChatSelect,
}) => {
    const { socket, onlineUsers } = useSocket();
    const { user } = useAppSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (socket) {
            socket.on('new_message_send', (message: IMessage) => {
                console.log("🚀 ~ socket.on ~new_message:", message)
                // setChatList((chatList:IChat[]) =>{
                //     chatList?.map((chat:IChat) => {
                //         if (chat._id === message.chatId) {
                //             return {
                //                 ...chat,
                //                 messages: [...chat.messages, message],
                //             } as IChat;
                //         }
                //         return chat as IChat;
                //     })
                // }
                // );
            });

            return () => {
                socket.off('new_message_send');
            };
        }
    }, [socket, setChatList]);

    const isUserOnline = (userId: string) => onlineUsers.includes(userId);

    const filteredChatList = chatList?.filter(chat =>
        chat.participants.some(
            (participant:any) =>
                participant._id !== user?._id &&
                participant.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    console.log(filteredChatList,'fi;tereeeeeeeeed')

    return (
        <div className="w-1/3 h-full border-r border-gray-300 overflow-hidden flex flex-col">
            <div className="p-4 w-full">
                <div className="flex items-center justify-between border rounded-xl">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full p-2 pl-10 border-none rounded-lg outline-none "
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Search className="  text-gray-400 m-3" size={24} />
                </div>
            </div>
            {chatListFetchingLoading ? (
                <ChatListSkeleton />
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {filteredChatList?.map((chat:any) => {
                        const otherParticipant = chat.participants.find((p:any) => p._id !== user?._id) as IUserSignupData;
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        return (
                            <div
                                key={chat._id}
                                className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                                onClick={() => onChatSelect(chat)}
                            >
                                <div className="relative">
                                    <img
                                        src={otherParticipant.profileImage || '/default-avatar.png'}
                                        alt={String(otherParticipant.firstName)}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {isUserOnline(otherParticipant._id!) && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold">{otherParticipant.firstName} {otherParticipant.lastName}</h3>
                                    <p className="text-sm text-gray-500 truncate">{lastMessage?.content}</p>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(lastMessage?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ChatListComponent;