import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData, LevelActivity } from "../../types";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectActivity: (activity: LevelActivity) => void;
  nextStep: () => void;
};

export default function ActivityLevelForm({
  register,
  onSelectActivity,
  nextStep,
}: Props) {
  const [, setSelected] = useState<LevelActivity>();

  useEffect(() => {
    register("nivel_actividad", { required: "La actividad es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: LevelActivity) => {
    setSelected(selectedOption);
    onSelectActivity(selectedOption);
    nextStep();
  };

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="w-10 md:w-20">
          <img
            src="/SVG/IconsGeneral/WeightIcon.svg"
            alt="Datos Actividad Física"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>¿Realizas actividad física?</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="ft-light text-justify text-gray my-6 md:my-10 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Tu nivel de actividad física es clave para calcular tu gasto calórico y
        ajustar tus porciones
      </div>

      {/* Botones de selección */}
      <div className="flex flex-col gap-2 mt-6 sm:mt-8">
        {[
          { label: "No hago ejercicio", value: "NoHace" },
          { label: "Ocasional (1-2 veces por semana)", value: "Bajo" },
          { label: "Regular (3-4 veces por semana)", value: "Moderado" },
          { label: "Frecuente (5 o más veces)", value: "Alto" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value as LevelActivity)}
            className="w-full sm:w-80 md:w-96 mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-sm sm:text-lg custom-bg transition hover:scale-105"
          >
            <h4 className="text-center px-4">{option.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
}
