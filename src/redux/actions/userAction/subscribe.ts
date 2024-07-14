import { createAsyncThunk } from "@reduxjs/toolkit";
import {  bookingApiInstance } from "../../../config/instances";
import { ApiError, config, handleError } from "../../../config/config";
import { AxiosError } from "axios";

export const subscribe = createAsyncThunk('booking/subscribe',async(subscribeData:{userId:string, planId:string},{rejectWithValue})=>{
    try {
        const {data} = await bookingApiInstance.post('/subscription/subscribe',subscribeData,config)
        console.log("🚀 ~ subscribe ~ data:", data)
        return data
    } catch (error:any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})