import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData, HasDisease } from "../../types";

type Step4Props = {
  register: UseFormRegister<FormData>;
  onSelectHasDisease: (hasDisease: HasDisease) => void;
  nextStep: () => void;
};

export default function HealthConditionCheckForm({
  register,
  onSelectHasDisease,
  nextStep,
}: Step4Props) {
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
    <div>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/Heart.svg"
            alt="Datos Condición médica"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>¿Tienes alguna condición médica?</h2>
        </div>
      </div>
      <div className="mt-8 text-justify ft-light text-gray px-4">
        Algunas enfermedades requieren una dieta especial para cuidar tu salud.
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <button
          type="button"
          onClick={() => handleSelect("Sí")}
          className="w-xs mx-auto py-2 rounded-full cursor-pointer text-lg custom-bg"
        >
          <h4 className="ft-medium text-center px-4">Sí</h4>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("No")}
          className="w-xs mx-auto py-2 rounded-full cursor-pointer text-lg custom-bg"
        >
          <h4 className="ft-medium text-center px-4">No</h4>
        </button>
      </div>{" "}
    </div>
  );
}
