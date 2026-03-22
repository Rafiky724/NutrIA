import axiosClient from "../api/axiosClient";
import { COMIDAS_ENDPOINTS } from "../api/endpoints";

export interface CompletarComidaRequest {
    comida_id: string;
}

export interface CancelarComidaRequest {
    comida_id: string;
}

export interface RachaRequest {
    comida_id: string;
}

export interface ComidaResponse {
    mensaje: string;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const completarComida = async (
    payload: CompletarComidaRequest
): Promise<ComidaResponse> => {
    const { data } = await axiosClient.post<ComidaResponse>(
        COMIDAS_ENDPOINTS.COMPLETAR,
        payload,
        {
            headers: getAuthHeaders(),
        }
    );

    return data;
};

export const cancelarComida = async (
    payload: CancelarComidaRequest
): Promise<ComidaResponse> => {
    const { data } = await axiosClient.post<ComidaResponse>(
        COMIDAS_ENDPOINTS.CANCELAR,
        payload,
        {
            headers: getAuthHeaders(),
        }
    );

    return data;
};

export const salvarRacha = async (): Promise<ComidaResponse> => {
    const { data } = await axiosClient.post<ComidaResponse>(
        COMIDAS_ENDPOINTS.SALVAR_RACHA,
        {},
        { headers: getAuthHeaders() }
    );
    return data;
};

export const perderRacha = async (): Promise<ComidaResponse> => {
    const { data } = await axiosClient.post<ComidaResponse>(
        COMIDAS_ENDPOINTS.PERDER_RACHA,
        {},
        { headers: getAuthHeaders() }
    );
    return data;
};