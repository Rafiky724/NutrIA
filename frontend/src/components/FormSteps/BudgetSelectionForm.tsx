import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { Budget, FormData } from "../../types";
import { options } from "../../data/optionsPrice";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectBudget: (budget: Budget) => void;
};

export default function BudgetSelectionForm({
  register,
  onSelectBudget,
}: Props) {
  const [selected, setSelected] = useState<Budget>("Estándar");

  useEffect(() => {
    register("presupuesto", {
      required: "El tipo presupuesto es obligatorio",
    });

    onSelectBudget("Estándar");
  }, [register, onSelectBudget]);

  const handleSelect = (budget: Budget) => {
    setSelected(budget);
    onSelectBudget(budget);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
        <div className="w-16 sm:w-20">
          <img
            src="/SVG/IconsGeneral/MoneyIcon.svg"
            alt="Presupuesto"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>Basada en presupuesto</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
        <p>¿Cuál es tu presupuesto semanal para alimentación?</p>
      </div>

      {/* Opciones */}
      <div className="w-full sm:w-96 mx-auto space-y-3 sm:space-y-4">
        {options.map(({ label, price }) => (
          <div
            key={label}
            onClick={() => handleSelect(label)}
            className="cursor-pointer transition hover:scale-105"
          >
            <div
              className={`px-4 py-3 rounded-full flex items-center justify-between text-sm sm:text-base transition-colors duration-200 ${
                selected === label
                  ? "bg-brown text-white"
                  : "bg-input text-brown"
              }`}
            >
              <span className="ft-medium">{label}</span>
              <span className="ft-light">{price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
