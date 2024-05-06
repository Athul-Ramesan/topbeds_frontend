import { AxiosError } from "axios";

export const config ={
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials: true,
    credentials: "include"
}
export const ApiBaseUrl: string = "http://localhost:5000"


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