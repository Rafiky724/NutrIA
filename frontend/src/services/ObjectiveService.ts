import axiosClient from "../api/axiosClient";
import { OBJECTIVE_ENDPOINTS } from "../api/endpoints";
import type { DatesTargetResponse } from "../types";

export const objectiveService = {

    getTargetDates: async (): Promise<DatesTargetResponse> => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Usuario no autenticado");
            }

            const { data } = await axiosClient.get<DatesTargetResponse>(
                OBJECTIVE_ENDPOINTS.DATES,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return data;
        } catch (error) {
            console.error("Error obteniendo fechas del objetivo:", error);
            throw error;
        }
    },
};
