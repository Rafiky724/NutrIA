type ItemConfig = {
    desktop: {
        position: { x: number; y: number };
        size: { width: number; height: number };
        zIndex?: { z: number };
    };
    mobile: {
        position: { x: number; y: number };
        size: { width: number; height: number };
        zIndex?: { z: number };
    };
};

export const itemSettings: Record<string, Record<string, ItemConfig>> = {
    nutria: {
        // Gorras
        gorra1: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra2: {
            desktop: {
                position: { x: 108, y: -118 },
                size: { width: 165, height: 165 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra3: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra4: {
            desktop: {
                position: { x: 112, y: -125 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 0 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra5: {
            desktop: {
                position: { x: 112, y: -118 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra6: {
            desktop: {
                position: { x: 100, y: -135 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 100, y: 0 },
                size: { width: 90, height: 90 },
                zIndex: { z: 30 },
            },
        },
        // Gafas
        gafas1: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas2: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas3: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas4: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas5: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas6: {
            desktop: {
                position: { x: 90, y: -50 },
                size: { width: 200, height: 200 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 65 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        // Fondos
        fondo1: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo2: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo3: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo4: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo5: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo6: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        // Marcos
        marco1: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco2: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco3: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco4: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco5: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco6: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        // Accesorios
        accesorio1: {
            desktop: {
                position: { x: 150, y: 130 },
                size: { width: 90, height: 90 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 190 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio2: {
            desktop: {
                position: { x: 70, y: 130 },
                size: { width: 245, height: 245 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 70, y: 180 },
                size: { width: 180, height: 180 },
                zIndex: { z: 10 },
            },
        },
        accesorio3: {
            desktop: {
                position: { x: 142, y: 110 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 170 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio4: {
            desktop: {
                position: { x: 142, y: 120 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 180 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
    },

    perro: {
        // Gorras
        gorra1: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra2: {
            desktop: {
                position: { x: 108, y: -135 },
                size: { width: 165, height: 165 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 0 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra3: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra4: {
            desktop: {
                position: { x: 112, y: -140 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 110, y: 0 },
                size: { width: 100, height: 100 },
                zIndex: { z: 30 },
            },
        },
        gorra5: {
            desktop: {
                position: { x: 112, y: -118 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra6: {
            desktop: {
                position: { x: 100, y: -135 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 100, y: 0 },
                size: { width: 90, height: 90 },
                zIndex: { z: 30 },
            },
        },
        // Gafas
        gafas1: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas2: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas3: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas4: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas5: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        gafas6: {
            desktop: {
                position: { x: 100, y: -65 },
                size: { width: 190, height: 190 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 100, y: 55 },
                size: { width: 120, height: 120 },
                zIndex: { z: 20 },
            },
        },
        // Fondos
        fondo1: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo2: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo3: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo4: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo5: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo6: {
            desktop: {
                position: { x: 0, y: -128 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 0 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        // Marcos
        marco1: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco2: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco3: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco4: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco5: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco6: {
            desktop: {
                position: { x: -3.5, y: -141 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        // Accesorios
        accesorio1: {
            desktop: {
                position: { x: 120, y: 150 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 200 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio2: {
            desktop: {
                position: { x: 70, y: 130 },
                size: { width: 245, height: 245 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 80, y: 180 },
                size: { width: 160, height: 160 },
                zIndex: { z: 10 },
            },
        },
        accesorio3: {
            desktop: {
                position: { x: 142, y: 120 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 170 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio4: {
            desktop: {
                position: { x: 142, y: 130 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 190 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
    },

    gato: {
        // Gorras
        gorra1: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra2: {
            desktop: {
                position: { x: 108, y: -135 },
                size: { width: 165, height: 165 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 0 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra3: {
            desktop: {
                position: { x: 112, y: -115 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra4: {
            desktop: {
                position: { x: 112, y: -140 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 110, y: 0 },
                size: { width: 100, height: 100 },
                zIndex: { z: 30 },
            },
        },
        gorra5: {
            desktop: {
                position: { x: 112, y: -118 },
                size: { width: 160, height: 160 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: 10 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra6: {
            desktop: {
                position: { x: 100, y: -135 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 100, y: 0 },
                size: { width: 90, height: 90 },
                zIndex: { z: 30 },
            },
        },
        // Gafas
        gafas1: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas2: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas3: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas4: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas5: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas6: {
            desktop: {
                position: { x: 80, y: -35 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 60 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        // Fondos
        fondo1: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo2: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo3: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo4: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo5: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo6: {
            desktop: {
                position: { x: 0, y: -118 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 9 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        // Marcos
        marco1: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco2: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco3: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco4: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco5: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco6: {
            desktop: {
                position: { x: -3.5, y: -128 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        // Accesorios
        accesorio1: {
            desktop: {
                position: { x: 120, y: 210 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 230 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio2: {
            desktop: {
                position: { x: 70, y: 150 },
                size: { width: 240, height: 240 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 75, y: 200 },
                size: { width: 170, height: 170 },
                zIndex: { z: 10 },
            },
        },
        accesorio3: {
            desktop: {
                position: { x: 120, y: 150 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 190 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio4: {
            desktop: {
                position: { x: 120, y: 160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 200 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
    },

    dinosaurio: {
        // Gorras
        gorra1: {
            desktop: {
                position: { x: 120, y: -160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: -30 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra2: {
            desktop: {
                position: { x: 120, y: -160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: -30 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra3: {
            desktop: {
                position: { x: 120, y: -160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: -30 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra4: {
            desktop: {
                position: { x: 120, y: -160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: -30 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra5: {
            desktop: {
                position: { x: 120, y: -160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 105, y: -30 },
                size: { width: 110, height: 110 },
                zIndex: { z: 30 },
            },
        },
        gorra6: {
            desktop: {
                position: { x: 120, y: -200 },
                size: { width: 140, height: 140 },
                zIndex: { z: 30 },
            },
            mobile: {
                position: { x: 120, y: -30 },
                size: { width: 80, height: 80 },
                zIndex: { z: 30 },
            },
        },
        // Gafas
        gafas1: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas2: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas3: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas4: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas5: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        gafas6: {
            desktop: {
                position: { x: 80, y: -125 },
                size: { width: 220, height: 220 },
                zIndex: { z: 20 },
            },
            mobile: {
                position: { x: 80, y: 0 },
                size: { width: 160, height: 160 },
                zIndex: { z: 20 },
            },
        },
        // Fondos
        fondo1: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo2: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo3: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo4: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo5: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        fondo6: {
            desktop: {
                position: { x: 0, y: -88 },
                size: { width: 380, height: 380 },
                zIndex: { z: 5 },
            },
            mobile: {
                position: { x: 20, y: 29 },
                size: { width: 280, height: 263.5 },
                zIndex: { z: 5 },
            },
        },
        // Marcos
        marco1: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco2: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco3: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco4: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco5: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        marco6: {
            desktop: {
                position: { x: -3.5, y: -100 },
                size: { width: 390, height: 390 },
                zIndex: { z: 40 },
            },
            mobile: {
                position: { x: 10, y: 0 },
                size: { width: 295, height: 295 },
                zIndex: { z: 40 },
            },
        },
        // Accesorios
        accesorio1: {
            desktop: {
                position: { x: 120, y: 160 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 200 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio2: {
            desktop: {
                position: { x: 80, y: 120 },
                size: { width: 230, height: 230 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 75, y: 190 },
                size: { width: 170, height: 170 },
                zIndex: { z: 10 },
            },
        },
        accesorio3: {
            desktop: {
                position: { x: 120, y: 100 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 160 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
        accesorio4: {
            desktop: {
                position: { x: 120, y: 100 },
                size: { width: 140, height: 140 },
                zIndex: { z: 10 },
            },
            mobile: {
                position: { x: 110, y: 160 },
                size: { width: 100, height: 100 },
                zIndex: { z: 10 },
            },
        },
    },
};