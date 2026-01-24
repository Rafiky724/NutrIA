import axiosClient from "../api/axiosClient";
import { USER_ENDPOINTS } from "../api/endpoints";

export interface HasPlanResponse {
    has_plan: boolean;
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

