import axios, {AxiosInstance}from "axios";
import { ApiBaseUrl, AuthBaseUrl, BookingBaseUrl, ChatBaseUrl, PropertyBaseUrl, UserBaseUrl } from "./config";

export const axiosInstance :AxiosInstance = axios.create({ baseURL:ApiBaseUrl });

export const bookingApiInstance:AxiosInstance = axios.create({baseURL:BookingBaseUrl})
export const chatApiInstance:AxiosInstance = axios.create({baseURL:ChatBaseUrl})
export const propertyApiInstance: AxiosInstance = axios.create({baseURL:PropertyBaseUrl})
export const userApiInstance: AxiosInstance = axios.create({baseURL:UserBaseUrl})
export const authApiInstance: AxiosInstance = axios.create({baseURL:AuthBaseUrl})