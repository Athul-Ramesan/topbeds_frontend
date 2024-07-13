import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance, userApiInstance } from "../../../config/instances"
import { ApiError, config, handleError } from "../../../config/config"
import { AxiosError } from "axios"

interface UpdatePasswordPayload {
    _id?: string | null;
    newPassword: string;
    oldPassword: string
}

export const UpdatePasswordAction = createAsyncThunk<
    any,
    UpdatePasswordPayload,
    {
        rejectValue: any;
    }
>(
    'user/update-user-password',
    async ({ _id, oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const { data } = await userApiInstance.patch(
                '/update-user-data',
                {
                    _id,
                    oldPassword,
                    newPassword
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