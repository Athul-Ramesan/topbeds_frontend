import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../config/instances"
import { ApiError, config, handleError } from "../../../config/config"
import { AxiosError } from "axios"

interface UpdateNamePayload {
    _id?: string | null;
    phone: string;
}

export const UpdatePhoneAction = createAsyncThunk<
    any,
    UpdateNamePayload,
    {
        rejectValue: any;
    }
>(
    'user/update-user-phone',
    async ({ _id, phone }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.patch(
                '/user/update-user-data',
                {
                    _id,
                    phone
                },
                config
            );
            return data;
        } catch (error: any) {
            const axiosError = error as AxiosError<ApiError>;
            return handleError(axiosError, rejectWithValue);
        }
    }
);