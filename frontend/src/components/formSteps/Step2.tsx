import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";
import { useEffect, useState } from "react";

type Step2Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSelectObjetivo: (
    objetivo: "Bajar de peso" | "Mantener" | "Ganar masa muscular"
  ) => void;
  nextStep: () => void;
};

export default function Step2({
  register,
  // errors,
  onSelectObjetivo,
  nextStep,
}: Step2Props) {
  const [selected, setSelected] = useState<
    "Bajar de peso" | "Mantener" | "Ganar masa muscular" | null
  >(null);

  useEffect(() => {
    // Registrar el campo objetivo con validación
    register("objetivo", { required: "El objetivo es obligatorio" });
  }, [register]);

  const handleSelect = (
    selectedOption: "Bajar de peso" | "Mantener" | "Ganar masa muscular"
  ) => {
    setSelected(selectedOption);
    onSelectObjetivo(selectedOption); // Pasa la opción seleccionada al formulario principal
    nextStep();
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-5">
        <div className="w-20">
          <img
            src="/SVG/Bandera.svg"
            alt="Datos Perfil"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-xl">
          <h2>¿Cuál es tu objetivo?</h2>
        </div>
      </div>

      <div className="mt-6 text-left poppins-light font_brown">
        Tu meta nos permitirá construir un plan enfocado en tus resultados, con
        el equilibrio adecuado entre calorías y nutrientes.
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <button
          type="button"
          onClick={() => handleSelect("Bajar de peso")}
          className={`w-60 md:w-80 xl:w-xl mx-auto py-2 rounded-xl cursor-pointer text-lg ${
            selected === "Bajar de peso"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          }`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Bajar de peso" ? "text-white" : "font_brown"
            } text-sm md:text-lg`}
          >
            Bajar de peso
          </h4>
          <p
            className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 ${
              selected === "Bajar de peso" ? "text-white" : "font_brown"
            } md:block hidden`}
          >
            Elige esta opción si tu objetivo es reducir grasa corporal de forma
            saludable.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Mantener")}
          className={`w-60 md:w-80 xl:w-xl mx-auto py-2 rounded-xl cursor-pointer text-lg ${
            selected === "Mantener"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          }`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Mantener" ? "text-white" : "font_brown"
            } text-sm md:text-lg`}
          >
            Mantener
          </h4>
          <p
            className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 ${
              selected === "Mantener" ? "text-white" : "font_brown"
            } md:block hidden`}
          >
            Ideal si quieres conservar tu peso actual y seguir una alimentación
            equilibrada.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelect("Ganar masa muscular")}
          className={`w-60 md:w-80 xl:w-xl mx-auto py-2 rounded-xl cursor-pointer text-lg ${
            selected === "Ganar masa muscular"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          }`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Ganar masa muscular" ? "text-white" : "font_brown"
            } text-sm md:text-lg`}
          >
            Ganar masa muscular
          </h4>
          <p
            className={`text-sm mt-2 text-left poppins-medium px-4 pb-2 ${
              selected === "Ganar masa muscular" ? "text-white" : "font_brown"
            } md:block hidden`}
          >
            Recomendado si buscas aumentar tu peso mediante el desarrollo
            muscular.
          </p>
        </button>
      </div>

      {/* {errors.objetivo && (
        <p className="text-red-500 text-sm mt-2">{errors.objetivo.message}</p>
      )} */}
    </>
  );
}
