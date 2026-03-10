import type { MealData } from "../types";

export const calculateMacroPercentages = (dish: MealData) => {
  const total = dish.proteinas + dish.carbohidratos + dish.grasas;

  return {
    protein: total ? (dish.proteinas / total) * 100 : 0,
    carbs: total ? (dish.carbohidratos / total) * 100 : 0,
    fats: total ? (dish.grasas / total) * 100 : 0,
  };
};