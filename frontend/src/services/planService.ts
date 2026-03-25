import axiosClient from "../api/axiosClient";
import { PLAN_ENDPOINTS } from "../api/endpoints";
import type { Macros } from "../types";

export const PlanService = {

    getDailyMacros: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuario no autenticado");
            }

            const { data } = await axiosClient.get<Macros>(PLAN_ENDPOINTS.MACROS_DAILY, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return data;
        } catch (error) {
            console.error("Error obteniendo macronutrientes diarios:", error);
            throw error;
        }
    },
};

export interface UserActualizarDiaResponse {
    es_dia_actualizar_dieta: boolean;
    mensaje_actualizacion: string | null;
}

export const getUserActualizarDia = async (): Promise<UserActualizarDiaResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuario no autenticado");

    const { data } = await axiosClient.get<UserActualizarDiaResponse>(
        PLAN_ENDPOINTS.ACTUALIZAR_DIA,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface CambiarTipoDietaRequest {
    tipo_dieta: "Presupuesto" | "Disponible";
    presupuesto_semanal?: number;
}

export interface CambiarTipoDietaResponse {
    mensaje: string;
    tipo_dieta: "Presupuesto" | "Disponible";
    presupuesto_semanal?: number | null;
}

export const cambiarTipoDieta = async (
    payload: CambiarTipoDietaRequest
): Promise<CambiarTipoDietaResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.put<CambiarTipoDietaResponse>(
        PLAN_ENDPOINTS.CAMBIAR_TIPO_DIETA,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface CambiarDiaActualizarRequest {
    dia_actualizar_dieta: string;
}

export interface CambiarDiaActualizarResponse {
    mensaje: string;
    dia_actualizar_dieta: string;
}

export const cambiarDiaActualizar = async (
    payload: CambiarDiaActualizarRequest
): Promise<CambiarDiaActualizarResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.put<CambiarDiaActualizarResponse>(
        PLAN_ENDPOINTS.CAMBIAR_DIA_ACTUALIZAR,
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

export interface ActualizarDietaResponse {
    200: string;
}

export const actualizarDieta = async (): Promise<ActualizarDietaResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<ActualizarDietaResponse>(
        PLAN_ENDPOINTS.ACTUALIZAR_DIETA,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return data;
};