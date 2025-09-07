import type { UseFormRegister } from "react-hook-form";
import type { FormData, TipoActividad } from "../../types";
import { useEffect, useState } from "react";

type Step7Props = {
  register: UseFormRegister<FormData>;
  onSelectActividad: (actividad: TipoActividad) => void;
  nextStep: () => void;
};

export default function Step7({
  register,
  onSelectActividad,
  nextStep,
}: Step7Props) {
  const [selected, setSelected] = useState<TipoActividad>();

  useEffect(() => {
    register("tipoActividad", {
      required: "El tipo de actividad es obligatorio",
    });
  }, [register]);

  const handleSelect = (actividad: TipoActividad) => {
    setSelected(actividad);
    onSelectActividad(actividad);
    nextStep();
  };

  const opciones: TipoActividad[] = ["Pesas / Gimnasio", "Cardio (correr, nadar, bici...)", "Funcional / CrossFit", "Yoga / Movilidad"];

  return (
    <div>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/Corredor.svg"
            alt="Tipo Actividad"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-2xl w-md">
          <h2>¿Qué tipo de actividad física realizas con más frecuencia?</h2>
        </div>
      </div>

      <div className="mt-8 text-left poppins-light font_brown">
        Esto nos ayudará a ajustar tu plan alimenticio para que tengas la energía y los nutrientes necesarios según tu estilo de entrenamiento.
      </div>

      <div className="flex flex-col gap-2 mt-8">
        {opciones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => handleSelect(opcion)}
            className={`w-60 xl:w-sm mx-auto py-2 rounded-4xl cursor-pointer poppins-medium text-sm md:text-lg custom-bg ${
              selected === opcion ? "bg-[#c8e6c9]" : ""
            }`}
          >
            <h4 className="text-center px-4">{opcion}</h4>
          </button>
        ))}
      </div>
    </div>
  );
}
