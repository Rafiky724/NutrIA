import axiosClient from "../api/axiosClient";
import { USER_ENDPOINTS } from "../api/endpoints";

export interface HasPlanResponse {
    tiene_plan: boolean;
}

export const getHasPlan = async (): Promise<HasPlanResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<HasPlanResponse>(
        USER_ENDPOINTS.HAS_PLAN,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface UserProgressResponse {
    numero_racha: number;
    cantidad_gemas: number;
}

export const getUserProgress = async (): Promise<UserProgressResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<UserProgressResponse>(
        USER_ENDPOINTS.PROGRESS,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface UserPesoResponse {
    peso_actual: number;
}

export const getUserPeso = async (): Promise<UserPesoResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<UserPesoResponse>(
        USER_ENDPOINTS.PESO,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface UpdatePesoRequest {
    peso_actual: number;
}

export interface UpdatePesoResponse {
    message: string;
}

export const updateUserPeso = async (
    payload: UpdatePesoRequest
): Promise<UpdatePesoResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<UpdatePesoResponse>(
        USER_ENDPOINTS.UPDATE_PESO,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};