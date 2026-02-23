import axiosClient from "../api/axiosClient";
import { DAYS_ENDPOINTS } from "../api/endpoints";
import type { DayPlan, EditFoodResponse, RegenerateDayResponse } from "../types";

export const DaysService = {

    getDay: async (day: string): Promise<DayPlan> => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Usuario no autenticado");
        }

        const { data } = await axiosClient.get<DayPlan>(
            DAYS_ENDPOINTS.BY_NAME(day),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    },

    editFood: async (
        day: string,
        typeFood: string,
        ingredients: string[]
    ): Promise<EditFoodResponse> => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Usuario no autenticado");
        }

        const body = { ingredientes: ingredients };
        try {
            const { data } = await axiosClient.post<EditFoodResponse>(
                DAYS_ENDPOINTS.EDIT_FOOD(day, typeFood), body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return data;
        } catch (error: any) {
            console.error("Error editando ingredientes: ", error.response?.data);
            throw error;
        }
    },

    regenerateFood: async (
        day: string,
        typeFood: string
    ): Promise<RegenerateDayResponse> => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Usuario no autenticado");
        }

        const { data } = await axiosClient.post<RegenerateDayResponse>(
            DAYS_ENDPOINTS.REGENERATE_FOOD(day, typeFood),
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    },
};

export type { DayPlan, EditFoodResponse, RegenerateDayResponse };