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
export const SocketUrl :string = "https://topbeds.smasher.shop/api"

export interface ApiError {
    message : string,
    errors: any
}
export const stripeApiKey = "pk_test_51PTPcK05vcABQvkG6AA0NInegpeZvuF47iI14eA7Fctgdrm3pQ73du4OV8MqhmS7lENU1Emxt6pKju2S1F9r3uL100QZ2UQkR2"
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