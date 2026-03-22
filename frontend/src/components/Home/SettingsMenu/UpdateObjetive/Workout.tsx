import { useState } from "react";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import { Link } from "react-router-dom";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import { useObjetiveFlow } from "../../../../hooks/useObjetiveFlow";

type TypeActivity =
  | "Pesas / Gimnasio"
  | "Cardio (correr, nadar, bici...)"
  | "Funcional / CrossFit"
  | "Yoga / Movilidad";

export default function Workout() {
  const { updateData } = useObjetiveFlow();
  const [selected, setSelected] = useState<TypeActivity | null>(null);

  const handleSelect = (activity: TypeActivity) => {
    setSelected(activity);
    updateData({ tipo_actividad: activity });
  };

  const options: TypeActivity[] = [
    "Pesas / Gimnasio",
    "Cardio (correr, nadar, bici...)",
    "Funcional / CrossFit",
    "Yoga / Movilidad",
  ];

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
            <div className="px-4 sm:px-6 md:px-10">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="w-12 sm:w-20">
                  <img
                    src="/SVG/IconsGeneral/RunnerIcon.svg"
                    alt="Tipo Actividad Física"
                    className="w-full h-auto"
                  />
                </div>

                <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                  <h2>
                    ¿Qué tipo de actividad física realizas con más frecuencia?
                  </h2>
                </div>
              </div>

              <div className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
                Esto nos ayudará a ajustar tu plan alimenticio para que tengas
                la energía y los nutrientes necesarios según tu estilo de
                entrenamiento.
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full sm:w-80 md:w-96 mx-auto py-2 rounded-3xl cursor-pointer ft-medium text-sm sm:text-lg transition hover:scale-105 ${
                      selected === option
                        ? "bg-brown text-white"
                        : "bg-yellow custom-bg"
                    }`}
                  >
                    <h4 className="text-center text-sm sm:text-base md:text-lg">
                      {option}
                    </h4>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Link
                to={"/meal"}
                className="w-3xs sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ArrowReturn to="/objetiveSpeed" />

      {/* Decorations */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>
      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </>
  );
}
