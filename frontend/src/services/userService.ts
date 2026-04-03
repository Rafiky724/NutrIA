import axiosClient from "../api/axiosClient";
import { USER_ENDPOINTS } from "../api/endpoints";

export interface HasPlanResponse {
    tiene_plan: boolean;
    dia_iniciado: boolean,
    tiene_mascota: boolean
}

export const getHasPlan = async (): Promise<HasPlanResponse> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<HasPlanResponse>(
        USER_ENDPOINTS.HAS_PLAN,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

type MascotaNav = {
    tipo: string
    fondo_puesto: string,
}

export interface UserProgressResponse {
    numero_racha: number;
    cantidad_gemas: number;
    mascota: MascotaNav;
}

export const getUserProgress = async (): Promise<UserProgressResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<UserProgressResponse>(
        USER_ENDPOINTS.PROGRESS,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface UserPesoResponse {
    peso_actual: number;
}

export const getUserPeso = async (): Promise<UserPesoResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<UserPesoResponse>(
        USER_ENDPOINTS.PESO,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface UpdatePesoRequest {
    peso_actual: number;
}

export interface UpdatePesoResponse {
    message: string;
}

export const updateUserPeso = async (
    payload: UpdatePesoRequest
): Promise<UpdatePesoResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.put<UpdatePesoResponse>(
        USER_ENDPOINTS.UPDATE_PESO,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface Mascota {
    tipo: string;
    nombre?: string;
    nivel?: number;
}

export interface PerfilUsuarioResponse {
    nombre: string;
    apodo: string;
    correo: string;
    genero: string;
    edad: string;
    altura: string;
    peso: string;
    mascota: Mascota | null;
}

export const getUserPerfil = async (): Promise<PerfilUsuarioResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<PerfilUsuarioResponse>(
        USER_ENDPOINTS.PERFIL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface EditarPerfilRequest {
    nombre?: string;
    apodo?: string;
    genero?: string;
    fecha_nacimiento?: string;
    altura_cm?: number;
    peso_actual?: number;
}

export const updateUserPerfil = async (
    payload: EditarPerfilRequest
): Promise<PerfilUsuarioResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.put<PerfilUsuarioResponse>(
        USER_ENDPOINTS.EDITAR_PERFIL,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};