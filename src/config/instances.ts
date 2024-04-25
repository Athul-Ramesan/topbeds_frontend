import axios, {AxiosInstance}from "axios";

const authApiBaseUrl: string = "http://localhost:3000"
export const authInstance :AxiosInstance = axios.create({ baseURL:authApiBaseUrl });
