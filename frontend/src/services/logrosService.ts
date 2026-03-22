import axiosClient from "../api/axiosClient";
import { LOGROS_ENDPOINTS } from "../api/endpoints";

export interface Logro {
    id_logro: string;
    descripcion: string;
    categoria: string;
    objetivo: number;
    gemas_recompensa: number;
    progreso_actual: number;
    progreso_anterior: number;
    completado: boolean;
    reclamado: boolean;
    fecha_completado: string | null;
}


export interface GetLogrosResponse {
    logros: Logro[];
}

export interface ReclamarLogroRequest {
    id_logro: string;
}

export interface ReclamarLogroResponse {
    mensaje: string;
}

export const getLogrosUsuario = async (): Promise<GetLogrosResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<GetLogrosResponse>(
        LOGROS_ENDPOINTS.GET_ALL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const reclamarLogro = async (
    payload: ReclamarLogroRequest
): Promise<ReclamarLogroResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<ReclamarLogroResponse>(
        LOGROS_ENDPOINTS.RECLAMAR,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};