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

export interface MascotaTienda {
    id: string;
    imagen: string;
    precio_gemas: number;
    comprado: boolean;
    equipado: boolean;
}

export interface MascotaActual {
    tipo: string;
    nombre: string;
}

export interface GetTiendaResponse {
    mascota_actual: MascotaActual;
    mascotas_tienda: MascotaTienda[];
}

export interface ComprarMascotaRequest extends ComprarItemRequest {
  nombre_mascota?: string;
}

export const getTiendaMascotas = async (): Promise<GetTiendaResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<GetTiendaResponse>(
        MASCOTA_ENDPOINTS.TIENDA,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface ItemCategoria {
    id: string;
    imagen: string;
    precio_gemas: number;
    comprado: boolean;
    equipado: boolean;
}

export interface GetItemsCategoriaResponse {
    categoria: string;
    items: ItemCategoria[];
}

export const getItemsCategoria = async (
    categoria: string
): Promise<GetItemsCategoriaResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.get<GetItemsCategoriaResponse>(
        MASCOTA_ENDPOINTS.ITEMS_CATEGORIA(categoria),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export interface ComprarItemRequest {
    item_id: string;
    categoria: string;
}

export interface ComprarItemResponse {
    mensaje: string;
}

export const comprarOEquiparItem = async (
    payload: ComprarItemRequest
): Promise<ComprarItemResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Usuario no autenticado");
    }

    const { data } = await axiosClient.post<ComprarItemResponse>(
        MASCOTA_ENDPOINTS.COMPRAR_ITEM,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};