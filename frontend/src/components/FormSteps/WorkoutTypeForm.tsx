import type { UseFormRegister } from "react-hook-form";
import type { FormData, TypeActivity } from "../../types";
import { useEffect, useState } from "react";
import ArrowReturn from "../Decoration/ArrowReturn";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectActivity: (activitytype: TypeActivity) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function WorkoutTypeForm({
  register,
  onSelectActivity,
  nextStep,
  prevStep,
}: Props) {
  const [, setSelected] = useState<TypeActivity>();

  useEffect(() => {
    register("tipo_actividad", {
      required: "El tipo de actividad es obligatorio",
    });
  }, [register]);

  const handleSelect = (activity: TypeActivity) => {
    setSelected(activity);
    onSelectActivity(activity);
    nextStep();
  };

  const handlePrevStep = () => {
    prevStep();
    prevStep();
  };

  const options: TypeActivity[] = [
    "Pesas / Gimnasio",
    "Cardio (correr, nadar, bici...)",
    "Funcional / CrossFit",
    "Yoga / Movilidad",
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
        <div className="w-14 sm:w-16">
          <img
            src="/SVG/IconsGeneral/RunnerIcon.svg"
            alt="Tipo Actividad Física"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center sm:text-left w-full sm:w-auto">
          <h2>¿Qué tipo de actividad física realizas con más frecuencia?</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-4 sm:mt-6 text-sm sm:text-base md:text-base ft-light text-gray text-center sm:text-left px-2 sm:px-4">
        Esto nos ayudará a ajustar tu plan alimenticio para que tengas la
        energía y los nutrientes necesarios según tu estilo de entrenamiento.
      </div>

      {/* Opciones */}
      <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className="w-full sm:w-80 md:w-96 mx-auto py-2 sm:py-3 rounded-3xl sm:rounded-4xl cursor-pointer ft-medium custom-bg transition-all duration-200"
          >
            <h4 className="text-center text-sm sm:text-base md:text-lg">
              {option}
            </h4>
          </button>
        ))}
      </div>

      {/* Botón de regresar */}
      <div className="mt-6">
        <ArrowReturn onClick={handlePrevStep} />
      </div>
    </div>
  );
}
