import type { Meal } from "../types";

export const OptionsMeals: Meal[] = [
    {
        label: "Desayuno",
        icon: "/SVG/Dishes/Dark/Breakfast.svg",
        selectedIcon: "/SVG/Dishes/Light/Breakfast.svg",
    },
    {
        label: "Snack1",
        icon: "/SVG/Dishes/Dark/Snack.svg",
        selectedIcon: "/SVG/Dishes/Light/Snack.svg",
    },
    {
        label: "Almuerzo",
        icon: "/SVG/Dishes/Dark/Lunch.svg",
        selectedIcon: "/SVG/Dishes/Light/Lunch.svg",
    },
    {
        label: "Snack2",
        icon: "/SVG/Dishes/Dark/Snack.svg",
        selectedIcon: "/SVG/Dishes/Light/Snack.svg",
    },
    {
        label: "Cena",
        icon: "/SVG/Dishes/Dark/Dinner.svg",
        selectedIcon: "/SVG/Dishes/Light/Dinner.svg",
    },
    {
        label: "Snack3",
        icon: "/SVG/Dishes/Dark/Snack.svg",
        selectedIcon: "/SVG/Dishes/Light/Snack.svg",
    },
];

export const MainMeals = ["Desayuno", "Almuerzo", "Cena"];