

export interface IUserData{
    _id: any;
    email:string;
    role?:string | null;
    message: string;
}
export interface IUserState{
    user:IUserData|null;
    loading:boolean;
    error:any;
}
export interface IUserSelector{
    user:IUserState;
    loading:boolean;
    error:null | string 
}