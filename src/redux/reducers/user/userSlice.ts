import { createSlice } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { getUserData, sendOtpAction, userLoginAction, userLogoutAction, userSignupAction, verifyOtpAction } from "../../actions/userActions";
import { becomeHostAction } from "../../actions/userAction/becomeHost";
import { IUserData } from "../../../interface/IUserSlice";

interface initialState {
  user: IUserSignupData | null,
  error: string | null,
  loading: boolean | null
}
const initialState: initialState = {
  user: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setErrorDisable: (state: initialState) => {
      state.error = null;
    },
    setUserNull :(state:initialState)=>{
      state.user=null
  }
  },
  extraReducers: (builder) => {
    builder
      //user signup cases
      .addCase(userSignupAction.pending, (state, action) => {
        state.user = action.payload ?? null;
        state.loading = true;
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        console.log(action.payload, 'action.payload??????????????????????');

        // const data = action.payload as IUserSignupData;
        // state.user = data; 
        state.loading = false;
      })
      .addCase(userSignupAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // user login  case
      .addCase(userLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserSignupData
      })
      .addCase(userLogoutAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(userLogoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string
      })
      .addCase(userLogoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtpAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        //we can store user here when we get the otp along with userdetails we can send from backend
      })
      .addCase(sendOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtpAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.user = action.payload as IUserSignupData
      })
      .addCase(verifyOtpAction.pending, (state) => {
        state.loading = true
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data as IUserSignupData
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserData.rejected, (state)=>{
        state.loading = false;
      })
      //become host cases
      .addCase(becomeHostAction.fulfilled,(state,action)=>{
        state.loading = false;
        console.log(action.payload.data,'action >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        state.user = action.payload.data as IUserSignupData
      })
      .addCase(becomeHostAction.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(becomeHostAction.pending,(state)=>{
        state.loading = true;
      })
  }
})
export const { setErrorDisable ,setUserNull} = userSlice.actions
export default userSlice.reducer;