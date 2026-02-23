import { categories } from "../data/ingredients";

interface IngredientBase {
    nombre: string;
    icono: string;
};

// Aplanamos todas las categorías
const ingredientsBase: IngredientBase[] = categories.flatMap((cat) =>
    cat.items.map((item) => ({
        nombre: item.nombre.toLowerCase(),
        icono: item.icono,
    })),
);

// Función pública para resolver icono
export function getIngredientIcon(nameIA: string): string {
    const normalized = nameIA.toLowerCase();

    // Match exacto
    const exact = ingredientsBase.find(
        (i) => i.nombre === normalized,
    );
    if (exact) return exact.icono;

    // Inclusión (avena en hojuelas → avena)
    const including = ingredientsBase.find(
        (i) => normalized.includes(i.nombre),
    );
    if (including) return including.icono;

    // Por palabras
    const words = normalized.split(" ");
    const keyword = ingredientsBase.find((i) =>
        words.some((p) => i.nombre.includes(p)),
    );
    if (keyword) return keyword.icono;

    // Fallback
    return "/SVG/Ingredientes/Default.svg";
}
