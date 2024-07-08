import { IUserSignupData } from "./IUserSignup";

export interface IMessage {
    chatId?:string
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