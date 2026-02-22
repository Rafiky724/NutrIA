import axiosClient from "../api/axiosClient";
import { AUTH_ENDPOINTS } from "../api/endpoints";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";

export const registerUser = async (
    payload: RegisterRequest
): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER,
        payload
    );
    return data;
};

export const loginUser = async (
    payload: LoginRequest
): Promise<AuthResponse> => {
    const formData = new URLSearchParams();

    formData.append("username", payload.email);
    formData.append("password", payload.password);

    const { data } = await axiosClient.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return data;
};


