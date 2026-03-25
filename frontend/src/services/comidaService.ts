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

export interface ReemplazarComidaRequest {
    descripcion: string;
}

export interface ReemplazarComidaResponse {
    mensaje: string;
    comida: {
        tipo_comida: string;
        hora_sugerida?: string;
        hora_real?: string | null;
        calorias: number;
        proteinas: number;
        carbohidratos: number;
        grasas: number;
        precio_estimado?: number | null;
        completada: boolean;
        verificada: boolean;
        ingredientes: string[];
    };
    totales_comida: {
        calorias: number;
        proteinas: number;
        carbohidratos: number;
        grasas: number;
    };
}

export const reemplazarComidaActual = async (
    payload: ReemplazarComidaRequest
): Promise<ReemplazarComidaResponse> => {
    const { data } = await axiosClient.put<ReemplazarComidaResponse>(
        COMIDAS_ENDPOINTS.REEMPLAZAR_ACTUAL,
        payload,
        { headers: getAuthHeaders() }
    );

    return data;
};

export interface AnalizarComidaResponse {
    match: boolean;
}

export const analizarComida = async (
    file: File
): Promise<AnalizarComidaResponse> => {
    if (!file.type.startsWith("image/")) {
        throw new Error("El archivo debe ser una imagen (jpg, png, etc.)");
    }

    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        throw new Error("La imagen no puede superar los 2MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosClient.post<AnalizarComidaResponse>(
        COMIDAS_ENDPOINTS.ANALIZAR_COMIDA,
        formData,
        {
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};