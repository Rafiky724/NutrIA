import { useEffect, useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Step3Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSelectActividad: (
    actividad:
      | "No hago ejercicio"
      | "Ocasional (1-2 veces por semana)"
      | "Regular (3-4 veces por semana)"
      | "Frecuente (5 o más veces)"
  ) => void;
  nextStep: () => void;
};

export default function Step3({
  register,
  // errors,
  onSelectActividad,
  nextStep,
}: Step3Props) {
  const [selected, setSelected] = useState<
    | "No hago ejercicio"
    | "Ocasional (1-2 veces por semana)"
    | "Regular (3-4 veces por semana)"
    | "Frecuente (5 o más veces)"
    | null
  >(null);

  useEffect(() => {
    register("actividad", { required: "La actividad es obligatoria" });
  }, [register]);

  const handleSelect = (
    selectedOption:
      | "No hago ejercicio"
      | "Ocasional (1-2 veces por semana)"
      | "Regular (3-4 veces por semana)"
      | "Frecuente (5 o más veces)"
  ) => {
    setSelected(selectedOption);
    onSelectActividad(selectedOption); // Pasa la opción seleccionada al formulario principal
    nextStep();
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-8">
        <div className="w-20">
          <img
            src="/SVG/Pesa.svg"
            alt="Datos Perfil"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-xl">
          <h2>¿Realizas actividad física?</h2>
        </div>
      </div>

      <div className="mt-8 text-left poppins-light font_brown">
        Tu nivel de actividad física es clave para calcular tu gasto calórico y
        ajustar tus porciones
      </div>

      <div className="flex flex-col gap-2 mt-8">
        {/* Opción "No hago ejercicio" */}
        <button
          type="button"
          onClick={() => handleSelect("No hago ejercicio")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg ${
            selected === "No hago ejercicio"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          } text-sm md:text-lg`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "No hago ejercicio" ? "text-white" : "font_brown"
            }`}
          >
            No hago ejercicio
          </h4>
        </button>

        {/* Opción "Ocasional (1-2 veces por semana)" */}
        <button
          type="button"
          onClick={() => handleSelect("Ocasional (1-2 veces por semana)")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg ${
            selected === "Ocasional (1-2 veces por semana)"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          } text-sm md:text-lg`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Ocasional (1-2 veces por semana)"
                ? "text-white"
                : "font_brown"
            }`}
          >
            Ocasional (1-2 veces por semana)
          </h4>
        </button>

        {/* Opción "Regular (3-4 veces por semana)" */}
        <button
          type="button"
          onClick={() => handleSelect("Regular (3-4 veces por semana)")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg ${
            selected === "Regular (3-4 veces por semana)"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          } text-sm md:text-lg`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Regular (3-4 veces por semana)"
                ? "text-white"
                : "font_brown"
            }`}
          >
            Regular (3-4 veces por semana)
          </h4>
        </button>

        {/* Opción "Frecuente (5 o más veces)" */}
        <button
          type="button"
          onClick={() => handleSelect("Frecuente (5 o más veces)")}
          className={`w-60 md:w-80 xl:w-md mx-auto py-2 rounded-2xl cursor-pointer text-lg ${
            selected === "Frecuente (5 o más veces)"
              ? "bg_brown text-white"
              : "bg_yellow font_brown"
          } text-sm md:text-lg`}
        >
          <h4
            className={`poppins-bold text-left px-4 ${
              selected === "Frecuente (5 o más veces)"
                ? "text-white"
                : "font_brown"
            }`}
          >
            Frecuente (5 o más veces)
          </h4>
        </button>
      </div>

      {/* {errors.actividad && (
        <p className="text-red-500 text-sm mt-2">{errors.actividad.message}</p>
      )} */}
    </div>
  );
}
