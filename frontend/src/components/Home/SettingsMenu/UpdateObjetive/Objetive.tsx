import { useState } from "react";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import { Link } from "react-router-dom";
import { useObjetiveFlow } from "../../../../hooks/useObjetiveFlow";

type TargetType = "PerderPeso" | "MantenerPeso" | "GanarMasaMuscular" | "";

export default function Objetive() {
  const { updateData } = useObjetiveFlow();
  const [selected, setSelected] = useState<TargetType>("");

  const handleSelect = (selectedOption: TargetType) => {
    setSelected(selectedOption);

    let tipo_objetivo = "";
    if (selectedOption === "PerderPeso") tipo_objetivo = "perder_peso";
    if (selectedOption === "MantenerPeso") tipo_objetivo = "mantener_peso";
    if (selectedOption === "GanarMasaMuscular") tipo_objetivo = "ganar_masa";

    updateData({ tipo_objetivo });
  };

  const buttonClass = (option: TargetType) =>
    `w-full md:w-lg mx-auto py-3 rounded-xl text-left hover:scale-105 transition cursor-pointer ${
      selected === option ? "bg-brown text-white" : "bg-yellow custom-bg"
    }`;

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-4xl shadow-lg text-center z-50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="w-10 md:w-14 xl:w-20">
                <img
                  src="/SVG/IconsGeneral/FlagIcon.svg"
                  alt="Objetivo"
                  className="w-auto h-auto"
                />
              </div>

              <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center">
                <h2>¿Cuál es tu objetivo?</h2>
              </div>
            </div>

            <div className="mt-4 md:mt-5 text-justify ft-light text-gray px-4 sm:px-6 md:px-0 text-sm sm:text-base md:text-lg">
              Tu meta nos permitirá construir un plan enfocado en tus
              resultados, con el equilibrio adecuado entre calorías y
              nutrientes.
            </div>

            <div className="flex flex-col gap-4 mt-4 md:mt-5 px-4 sm:px-6 md:px-0">
              <button
                type="button"
                onClick={() => handleSelect("PerderPeso")}
                className={buttonClass("PerderPeso")}
              >
                <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
                  Bajar de peso
                </h4>
                <p className="text-xs sm:text-sm md:text-base px-4">
                  Elige esta opción si tu objetivo es reducir grasa corporal de
                  forma saludable.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("MantenerPeso")}
                className={buttonClass("MantenerPeso")}
              >
                <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
                  Mantener
                </h4>
                <p className="text-xs sm:text-sm md:text-base px-4">
                  Ideal si quieres conservar tu peso actual y seguir una
                  alimentación equilibrada.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelect("GanarMasaMuscular")}
                className={buttonClass("GanarMasaMuscular")}
              >
                <h4 className="ft-bold text-sm sm:text-base md:text-lg px-4">
                  Ganar masa muscular
                </h4>
                <p className="text-xs sm:text-sm md:text-base px-4">
                  Recomendado si buscas aumentar tu peso mediante el desarrollo
                  muscular.
                </p>
              </button>
            </div>

            <div className="flex justify-center pt-4">
              <Link
                to={"/activity"}
                className="w-3xs sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>

        <ArrowReturn to="/Config" />

        {/* Decorations */}
        <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitLeft />
        </div>
        <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitRight />
        </div>
      </div>
    </>
  );
}
