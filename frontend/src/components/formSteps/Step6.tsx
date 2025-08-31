import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Step6Props = {
  register: UseFormRegister<FormData>;
  //   errors: FieldErrors<FormData>;
  onSelectTipoDieta: (tipoDieta: "Presupuesto" | "Disponible") => void;
  nextStep: () => void;
};

export default function Step6({
  register,
  onSelectTipoDieta,
  nextStep,
}: Step6Props) {
  const [selected, setSelected] = useState<"Presupuesto" | "Disponible" | null>(
    null
  );

  useEffect(() => {
    register("tipoDieta", { required: "La pregunta es obligatoria" });
  }, [register]);

  const handleSelect = (selectedOption: "Presupuesto" | "Disponible") => {
    setSelected(selectedOption);
    onSelectTipoDieta(selectedOption);
    nextStep();
  };

  return (
    <div>
      {/* Solo mostrar si aún no se ha seleccionado una opción */}
      {selected === null && (
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
            Puedes elegir entre basarla en tu presupuesto o en los alimentos que
            ya tienes disponibles. Ambas opciones te permiten filtrar por tus
          </div>

          <div className="flex flex-col gap-2 mt-12 mb-8">
            <button
              type="button"
              onClick={() => handleSelect("Presupuesto")}
              className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-xl cursor-pointer text-lg ${
                selected === "Presupuesto"
                  ? "bg_brown text-white"
                  : "bg_yellow font_brown"
              }`}
            >
              <h4
                className={`poppins-bold text-left px-4 ${
                  selected === "Presupuesto" ? "text-white" : "font_brown"
                } text-sm md:text-lg`}
              >
                Basada en presupuesto
              </h4>
              <p
                className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 ${
                  selected === "Presupuesto" ? "text-white" : "font_brown"
                } md:block hidden`}
              >
                La dieta se ajustará a un presupuesto semanal, incluyendo los alimentos que selecciones.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelect("Disponible")}
              className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-xl cursor-pointer text-lg ${
                selected === "Disponible"
                  ? "bg_brown text-white"
                  : "bg_yellow font_brown"
              }`}
            >
              <h4
                className={`poppins-bold text-left px-4 ${
                  selected === "Disponible" ? "text-white" : "font_brown"
                } text-sm md:text-lg`}
              >
                Basada en alimentos disponibles
              </h4>
              <p
                className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 ${
                  selected === "Disponible" ? "text-white" : "font_brown"
                } md:block hidden`}
              >
                La dieta se ajustará a lo que tengas en casa o a lo que tengas fácil acceso.
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
