// hooks/useDayPlan.ts
import { useState, useEffect } from "react";
import { DaysService } from "../services/daysService";
import type { DayPlan, MealData, TypeFood, Ingredient } from "../types";

type UseDayPlanReturn = {
    dayPlan: DayPlan | null;
    dish: MealData | null;
    loadingAction: boolean;
    handleRegenerateDish: () => Promise<void>;
    handleConfirmIngredients: (ingredientsFinals: Ingredient[]) => Promise<void>;
};

export function useDayPlan(
    dayActive: string,
    foodActive: TypeFood,
    setFoodActive: (food: TypeFood) => void
): UseDayPlanReturn {
    const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
    const [cachedDays, setCachedDays] = useState<Record<string, DayPlan>>({});
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        const fetchDay = async () => {
            try {
                const nameDay = dayActive.toLowerCase();

                let data: DayPlan;
                if (cachedDays[nameDay]) {
                    data = cachedDays[nameDay];
                } else {
                    data = await DaysService.getDay(nameDay);
                    setCachedDays((prev) => ({ ...prev, [nameDay]: data }));
                }

                setDayPlan(data);
                setFoodActive(data.comidas[0]?.tipo_comida as TypeFood);
            } catch (error) {
                console.error("Error cargando el día:", error);
            }
        };

        fetchDay();
    }, [dayActive]);

    const dish: MealData | null = dayPlan
        ? dayPlan.comidas.find((c) => c.tipo_comida === foodActive) || null
        : null;

    const handleRegenerateDish = async () => {
        if (!dayPlan || !dish) return;

        try {
            setLoadingAction(true);

            const nameDay = dayActive.toLowerCase();
            const response = await DaysService.regenerateFood(nameDay, dish.tipo_comida);

            if (!response.dia) throw new Error("No se pudo regenerar el plato");

            const newDay = { ...response.dia, opinion_ia: response.opinion_ia };
            setDayPlan(newDay);

            setCachedDays((prev) => ({ ...prev, [nameDay]: newDay }));
        } catch (error) {
            console.error("Error regenerando plato:", error);
        } finally {
            setLoadingAction(false);
        }
    };

    const handleConfirmIngredients = async (ingredientsFinals: Ingredient[]) => {
        if (!dayPlan || !dish) return;

        try {
            setLoadingAction(true);

            const nameDay = dayActive.toLowerCase();
            const response = await DaysService.editFood(
                nameDay,
                dish.tipo_comida,
                ingredientsFinals.map((ing) => ing.nombre)
            );

            if (!response.success || !response.comida) {
                throw new Error(response.mensaje || "No se pudo editar la comida");
            }

            const foodEdited = response.comida;

            const newDayPlan = {
                ...dayPlan,
                comidas: dayPlan.comidas.map((c) =>
                    c.tipo_comida === dish.tipo_comida ? foodEdited : c
                ),
            };

            setDayPlan(newDayPlan);
            setCachedDays((prev) => ({ ...prev, [nameDay]: newDayPlan }));
        } catch (error) {
            console.error("Error editando ingredientes:", error);
        } finally {
            setLoadingAction(false);
        }
    };

    return { dayPlan, dish, loadingAction, handleRegenerateDish, handleConfirmIngredients };
}