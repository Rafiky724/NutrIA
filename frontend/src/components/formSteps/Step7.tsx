import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";

type Presupuesto = "Muy bajo" | "Bajo" | "Estándar" | "Alto" | "Muy alto";

type Step8Props = {
  register: UseFormRegister<FormData>;
  onSelectPresupuesto: (presupuesto: Presupuesto) => void;
};

export default function Step7({ register, onSelectPresupuesto }: Step8Props) {
  const [selected, setSelected] = useState<Presupuesto>();

  useEffect(() => {
    register("presupuesto", {
      required: "El tipo presupuesto es obligatorio",
    });
  }, [register]);

  const handleSelect = (presupuesto: Presupuesto) => {
    setSelected(presupuesto);
    onSelectPresupuesto(presupuesto);
  };

  const opciones: { label: Presupuesto; precio: string }[] = [
    { label: "Muy bajo", precio: "$80.000 COP" },
    { label: "Bajo", precio: "$100.000 COP" },
    { label: "Estándar", precio: "$130.000 COP" },
    { label: "Alto", precio: "$160.000 COP" },
    { label: "Muy alto", precio: "+$200.000 COP" },
  ];

  return (
    <>
      <div className="flex items-center justify-center space-x-10">
        <div className="w-20">
          <img
            src="/SVG/Dinero.svg"
            alt="Presupuesto"
            className="w-auto h-auto"
          />
        </div>
        <div className="poppins-bold text-2xl">
          <h2>Basada en presupuesto</h2>
        </div>
      </div>

      <div className="poppins-medium font_brown my-5 text-left text-md">
        <p>¿Cuál es tu presupuesto semanal para alimentación?</p>
      </div>

      <div className="w-full lg:w-sm mx-auto space-y-4">
        {opciones.map(({ label, precio }) => (
          <div
            key={label}
            onClick={() => handleSelect(label)}
            className="cursor-pointer"
          >
            <div
              className={`px-4 py-3 rounded-full flex items-center justify-between ${
                selected === label
                  ? "bg_brown text-white"
                  : "bg_inputs font_brown"
              }`}
            >
              <span className="poppins-bold">{label}</span>
              <span className="poppins-medium text-lg">{precio}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
