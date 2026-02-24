import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData, HasDisease } from "../../types";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectHasDisease: (hasDisease: HasDisease) => void;
  nextStep: () => void;
};

export default function HealthConditionCheckForm({
  register,
  onSelectHasDisease,
  nextStep,
}: Props) {
  const [, setSelected] = useState<HasDisease>();

  useEffect(() => {
    register("tieneEnfermedad", { required: "La pregunta es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: HasDisease) => {
    setSelected(selectedOption);
    onSelectHasDisease(selectedOption);
    if (selectedOption === "No") {
      nextStep();
      nextStep();
    } else {
      nextStep();
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="w-16 sm:w-20">
          <img
            src="/SVG/IconsGeneral/Heart.svg"
            alt="Datos Condición médica"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-xl sm:text-2xl text-brown text-center sm:text-left">
          <h2>¿Tienes alguna condición médica?</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-6 sm:mt-8 text-justify ft-light text-gray text-sm sm:text-base px-2 sm:px-6">
        Algunas enfermedades requieren una dieta especial para cuidar tu salud.
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 mt-6 sm:mt-8">
        {[
          { label: "Sí", value: "Sí" },
          { label: "No", value: "No" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value as HasDisease)}
            className="w-full sm:w-60 md:w-80 mx-auto py-3 rounded-full cursor-pointer text-lg sm:text-xl ft-medium custom-bg transition hover:scale-105"
          >
            <h4 className="text-center px-4">{option.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
}
