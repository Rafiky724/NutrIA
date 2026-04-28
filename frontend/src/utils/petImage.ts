export const getMealType = (tipoComida: string): string => {
    const normalized = tipoComida.toLowerCase();
    if (normalized.includes("snack")) return "snack";
    return normalized;
};

export const getPetImage = (
    mascota: string,
    tipoComida: string,
    estado: string
): string => {
    const meal = getMealType(tipoComida);
    // console.log({
    //     mascota,
    //     meal,
    //     estado,
    //     path: `/SVG/Emotions/${mascota}/${mascota}-${meal}-${estado}.svg`,
    // });

    return `/SVG/Emotions/${mascota}/${mascota}-${meal}-${estado}.svg`;
};