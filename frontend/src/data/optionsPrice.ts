import type { Budget } from "../types";

export const options: { label: Budget; price: string }[] = [
    { label: "Muy bajo", price: "$80.000 COP" },
    { label: "Bajo", price: "$100.000 COP" },
    { label: "Estándar", price: "$130.000 COP" },
    { label: "Alto", price: "$160.000 COP" },
    { label: "Muy alto", price: "+$200.000 COP" },
];