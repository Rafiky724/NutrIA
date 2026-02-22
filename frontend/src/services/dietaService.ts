import axiosClient from "../api/axiosClient";
import { DIET_ENDPOINTS } from "../api/endpoints";

export const DietService = {

    createDiet: async (): Promise<string> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuario no autenticado");
            }

            const { data } = await axiosClient.get<string>(DIET_ENDPOINTS.CREATE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return data;
        } catch (error) {
            console.error("Error creando dieta:", error);
            throw error;
        }
    },

    iniciarDieta: async (payload: {
        tipo_inicio: "hoy" | "manana" | "fecha";
        siguiente_comida?: string;
        fecha_inicio?: string;
        dia_actualizar_dieta: string;
    }): Promise<string> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuario no autenticado");
            }

            const { data } = await axiosClient.post<string>(
                DIET_ENDPOINTS.START,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return data;
        } catch (error) {
            console.error("Error iniciando dieta");
            throw error;
        }
    },

};


