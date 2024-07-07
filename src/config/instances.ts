import axios, {AxiosInstance}from "axios";
import { ApiBaseUrl, BookingBaseUrl, ChatBaseUrl } from "./config";

export const axiosInstance :AxiosInstance = axios.create({ baseURL:ApiBaseUrl });
export const bookingApiInstance:AxiosInstance = axios.create({baseURL:BookingBaseUrl})
export const chatApiInstance:AxiosInstance = axios.create({baseURL:ChatBaseUrl})
