import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Step9Props = {
  register: UseFormRegister<FormData>;
  onSelectCantidadComidas: (cantidadComidas: string[]) => void;
  nextStep: () => void;
};

type Comida = {
  label: string;
  icon: string;
  selectedIcon: string;
};

const opcionesComidas: Comida[] = [
  {
    label: "Desayuno",
    icon: "/SVG/Platos/Dark/DesayunoDark.svg",
    selectedIcon: "/SVG/Platos/Desayuno.svg",
  },
  {
    label: "Snack 1",
    icon: "/SVG/Platos/Dark/SnackDark.svg",
    selectedIcon: "/SVG/Platos/Snack.svg",
  },
  {
    label: "Almuerzo",
    icon: "/SVG/Platos/Dark/AlmuerzoDark.svg",
    selectedIcon: "/SVG/Platos/Almuerzo.svg",
  },
  {
    label: "Snack 2",
    icon: "/SVG/Platos/Dark/SnackDark.svg",
    selectedIcon: "/SVG/Platos/Snack.svg",
  },
  {
    label: "Cena",
    icon: "/SVG/Platos/Dark/CenaDark.svg",
    selectedIcon: "/SVG/Platos/Cena.svg",
  },
  {
    label: "Snack 3",
    icon: "/SVG/Platos/Dark/SnackDark.svg",
    selectedIcon: "/SVG/Platos/Snack.svg",
  },
];
export default function Step9({
  register,
  onSelectCantidadComidas,
}: Step9Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    register("cantidadComidas", {
      validate: (value: string[]) => {
        const comidasPrincipales = ["Desayuno", "Almuerzo", "Cena"];
        const seleccionadasPrincipales = value.filter((c) =>
          comidasPrincipales.includes(c)
        );
        return (
          seleccionadasPrincipales.length >= 2 ||
          "Debes seleccionar al menos 2 comidas principales (Desayuno, Almuerzo o Cena)"
        );
      },
    });
  }, [register]);

  const toggleSeleccion = (comida: string) => {
    let nuevasSeleccionadas: string[];

    if (selected.includes(comida)) {
      nuevasSeleccionadas = selected.filter((c) => c !== comida);
    } else {
      nuevasSeleccionadas = [...selected, comida];
    }

    setSelected(nuevasSeleccionadas);
    onSelectCantidadComidas(nuevasSeleccionadas);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-20">
          <img
            src="/SVG/Piramide.svg"
            alt="Cantidad de comidas"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-2xl">
          <h2>¿Cuántas comidas deseas hacer al día?</h2>
        </div>
      </div>

      <p className="poppins-light font_brown mb-6">
        Elige al menos dos comidas principales para distribuir tus calorias y
        nutrientes de forma equilibrada a lo largo del dia.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 place-items-center mb-4">
        {opcionesComidas.map(({ label, icon, selectedIcon }) => {
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleSeleccion(label)}
              className={`flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg_brown border-transparent text-white"
                  : "bg_inputs border-transparent"
              }`}
            >
              <img
                src={isSelected ? selectedIcon || icon : icon}
                alt={label}
                className="w-15 h-15 mb-2"
              />
              <span className="poppins-medium text-md text-center">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
