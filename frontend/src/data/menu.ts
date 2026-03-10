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
    { name: "Item 1", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Item 2", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Item 3", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Item 4", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Item 5", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Item 6", icon: "/SVG/Pets/Adopt/Cat.svg" },
];

export const categoriesData = [
    { name: "Pet", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Hat", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Glasses", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Background", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Frame", icon: "/SVG/Pets/Adopt/Cat.svg" },
    { name: "Tie", icon: "/SVG/Pets/Adopt/Cat.svg" },
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