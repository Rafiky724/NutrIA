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
    <div>
      <div className="flex items-center justify-center space-x-8">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/WeightIcon.svg"
            alt="Datos Activida Física"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>¿Realizas actividad física?</h2>
        </div>
      </div>

      <div className="mt-8 text-justify ft-light text-gray px-6">
        Tu nivel de actividad física es clave para calcular tu gasto calórico y
        ajustar tus porciones
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <button
          type="button"
          onClick={() => handleSelect("NoHace")}
          className={`md:w-xs mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-md custom-bg`}
        >
          <h4 className={`text-center px-4`}>No hago ejercicio</h4>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Bajo")}
          className={`md:w-xs mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-md custom-bg`}
        >
          <h4 className={`text-center px-4`}>
            Ocasional (1-2 veces por semana)
          </h4>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Moderado")}
          className={`md:w-xs mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-md custom-bg`}
        >
          <h4 className={`text-center px-4`}>Regular (3-4 veces por semana)</h4>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Alto")}
          className={`md:w-xs mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-md custom-bg`}
        >
          <h4 className={`text-center px-4`}>Frecuente (5 o más veces)</h4>
        </button>
      </div>
    </div>
  );
}
