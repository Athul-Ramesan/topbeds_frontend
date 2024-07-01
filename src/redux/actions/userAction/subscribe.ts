import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/instances";
import { ApiError, config, handleError } from "../../../config/config";
import { AxiosError } from "axios";
import { IAddress } from "../../../interface/IAddress";

export const subscribe = createAsyncThunk('booking/subscribe',async(subscribeData:{userId:string, planId:string},{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.post('http://localhost:3003/subscription/subscribe',subscribeData,config)
        console.log("🚀 ~ subscribe ~ data:", data)
        return data
    } catch (error:any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})