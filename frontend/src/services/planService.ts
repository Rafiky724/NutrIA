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
