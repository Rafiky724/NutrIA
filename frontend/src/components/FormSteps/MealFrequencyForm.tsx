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
        <div className="w-14 sm:w-16">
          <img
            src="/SVG/IconsGeneral/PyramidAppleIcon.svg"
            alt="Cantidad de comidas"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown w-full sm:w-auto">
          <h2>¿Cuántas comidas deseas hacer al día?</h2>
        </div>
      </div>

      {/* Descripción */}
      <p className="ft-light text-gray text-sm sm:text-base md:text-base text-justify mb-6 px-2 sm:px-6 md:px-8">
        Elige al menos dos comidas principales para distribuir tus calorías y
        nutrientes de forma equilibrada a lo largo del día.
      </p>

      {/* Opciones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
        {OptionsMeals.map(({ label, icon, selectedIcon }) => {
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleSeleccion(label)}
              className={`flex flex-col items-center justify-center w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-brown border-transparent text-white"
                  : "bg-input border-transparent"
              }`}
            >
              <img
                src={isSelected ? selectedIcon || icon : icon}
                alt={label}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2"
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
