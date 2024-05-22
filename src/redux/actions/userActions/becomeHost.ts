import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/instances";
import { ApiError, config, handleError } from "../../../config/config";
import { AxiosError } from "axios";
import { IAddress } from "../../../interface/IAddress";

export const becomeHostAction = createAsyncThunk('user/become-host',async(addressCredentials:IAddress,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post('/user/become-host',addressCredentials,config)
        console.log("🚀 ~ becomeHost ~ data:", data)
        return data
    } catch (error:any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})