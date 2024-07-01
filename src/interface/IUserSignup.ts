export interface ISubscription {
    plan: string
    startDate: Date
    expiryDate: Date
    active: boolean,
    stripeSessionId: string
}


export interface IUserSignupData {

    firstName?: string | null,
    lastName?:string |  null,
    email?: string |null,
    phone?:string,
    address?: {
        street?:string,
        city:string,
        state:string,
        zip:string,
        phone:string
    }
    _id?:string |null
    password?: string| null ,
    isGoogle?: boolean | null ,
    otp?:string| null  ,
    signupYes?:boolean | null,
    role?:string | null,
    hostStatus?:string,
    profileImage?:string | null,
    isBlocked?: boolean | null,
    createdAt?:  Date | null,
    subscriptions?: ISubscription 

}