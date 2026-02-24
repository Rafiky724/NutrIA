import type { UseFormRegister } from "react-hook-form";
import type { FormData, TargetType } from "../../types";
import { useEffect, useState } from "react";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectObjective: (objective: string) => void;
  nextStep: () => void;
};

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
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-5">
        <div className="w-16 md:w-20">
          <img
            src="/SVG/IconsGeneral/FlagIcon.svg"
            alt="Objetivo"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-xl sm:text-2xl md:text-3xl text-brown text-center md:text-left">
          <h2>¿Cuál es tu objetivo?</h2>
        </div>
      </div>

      {/* Texto explicativo */}
      <div className="mt-4 md:mt-6 text-justify ft-light text-gray px-4 sm:px-6 md:px-0 text-sm sm:text-base md:text-lg">
        Tu meta nos permitirá construir un plan enfocado en tus resultados, con
        el equilibrio adecuado entre calorías y nutrientes.
      </div>

      {/* Botones de objetivos */}
      <div className="flex flex-col gap-4 mt-4 md:mt-6 px-4 sm:px-6 md:px-0">
        <button
          type="button"
          onClick={() => handleSelect("PerderPeso")}
          className="w-full md:w-80 mx-auto py-3 rounded-xl cursor-pointer text-left bg-yellow hover:bg-yellow-400 transition"
        >
          <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
            Bajar de peso
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 px-4 mt-1">
            Elige esta opción si tu objetivo es reducir grasa corporal de forma
            saludable.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("MantenerPeso")}
          className="w-full md:w-80 mx-auto py-3 rounded-xl cursor-pointer text-left bg-yellow hover:bg-yellow-400 transition"
        >
          <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
            Mantener
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 px-4 mt-1">
            Ideal si quieres conservar tu peso actual y seguir una alimentación
            equilibrada.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("GanarMasaMuscular")}
          className="w-full md:w-80 mx-auto py-3 rounded-xl cursor-pointer text-left bg-yellow hover:bg-yellow-400 transition"
        >
          <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
            Ganar masa muscular
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 px-4 mt-1">
            Recomendado si buscas aumentar tu peso mediante el desarrollo
            muscular.
          </p>
        </button>
      </div>
    </>
  );
}
