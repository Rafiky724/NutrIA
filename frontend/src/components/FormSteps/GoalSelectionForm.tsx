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
      <div className="flex items-center justify-center space-x-5">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/FlagIcon.svg"
            alt="Objetivo"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>¿Cuál es tu objetivo?</h2>
        </div>
      </div>

      <div className="mt-6 text-justify ft-light text-gray px-6">
        Tu meta nos permitirá construir un plan enfocado en tus resultados, con
        el equilibrio adecuado entre calorías y nutrientes.
      </div>

      <div className="flex flex-col gap-4 mt-6 ">
        <button
          type="button"
          onClick={() => handleSelect("PerderPeso")}
          className={`w-40 md:w-sm mx-auto py-2 rounded-xl cursor-pointer text-lg custom-bg`}
        >
          <h4 className={`ft-bold text-left px-4 text-sm md:text-lg`}>
            Bajar de peso
          </h4>
          <p
            className={`text-sm text-justify ft-light px-4 pb-2 md:block hidden`}
          >
            Elige esta opción si tu objetivo es reducir grasa corporal de forma
            saludable.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("MantenerPeso")}
          className={`w-60 md:w-sm mx-auto py-2 rounded-xl cursor-pointer text-lg custom-bg`}
        >
          <h4 className={`ft-bold text-left px-4 text-sm md:text-lg`}>
            Mantener
          </h4>
          <p
            className={`text-sm text-justify ft-light px-4 pb-2  md:block hidden`}
          >
            Ideal si quieres conservar tu peso actual y seguir una alimentación
            equilibrada.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("GanarMasaMuscular")}
          className={`md:w-sm mx-auto py-2 rounded-xl cursor-pointer text-lg custom-bg`}
        >
          <h4 className={`ft-bold text-left px-4 text-sm md:text-lg`}>
            Ganar masa muscular
          </h4>
          <p
            className={`text-sm text-justify ft-light px-4 pb-2 md:block hidden`}
          >
            Recomendado si buscas aumentar tu peso mediante el desarrollo
            muscular.
          </p>
        </button>
      </div>
    </>
  );
}
