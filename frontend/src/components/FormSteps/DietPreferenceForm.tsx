import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData, TypeDiet } from "../../types";
import ArrowReturn from "../Decoration/ArrowReturn";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectDietType: (typeDiet: TypeDiet) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function DietPreferenceForm({
  register,
  onSelectDietType,
  nextStep,
  prevStep,
}: Props) {
  const [, setSelected] = useState<TypeDiet>();

  useEffect(() => {
    register("tipo_dieta", { required: "La pregunta es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: TypeDiet) => {
    setSelected(selectedOption);
    onSelectDietType(selectedOption);
    if (selectedOption === "Disponible") {
      nextStep();
      nextStep();
    } else {
      nextStep();
    }
  };

  const handlePrevStep = () => {
    prevStep();
    prevStep();
  };

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-3 sm:space-y-0">
        <div className="w-16 sm:w-20">
          <img
            src="/SVG/IconsGeneral/TableApple.svg"
            alt="Datos Dieta"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>¿Cómo quieres que construyamos tu dieta?</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="ft-light text-justify text-gray my-6 md:my-10 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Puedes elegir entre basarla en tu presupuesto o en los alimentos que ya
        tienes disponibles. Ambas opciones te permitirán filtrar por tus gustos
        y restricciones.
      </div>

      {/* Botones de selección */}
      <div className="flex flex-col gap-4 mt-8 mb-8">
        <button
          type="button"
          onClick={() => handleSelect("Presupuesto")}
          className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4"
        >
          <h4 className="ft-medium text-left text-sm sm:text-lg">
            Basada en presupuesto
          </h4>
          <p className="text-sm sm:text-base text-justify ft-light md:block hidden">
            La dieta se ajustará a un presupuesto semanal, incluyendo los
            alimentos que selecciones.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Disponible")}
          className="w-full sm:w-lg mx-auto rounded-2xl cursor-pointer text-lg custom-bg p-4"
        >
          <h4 className="ft-medium text-left text-sm sm:text-lg">
            Basada en alimentos disponibles
          </h4>
          <p className="text-sm sm:text-base text-justify ft-light md:block hidden">
            La dieta se ajustará a lo que tengas en casa o a lo que tengas fácil
            acceso.
          </p>
        </button>
      </div>

      {/* Flecha de retorno */}
      <div className="flex justify-start px-2 sm:px-6">
        <ArrowReturn onClick={handlePrevStep} />
      </div>
    </div>
  );
}
