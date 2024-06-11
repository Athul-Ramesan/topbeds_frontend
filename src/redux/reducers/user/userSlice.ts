import { createSlice } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { getUserData, sendOtpAction, userLoginAction, userLogoutAction, userSignupAction, verifyOtpAction } from "../../actions/userActions";
import { becomeHostAction } from "../../actions/userAction/becomeHost";
import { IUserData } from "../../../interface/IUserSlice";
import { updateProfileImage } from "../../actions/userAction/updateProfileImage";

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
  },
  setLoadingFalse: (state:initialState)=>{
    state.loading= false
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
      /// user-logout
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
      //send-otp
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
      //verify otp
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
      //getting user data
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
        state.user = action.payload.data as IUserSignupData
      })
      .addCase(becomeHostAction.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(becomeHostAction.pending,(state)=>{
        state.loading = true;
      })
      //updating profile picture
      .addCase(updateProfileImage.fulfilled, (state,action)=>{
        state.loading = false;
        state.user = action.payload.data as IUserSignupData
      })
      .addCase(updateProfileImage.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateProfileImage.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error as string
      })
  }
})
export const { setErrorDisable ,setUserNull} = userSlice.actions
export default userSlice.reducer;