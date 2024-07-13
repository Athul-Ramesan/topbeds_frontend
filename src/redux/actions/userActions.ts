import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../interface/IUserSignup";
import { AxiosError } from "axios";
import {  authApiInstance, axiosInstance } from "../../config/instances";
import { ApiError, config, handleError } from "../../config/config";
import { IUserLoginData } from "../../interface/IUserLogin";


export const getUserData = createAsyncThunk('auth/get-user-data',async (_,{rejectWithValue})=>{
    try {
        const {data} = await authApiInstance.get('/get-user-data',config)
        console.log("🚀 ~ getUserData ~ data:", data)
        
        return data
    } catch (error:any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})
export const userSignupAction = createAsyncThunk('auth/userSignup', async (userCredentials: IUserSignupData, { rejectWithValue }) => {
    try {
        if (userCredentials.isGoogle) {
            const { data } = await authApiInstance.post('/googleAuth', userCredentials, config)
            console.log(data, 'inside user signup action');
            
            return data 
        }else{
            const { data } = await authApiInstance.post('/signup', userCredentials, config)
            console.log(data, 'inside user signup action');

            return data
        }
    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})

export const userLoginAction = createAsyncThunk(
    'auth/userLogin',
    async (userCredentials: IUserLoginData,
        { rejectWithValue }) => {
        try {
            console.log('im at userLoginAction');
            
            const { data } = await authApiInstance.post("/login", userCredentials, config)
            console.log(data, 'data inside signup action');
            return data
        } catch (error: any) {
            console.log(error);
            
            const axiosError = error as AxiosError<ApiError>
            return handleError(axiosError, rejectWithValue);
        }
    }
)
export const userLogoutAction = createAsyncThunk("auth/userLogOut", async (userCredentials, { rejectWithValue }) => {
    try {
        console.log(userCredentials);
        
        console.log('inside userLoginAction');
        
        const { data } = await authApiInstance.delete("/logout", config);

        console.log(data);

        return data
    } catch (error) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
});

export const sendOtpAction = createAsyncThunk('auth/verify-account/send-otp',async (userCredentials:IUserSignupData, {rejectWithValue})=>{

    try {
        const { data } = await authApiInstance.post('/verify-account/send-otp', userCredentials, config)
        console.log(data,"data inside sendotp action");
        
        return data
    }catch(error:any){
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})
export const verifyOtpAction = createAsyncThunk("auth/verify-account",async (userCredentials:IUserSignupData, {rejectWithValue})=>{
    try {
        const {data} = await authApiInstance.post('/verify-account',userCredentials,config)
        console.log(data,'data inside verifyotpaction');
        return data
    } catch (error) {
        const axiosError = error as AxiosError<ApiError>
        return handleError(axiosError, rejectWithValue);
    }
})
