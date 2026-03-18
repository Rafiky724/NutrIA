import axiosClient from "../api/axiosClient";
import { MASCOTA_ENDPOINTS } from "../api/endpoints";

export interface CrearMascotaRequest {
    tipo_mascota: "nutria" | "perro" | "gato";
    nombre: string;
}

export interface CrearMascotaResponse {
    mensaje: string;
}

export const crearMascota = async (
    payload: CrearMascotaRequest
): Promise<CrearMascotaResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<CrearMascotaResponse>(
        MASCOTA_ENDPOINTS.CREAR,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};