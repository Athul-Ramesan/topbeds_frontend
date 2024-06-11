import { createSlice } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { IUserData } from "../../../interface/IUserSlice";
import { getAllUsersAction } from "../../actions/adminActions/users";

interface initialState {
    users: IUserSignupData[] | null,
    error: Error | null,
    loading: boolean
}

const initialState: initialState = {
    users: [],
    error: null,
    loading: false
}
const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setErrorDisable: (state: initialState) => {
            state.error = null;
        },
        setUsersNull: (state: initialState) => {
            state.users = null
        },
        setLoadingFalse: (state: initialState) => {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersAction.fulfilled,(state,action)=>{
                state.users = action.payload.data as IUserSignupData[]
                state.error= null
                state.loading= true
            })
            .addCase(getAllUsersAction.pending,(state)=>{
                state.error= null
                state.loading= true
            })
            .addCase(getAllUsersAction.rejected,(state,action)=>{
                state.error= action.error as Error
                state.loading= false
            })

    }
})


export const {setErrorDisable ,setLoadingFalse,setUsersNull} = adminSlice.actions
export default adminSlice.reducer;