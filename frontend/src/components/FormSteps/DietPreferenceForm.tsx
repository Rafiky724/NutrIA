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
    <>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/TableApple.svg"
            alt="Datos Dieta"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown w-xs">
          <h2>¿Cómo quieres que construyamos tu dieta?</h2>
        </div>
      </div>

      <div className="mt-8 text-justify ft-light text-gray px-6">
        Puedes elegir entre basarla en tu presupuesto o en los alimentos que ya
        tienes disponibles. Ambas opciones te permitirán filtrar por tus gustos
        y restricciones.
      </div>

      <div className="flex flex-col gap-2 mt-12 mb-8">
        <button
          type="button"
          onClick={() => handleSelect("Presupuesto")}
          className={`w-sm mx-auto rounded-2xl cursor-pointer text-lg custom-bg mb-2 p-4`}
        >
          <h4 className={`ft-medium text-left text-md`}>
            Basada en presupuesto
          </h4>
          <p className={`text-sm text-justify ft-light md:block hidden`}>
            La dieta se ajustará a un presupuesto semanal, incluyendo los
            alimentos que selecciones.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Disponible")}
          className={`w-sm mx-auto rounded-2xl cursor-pointer text-lg custom-bg mb-2 p-4`}
        >
          <h4 className={`ft-medium text-left text-md`}>
            Basada en alimentos disponibles
          </h4>
          <p className={`text-sm text-justify ft-light md:block hidden`}>
            La dieta se ajustará a lo que tengas en casa o a lo que tengas fácil
            acceso.
          </p>
        </button>
      </div>

      <ArrowReturn onClick={handlePrevStep} />
    </>
  );
}
