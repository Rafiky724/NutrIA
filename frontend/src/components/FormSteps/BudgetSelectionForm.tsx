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
    <>
      <div className="flex items-center justify-center space-x-10">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/MoneyIcon.svg"
            alt="Presupuesto"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>Basada en presupuesto</h2>
        </div>
      </div>

      <div className="ft-light text-gray my-5 text-center">
        <p>¿Cuál es tu presupuesto semanal para alimentación?</p>
      </div>

      <div className="w-xs mx-auto space-y-4">
        {options.map(({ label, price }) => (
          <div
            key={label}
            onClick={() => handleSelect(label)}
            className="cursor-pointer"
          >
            <div
              className={`px-4 py-3 rounded-full flex items-center justify-between ${
                selected === label
                  ? "bg-brown text-white"
                  : "bg-input text-brown"
              }`}
            >
              <span className="ft-medium">{label}</span>
              <span className="ft-light text-md">{price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
