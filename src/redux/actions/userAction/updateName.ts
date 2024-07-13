import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance, userApiInstance } from "../../../config/instances"
import { ApiError, config, handleError } from "../../../config/config"
import { AxiosError } from "axios"

interface UpdateNamePayload {
    _id?: string | null;
    firstName: string;
    lastName: string
}

export const UpdateNameAction = createAsyncThunk<
    any,
    UpdateNamePayload,
    {
        rejectValue: any;
    }
>(
    'user/update-user-name',
    async ({ _id, firstName, lastName }, { rejectWithValue }) => {
        try {
            const { data } = await userApiInstance.patch(
                '/update-user-data',
                {
                    _id,
                    firstName,
                    lastName
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