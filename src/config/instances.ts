import axios, {AxiosInstance}from "axios";
import { ApiBaseUrl, BookingBaseUrl } from "./config";

export const axiosInstance :AxiosInstance = axios.create({ baseURL:ApiBaseUrl });
export const bookingApiInstance:AxiosInstance = axios.create({baseURL:BookingBaseUrl})
