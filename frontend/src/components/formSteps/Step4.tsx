import { useEffect, useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Step4Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSelectTieneEnfermedad: (tieneEnfermedad: "Sí" | "No") => void;
  nextStep: () => void;
};

export default function Step4({
  register,
  onSelectTieneEnfermedad,
  nextStep,
}: Step4Props) {
  const [selected, setSelected] = useState<"Sí" | "No" | null>(null);

  useEffect(() => {
    register("tieneEnfermedad", { required: "La pregunta es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: "Sí" | "No") => {
    setSelected(selectedOption);
    onSelectTieneEnfermedad(selectedOption);
    if (selectedOption === "No") {
      nextStep();
      nextStep();
    } else {
      nextStep();
    }
  };

  return (
    <div>
      {/* Solo mostrar si aún no se ha seleccionado una opción */}
      {selected === null && (
        <>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-20">
              <img
                src="/SVG/Corazon.svg"
                alt="Datos Perfil"
                className="w-auto h-auto"
              />
            </div>
            <div className="poppins-bold text-xl">
              <h2>¿Tienes alguna enfermedad?</h2>
            </div>
          </div>

          <div className="mt-8 text-left poppins-light font_brown">
            Algunas enfermedades requieren una dieta especial para cuidar tu
            salud.
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <button
              type="button"
              onClick={() => handleSelect("Sí")}
              className="w-40 lg:w-80 mx-auto py-2 rounded-full cursor-pointer text-lg custom-bg"
            >
              <h4 className="poppins-bold text-center px-4">Sí</h4>
            </button>

            <button
              type="button"
              onClick={() => handleSelect("No")}
              className="w-40 lg:w-80 mx-auto py-2 rounded-full cursor-pointer text-lg custom-bg"
            >
              <h4 className="poppins-bold text-center px-4">No</h4>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
