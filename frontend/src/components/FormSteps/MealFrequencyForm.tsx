import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";
import { MainMeals, OptionsMeals } from "../../data/optionsMeals";
import Toast from "../Toast/Toast";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectQuantityMeals: (quantityMeals: string[]) => void;
  nextStep: () => void;
  showError: number;
};

export default function MealFrequencyForm({
  register,
  onSelectQuantityMeals,
  showError,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  useEffect(() => {
    register("cantidad_comidas", {
      validate: (value: string[]) => {
        const selectedMain = value.filter((c) => MainMeals.includes(c));
        return (
          selectedMain.length >= 2 ||
          "Debes seleccionar al menos 2 comidas principales (Desayuno, Almuerzo o Cena)"
        );
      },
    });
  }, [register]);

  useEffect(() => {
    if (showError > 0) {
      const selectedMain = selected.filter((c) => MainMeals.includes(c));
      if (selectedMain.length < 2) {
        setToast({
          open: true,
          message:
            selectedMain.length === 0
              ? "Debes seleccionar al menos 2 comidas principales."
              : "Selecciona al menos 2 comidas principales (Desayuno, almuerzo o cena).",
          type: "error",
        });
      }
    }
  }, [showError]);

  const toggleSeleccion = (meal: string) => {
    let newSelected: string[];

    if (selected.includes(meal)) {
      newSelected = selected.filter((c) => c !== meal);
    } else {
      newSelected = [...selected, meal];
    }

    setSelected(newSelected);
    onSelectQuantityMeals(newSelected);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 text-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <div className="w-12 sm:w-20">
          <img
            src="/SVG/IconsGeneral/PyramidAppleIcon.svg"
            alt="Cantidad de comidas"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>¿Cuántas comidas deseas hacer al día?</h2>
        </div>
      </div>

      {/* Descripción */}
      <p className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Elige al menos dos comidas principales para distribuir tus calorías y
        nutrientes de forma equilibrada a lo largo del día.
      </p>

      {/* Opciones */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
        {OptionsMeals.map(({ label, icon, selectedIcon }) => {
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleSeleccion(label)}
              className={`flex flex-col items-center justify-center w-20 sm:w-25 lg:w-30 h-20 sm:h-25 lg:h-30 mx-auto rounded-2xl border transition cursor-pointer hover:scale-105 ${
                isSelected
                  ? "bg-brown border-transparent text-white"
                  : "bg-input border-transparent"
              }`}
            >
              <img
                src={isSelected ? selectedIcon || icon : icon}
                alt={label}
                className="w-8 h-8 sm:w-14 sm:h-14 lg:w-18 lg:h-18 mb-2"
              />
              <span className="ft-medium text-xs sm:text-sm md:text-base text-center px-1">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toast */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
