import axios, {AxiosInstance}from "axios";
import { ApiBaseUrl } from "./config";

export const axiosInstance :AxiosInstance = axios.create({ baseURL:ApiBaseUrl });
