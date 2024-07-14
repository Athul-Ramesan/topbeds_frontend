import  { AxiosError } from "axios";

export const config ={
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials: true,
    credentials: "include"
}
export const multiplefileConfig= {
  headers: {
    "Content-Type": "multipart/form-data",
    },
}
export const ApiBaseUrl: string = "http://localhost:5000"

export const AuthBaseUrl: string = "https://topbeds.smasher.shop/api/auth"
export const UserBaseUrl : string = "https://topbeds.smasher.shop/api/user"
export const PropertyBaseUrl : string = "https://topbeds.smasher.shop/api/property"
export const BookingBaseUrl: string = "https://topbeds.smasher.shop/api/booking"
export const ChatBaseUrl : string = "https://topbeds.smasher.shop/api/chat"
export const SocketUrl :string = "https://topbeds.smasher.shop"

export interface ApiError {
    message : string,
    errors: any
}
export const handleError = (
    error: AxiosError<ApiError>,
    rejectWithValue: (value: string | unknown) => string | unknown
  ) => {
    if (error.response && error.response.data.message) {
      console.log(error.response,'------------');
      
      return rejectWithValue(error.response.data.message);
    } else {
      console.log(error.response?.data.errors[0].message,'------------');
      return rejectWithValue(error.response?.data.errors[0].message);
    }
  };