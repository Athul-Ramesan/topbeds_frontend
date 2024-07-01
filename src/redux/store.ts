import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./reducers/user/userSlice"
import adminReducer from './reducers/admin/adminSlice'

export type AppDispatch = typeof store.dispatch;

const reducer = combineReducers({
    user:userReducer,
    admin:adminReducer
})

export const store = configureStore({
    reducer : reducer
})

export const useAppDispatch :()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector



