import axiosClient from "../api/axiosClient";
import { OBJECTIVE_ENDPOINTS } from "../api/endpoints";
import type { DatesTargetResponse } from "../types";

export interface ActualizarObjetivoRequest {
    tipo_objetivo: string;
    peso_objetivo: number;
    cantidad_comidas: string[];
    velocidad_dieta: string;
    nivel_actividad: string;
    tipo_actividad: string;
}

export interface ActualizarObjetivoResponse {
    message: string;
}

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

    actualizarObjetivo: async (
        payload: ActualizarObjetivoRequest
    ): Promise<ActualizarObjetivoResponse> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Usuario no autenticado");

            const { data } = await axiosClient.put<ActualizarObjetivoResponse>(
                OBJECTIVE_ENDPOINTS.ACTUALIZAR,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return data;
        } catch (error) {
            console.error("Error actualizando el objetivo:", error);
            throw error;
        }
    },
};
