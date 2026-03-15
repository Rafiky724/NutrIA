import { useState } from "react";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import { Link } from "react-router-dom";

type LevelActivity = "NoHace" | "Bajo" | "Moderado" | "Alto";

export default function Activity() {
  const [, setSelected] = useState<LevelActivity>();

  const handleSelect = (selectedOption: LevelActivity) => {
    setSelected(selectedOption);
  };

  const options = [
    { label: "No hago ejercicio", value: "NoHace" },
    { label: "Ocasional (1-2 veces por semana)", value: "Bajo" },
    { label: "Regular (3-4 veces por semana)", value: "Moderado" },
    { label: "Frecuente (5 o más veces)", value: "Alto" },
  ];

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
          <div className="px-4 sm:px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="w-10 md:w-20">
                <img
                  src="/SVG/IconsGeneral/WeightIcon.svg"
                  alt="Datos Actividad Física"
                  className="w-full h-auto"
                />
              </div>

              <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                <h2>¿Realizas actividad física?</h2>
              </div>
            </div>

            <div className="ft-light text-justify text-gray my-6 md:my-10 text-sm sm:text-base md:text-md px-2 sm:px-6">
              Tu nivel de actividad física es clave para calcular tu gasto
              calórico y ajustar tus porciones
            </div>

            <div className="flex flex-col gap-2 mt-6 sm:mt-8">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value as LevelActivity)}
                  className="w-full sm:w-80 md:w-96 mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-sm sm:text-lg custom-bg transition hover:scale-105"
                >
                  <h4 className="text-center px-4">{option.label}</h4>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Link
              to={"/objetiveSpeed"}
              className="w-3xs sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>

      <ArrowReturn to="/objetive" />

      {/* Decorations */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
