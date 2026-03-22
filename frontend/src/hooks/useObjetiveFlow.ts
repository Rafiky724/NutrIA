// hooks/useObjetiveFlow.ts
import { useState } from "react";
import type { ActualizarObjetivoRequest } from "../services/ObjectiveService";

export function useObjetiveFlow() {
    const [data, setData] = useState<Partial<ActualizarObjetivoRequest>>({});

    const updateData = (newData: Partial<ActualizarObjetivoRequest>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    return { data, updateData };
}