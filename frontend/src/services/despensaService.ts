import axiosClient from "../api/axiosClient";
import { DESPENSA_ENDPOINTS } from "../api/endpoints";

export interface Ingrediente {
    nombre: string;
}

export interface IngredientesUsuarioResponse {
    ingredientes: Ingrediente[];
}

export interface ActualizarIngredientesRequest {
    ingredientes: Ingrediente[];
}

export interface ActualizarIngredientesResponse {
    mensaje: string;
    ingredientes: Ingrediente[];
}

export const actualizarIngredientesUsuario = async (
    payload: ActualizarIngredientesRequest
): Promise<ActualizarIngredientesResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<ActualizarIngredientesResponse>(
        DESPENSA_ENDPOINTS.ACTUALIZAR_INGREDIENTES,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return data;
};

export const getIngredientesUsuario = async (): Promise<IngredientesUsuarioResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

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
};