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
    <div className="text-center">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/PyramidAppleIcon.svg"
            alt="Cantidad de comidas"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl w-sm">
          <h2>¿Cuántas comidas deseas hacer al día?</h2>
        </div>
      </div>

      <p className="ft-light text-gray text-justify mb-6 px-8">
        Elige al menos dos comidas principales para distribuir tus calorias y
        nutrientes de forma equilibrada a lo largo del dia.
      </p>

      <div className="flex flex-wrap gap-3 items-center justify-center w-lg mx-auto">
        {OptionsMeals.map(({ label, icon, selectedIcon }) => {
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleSeleccion(label)}
              className={`flex flex-col items-center justify-center w-32 h-32 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-brown border-transparent text-white"
                  : "bg-input border-transparent"
              }`}
            >
              <img
                src={isSelected ? selectedIcon || icon : icon}
                alt={label}
                className="w-15 h-15 mb-2"
              />
              <span className="ft-medium text-center">{label}</span>
            </button>
          );
        })}
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
