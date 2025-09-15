import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type TipoDieta = "Presupuesto" | "Disponible";

type Step6Props = {
  register: UseFormRegister<FormData>;
  onSelectTipoDieta: (tipoDieta: TipoDieta) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export default function Step6({
  register,
  onSelectTipoDieta,
  nextStep,
  prevStep,
}: Step6Props) {
  const [, setSelected] = useState<TipoDieta>();

  useEffect(() => {
    register("tipoDieta", { required: "La pregunta es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: TipoDieta) => {
    setSelected(selectedOption);
    onSelectTipoDieta(selectedOption);
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
        <div className="w-20">
          <img
            src="/SVG/MenuManzana.svg"
            alt="Datos Perfil"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-xl">
          <h2>¿Cómo quieres que construyamos tu dieta?</h2>
        </div>
      </div>

      <div className="mt-8 text-left poppins-light font_brown">
        Puedes elegir entre basarla en tu presupuesto o en los alimentos que ya
        tienes disponibles. Ambas opciones te permiten filtrar por tus
      </div>

      <div className="flex flex-col gap-2 mt-12 mb-8">
        <button
          type="button"
          onClick={() => handleSelect("Presupuesto")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg custom-bg mb-4`}
        >
          <h4 className={`poppins-bold text-left px-4 text-sm md:text-lg`}>
            Basada en presupuesto
          </h4>
          <p
            className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 md:block hidden`}
          >
            La dieta se ajustará a un presupuesto semanal, incluyendo los
            alimentos que selecciones.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Disponible")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg custom-bg`}
        >
          <h4 className={`poppins-bold text-left px-4 text-sm md:text-lg`}>
            Basada en alimentos disponibles
          </h4>
          <p
            className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 md:block hidden`}
          >
            La dieta se ajustará a lo que tengas en casa o a lo que tengas fácil
            acceso.
          </p>
        </button>
      </div>

      <div className="absolute top-5 left-5 z-10 w-10">
        <img
          src="/SVG/Flecha.svg"
          alt="Volver al paso anterior"
          className="w-auto h-auto cursor-pointer"
          onClick={() => handlePrevStep()}
        />
      </div>
    </>
  );
}
