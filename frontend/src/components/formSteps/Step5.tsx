import { useEffect } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Step5Props = {
  register: UseFormRegister<FormData>;
  onSelectEnfermedad: (enfermedad: string) => void;
};

export default function Step5({ register, onSelectEnfermedad }: Step5Props) {
  useEffect(() => {
    // Inicializa el valor a vacío si no se ha escrito nada
    onSelectEnfermedad("");
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-center space-x-4">
        <div className="w-20">
          <img
            src="/SVG/Escudo.svg"
            alt="Condición médica"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-xl">
          <h2>Explica un poco tu condición médica</h2>
        </div>
      </div>

      <div className="mt-8 text-left poppins-light font_brown text-sm">
        Tranquilo, esta información solo se usará para personalizar tu dieta de
        forma segura y efectiva.
      </div>

      <div className="mt-6 relative">
        <textarea
          {...register("enfermedad", {
            required: "Este campo es obligatorio",
            onChange: (e) => onSelectEnfermedad(e.target.value),
          })}
          rows={6}
          placeholder="Tranquilo, esta información solo se usará para personalizar tu dieta de forma segura y efectiva."
          className="w-full px-4 py-3 pr-14 rounded-3xl resize-none bg_inputs focus:outline-none focus:ring-2 focus:ring-yellow-400 font_brown poppins-light"
        />

        {/* Ícono de micrófono */}
        <img
          src="/SVG/Micrófono.svg"
          alt="Micrófono"
          className="absolute bottom-5 right-5 w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  );
}
