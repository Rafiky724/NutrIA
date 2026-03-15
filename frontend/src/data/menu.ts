export type FieldType = "text" | "email" | "number" | "select";

export type EditField = {
    type: FieldType;
    placeholder: string;
    options?: { label: string; value: string }[];
};

export const editFields: EditField[] = [
    { type: "text", placeholder: "Nombre" },
    { type: "text", placeholder: "Apodo" },
    { type: "email", placeholder: "Correo" },
    {
        type: "select",
        placeholder: "Género",
        options: [
            { label: "Masculino", value: "masculino" },
            { label: "Femenino", value: "femenino" },
            { label: "Otro", value: "otro" },
        ],
    },
    { type: "number", placeholder: "Edad" },
    { type: "number", placeholder: "Altura (cm)" },
    { type: "number", placeholder: "Peso (kg)" },
];

export const shopItemsData = [
    { name: "nutria", icon: "/SVG/Pets/Shop/Mascotas/nutria.svg", category: "mascotas", price: 23, available: true },
    { name: "perro", icon: "/SVG/Pets/Shop/Mascotas/perro.svg", category: "mascotas", price: 23, available: true },
    { name: "gato", icon: "/SVG/Pets/Shop/Mascotas/gato.svg", category: "mascotas", price: 23, available: false },
    { name: "dinosaurio", icon: "/SVG/Pets/Shop/Mascotas/dinosaurio.svg", category: "mascotas", price: 23, available: true },

    { name: "gorro1", icon: "/SVG/Pets/Shop/Gorros/gorra1.svg", category: "gorros", price: 23, available: true },
    { name: "gorro2", icon: "/SVG/Pets/Shop/Gorros/gorra2.svg", category: "gorros", price: 23, available: false },
    { name: "gorro3", icon: "/SVG/Pets/Shop/Gorros/gorra3.svg", category: "gorros", price: 23, available: true },
    { name: "gorro4", icon: "/SVG/Pets/Shop/Gorros/gorra4.svg", category: "gorros", price: 23, available: true },
    { name: "gorro5", icon: "/SVG/Pets/Shop/Gorros/gorra5.svg", category: "gorros", price: 23, available: true },
    { name: "gorro6", icon: "/SVG/Pets/Shop/Gorros/gorra6.svg", category: "gorros", price: 23, available: true },

    { name: "gafas1", icon: "/SVG/Pets/Shop/Gafas/gafas1.svg", category: "gafas", price: 23, available: true },
    { name: "gafas2", icon: "/SVG/Pets/Shop/Gafas/gafas2.svg", category: "gafas", price: 23, available: true },
    { name: "gafas3", icon: "/SVG/Pets/Shop/Gafas/gafas3.svg", category: "gafas", price: 23, available: false },
    { name: "gafas4", icon: "/SVG/Pets/Shop/Gafas/gafas4.svg", category: "gafas", price: 23, available: true },
    { name: "gafas5", icon: "/SVG/Pets/Shop/Gafas/gafas5.svg", category: "gafas", price: 23, available: true },
    { name: "gafas6", icon: "/SVG/Pets/Shop/Gafas/gafas6.svg", category: "gafas", price: 23, available: true },

    { name: "fondos1", icon: "/SVG/Pets/Shop/Fondos/fondo1.svg", category: "fondos", price: 23, available: true },
    { name: "fondos2", icon: "/SVG/Pets/Shop/Fondos/fondo2.svg", category: "fondos", price: 23, available: true },
    { name: "fondos3", icon: "/SVG/Pets/Shop/Fondos/fondo3.svg", category: "fondos", price: 23, available: false },
    { name: "fondos4", icon: "/SVG/Pets/Shop/Fondos/fondo4.svg", category: "fondos", price: 23, available: true },
    { name: "fondos5", icon: "/SVG/Pets/Shop/Fondos/fondo5.svg", category: "fondos", price: 23, available: true },
    { name: "fondos6", icon: "/SVG/Pets/Shop/Fondos/fondo6.svg", category: "fondos", price: 23, available: true },

    { name: "marcos1", icon: "/SVG/Pets/Shop/Marcos/marco1.svg", category: "marcos", price: 23, available: true },
    { name: "marcos2", icon: "/SVG/Pets/Shop/Marcos/marco2.svg", category: "marcos", price: 23, available: true },
    { name: "marcos3", icon: "/SVG/Pets/Shop/Marcos/marco3.svg", category: "marcos", price: 23, available: false },
    { name: "marcos4", icon: "/SVG/Pets/Shop/Marcos/marco4.svg", category: "marcos", price: 23, available: true },
    { name: "marcos5", icon: "/SVG/Pets/Shop/Marcos/marco5.svg", category: "marcos", price: 23, available: true },
    { name: "marcos6", icon: "/SVG/Pets/Shop/Marcos/marco6.svg", category: "marcos", price: 23, available: true },

    { name: "accesorios1", icon: "/SVG/Pets/Shop/Accesorios/accesorio1.svg", category: "accesorios", price: 23, available: true },
    { name: "accesorios2", icon: "/SVG/Pets/Shop/Accesorios/accesorio2.svg", category: "accesorios", price: 23, available: true },
    { name: "accesorios3", icon: "/SVG/Pets/Shop/Accesorios/accesorio3.svg", category: "accesorios", price: 23, available: false },
    { name: "accesorios4", icon: "/SVG/Pets/Shop/Accesorios/accesorio4.svg", category: "accesorios", price: 23, available: true },
];

export const categoriesData = [
    { name: "Mascotas", icon: "/SVG/Pets/Shop/Category/Mascotas.svg", type: "mascotas" },
    {
        name: "Gorras",
        icon: "/SVG/Pets/Shop/Category/Gorras.svg",
        type: "gorros",
    },
    { name: "Gafas", icon: "/SVG/Pets/Shop/Category/Gafas.svg", type: "gafas" },
    {
        name: "Fondos",
        icon: "/SVG/Pets/Shop/Category/Fondos.svg",
        type: "fondos",
    },
    {
        name: "Marcos",
        icon: "/SVG/Pets/Shop/Category/Marcos.svg",
        type: "marcos",
    },
    {
        name: "Accesorios",
        icon: "/SVG/Pets/Shop/Category/Accesorios.svg",
        type: "accesorios",
    },
];

export const contactData = {
    description: [
        "Somos un equipo apasionado por la nutrición personalizada y la tecnología aplicada al bienestar. Nuestra misión es ayudarte a alcanzar tus objetivos de forma saludable, sostenible y basada en datos.",
        "Creamos esta app para hacer que la alimentación personalizada sea simple, accesible y efectiva.",
    ],
    helpText: "Nos encantará leerte",
    emails: ["contacto@tusitio.com", "soporte@tusitio.com"],
    copyright: "/SVG/IconsGeneral/CopyrightNutria.svg",
};

export const achievementsData = [
    {
        title: "Completa 10 días de racha",
        current: 5,
        total: 10,
        gems: 5,
        icon: "/SVG/IconsGeneral/GemsIcon.svg",
        color: "#FF6B6B",
    },
    {
        title: "Completa 10 comidas",
        current: 10,
        total: 10,
        gems: 10,
        icon: "/SVG/IconsGeneral/GemsIcon.svg",
        color: "#6BCB77",
    },
    {
        title: "Valida 10 comidas",
        current: 5,
        total: 10,
        gems: 8,
        icon: "/SVG/IconsGeneral/GemsIcon.svg",
        color: "#4D96FF",
    },
    {
        title: "Gana 100 gemas",
        current: 5,
        total: 10,
        gems: 3,
        icon: "/SVG/IconsGeneral/GemsIcon.svg",
        color: "#FFD93D",
    },
    {
        title: "Compra 2 artículos",
        current: 10,
        total: 10,
        gems: 7,
        icon: "/SVG/IconsGeneral/GemsIcon.svg",
        color: "#FF6EC7",
    },
];