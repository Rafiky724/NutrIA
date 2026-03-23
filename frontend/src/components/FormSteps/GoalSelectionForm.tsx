import type { UseFormRegister } from "react-hook-form";
import type { FormData, TargetType } from "../../types";
import { useEffect, useState } from "react";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectObjective: (objective: string) => void;
  nextStep: () => void;
};

const options: { key: TargetType; title: string; description: string }[] = [
  {
    key: "PerderPeso",
    title: "Bajar de peso",
    description:
      "Elige esta opción si tu objetivo es reducir grasa corporal de forma saludable.",
  },
  {
    key: "MantenerPeso",
    title: "Mantener",
    description:
      "Ideal si quieres conservar tu peso actual y seguir una alimentación equilibrada.",
  },
  {
    key: "GanarMasaMuscular",
    title: "Ganar masa muscular",
    description:
      "Recomendado si buscas aumentar tu peso mediante el desarrollo muscular.",
  },
];

export default function GoalSelectionForm({
  register,
  onSelectObjective,
  nextStep,
}: Props) {
  const [, setSelected] = useState<TargetType>("");

  useEffect(() => {
    register("tipo_objetivo", { required: "El objetivo es obligatorio" });
  }, [register]);

  const handleSelect = (selectedOption: TargetType) => {
    setSelected(selectedOption);
    onSelectObjective(selectedOption);
    nextStep();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-10 md:w-10 xl:w-15">
          <img
            src="/SVG/IconsGeneral/FlagIcon.svg"
            alt="Objetivo"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center">
          <h2>¿Cuál es tu objetivo?</h2>
        </div>
      </div>

      <div className="mt-4 md:mt-6 text-justify ft-light text-gray px-4 sm:px-6 md:px-0 text-sm sm:text-base md:text-lg">
        Tu meta nos permitirá construir un plan enfocado en tus resultados, con
        el equilibrio adecuado entre calorías y nutrientes.
      </div>

      <div className="flex flex-col gap-4 mt-4 md:mt-6 px-4 sm:px-6 md:px-0">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleSelect(option.key)}
            className="w-full md:w-lg mx-auto py-3 rounded-xl text-left bg-yellow custom-bg hover:scale-105 transition cursor-pointer"
          >
            <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
              {option.title}
            </h4>
            <p className="text-xs sm:text-sm md:text-base px-4">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
