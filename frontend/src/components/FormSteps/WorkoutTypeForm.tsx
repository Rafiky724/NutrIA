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
    <>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/RunnerIcon.svg"
            alt="Tipo Actividad Física"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl w-sm text-brown">
          <h2>¿Qué tipo de actividad física realizas con más frecuencia?</h2>
        </div>
      </div>

      <div className="mt-8 text-justify ft-light text-gray px-4">
        Esto nos ayudará a ajustar tu plan alimenticio para que tengas la
        energía y los nutrientes necesarios según tu estilo de entrenamiento.
      </div>

      <div className="flex flex-col gap-2 mt-10">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className="w-xs mx-auto p-2 rounded-4xl cursor-pointer ft-medium custom-bg"
          >
            <h4 className="text-center">{option}</h4>
          </button>
        ))}
      </div>

      <ArrowReturn onClick={handlePrevStep} />
    </>
  );
}
