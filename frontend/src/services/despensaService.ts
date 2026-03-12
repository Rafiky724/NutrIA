import axiosClient from "../api/axiosClient";
import { DESPENSA_ENDPOINTS } from "../api/endpoints";


export interface Ingrediente {
    nombre: string;
}

export interface IngredientesUsuarioResponse {
    ingredientes: Ingrediente[];
}

export const DespensaService = {
    getIngredientesUsuario: async (): Promise<IngredientesUsuarioResponse> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Usuario no autenticado");

            const { data } = await axiosClient.get<IngredientesUsuarioResponse>(
                DESPENSA_ENDPOINTS.GET_INGREDIENTES,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return data;
        } catch (error) {
            console.error("Error obteniendo ingredientes del usuario:", error);
            throw error;
        }
    },
};