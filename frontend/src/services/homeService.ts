import axiosClient from "../api/axiosClient";
import { HOME_ENDPOINTS } from "../api/endpoints";
import type { HomeResponse } from "../types";

export const HomeService = {
    getHome: async (): Promise<HomeResponse> => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Usuario no autenticado");
        }

        const { data } = await axiosClient.get<HomeResponse>(
            HOME_ENDPOINTS.GET_HOME,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    },
};
