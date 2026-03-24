import { categories } from "../data/ingredients";

export const buildStructuredIngredients = (
    ingredients: string[],
    custom: string[],
): [string, string][] => {
    const result: [string, string][] = [];
    categories.forEach((category) => {
        ingredients.forEach((ing) => {
            if (category.items.some((item) => item.nombre === ing)) {
                let kind = category.nombre;
                if (kind === "Proteínas") kind = "Proteinas";
                if (kind === "Bebidas y Lácteos") kind = "Bebidas";
                if (kind === "Grasas saludables") kind = "Grasas";
                result.push([ing, kind]);
            }
        });
    });
    custom.forEach((ing) => result.push([ing, "Otros"]));
    return result;
};