import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../config/instances"
import { ApiError, config, handleError } from "../../../config/config"
import { AxiosError } from "axios"

interface UpdateProfileImagePayload {
    _id?: string | null ;
    image: string;
  }
  
  export const updateProfileImage = createAsyncThunk<
    any, // Adjust this to the correct type based on your API response
    UpdateProfileImagePayload,
    {
      rejectValue: any;
    }
  >(
    'user/update-profile-image',
    async ({ _id, image }, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post(
          '/user/update-profile-image',
          { _id, image },
          config
        );
        return data;
      } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
      }
    }
  );