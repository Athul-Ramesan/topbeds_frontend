import { createAsyncThunk } from "@reduxjs/toolkit";
import {  userApiInstance } from "../../../config/instances";
import { ApiError,  handleError } from "../../../config/config";
import { AxiosError } from "axios";

interface queryProps{
    limit?:number
    page?: number
    search?: string
}
//get all users
export const getAllUsersAction = createAsyncThunk('admin/users/get-all-users',async(queries:queryProps,{rejectWithValue})=>{
    try {
        console.log(queries,"queriesss")
        const {data} = await userApiInstance.get(`/get-all-users`,{params:queries, withCredentials:true})
        
        console.log("🚀 ~ getAllUsersAction ~ data:", data)
        return data
    } catch (error:any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})