import { useState } from "react";
import ModalWeightTarget from "../../../Modals/ModalWeightTarget";
import ModalSpeed from "../../../Modals/ModalSpeed";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import { Link } from "react-router-dom";

export default function ObjetiveSpeed() {
  const [targetWeight, setTargetWeight] = useState<number | null>(null);
  const [speed, setSpeed] = useState<string>("");

  const [showModalTargetWeight, setShowModalTargetWeight] = useState(false);
  const [showModalSpeed, setShowModalSpeed] = useState(false);

  const fields = [
    {
      label: "Peso Objetivo",
      value: targetWeight ? `${targetWeight} kg` : "",
      onClick: () => setShowModalTargetWeight(true),
    },
    {
      label: "Velocidad",
      value: speed,
      onClick: () => setShowModalSpeed(true),
    },
  ];

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
            <div className="px-4 sm:px-6 md:px-10">
              <div className="flex flex-col md:flex-row items-center justify-center md:space-x-5 space-y-3 md:space-y-0">
                <div className="w-16 md:w-20">
                  <img
                    src="/SVG/IconsGeneral/ArrowTarget.svg"
                    alt="Objetivos"
                    className="w-auto h-auto"
                  />
                </div>

                <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                  <h2>¿Cuál es tu peso objetivo?</h2>
                </div>
              </div>

              <div className="ft-light text-gray my-6 md:my-10 text-left text-sm sm:text-base md:text-md px-4 sm:px-6 md:px-0">
                <p>
                  Indica el peso al que te gustaría llegar para que podamos
                  calcular un plan adaptado para ti.
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-8 px-4 sm:px-6 md:px-0">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    onClick={field.onClick}
                    className="w-full md:w-80 mx-auto hover:scale-105 transition cursor-pointer"
                  >
                    <div className="bg-input px-4 py-3 rounded-full flex items-center justify-between">
                      <span className="text-brown ft-medium text-sm sm:text-base md:text-base">
                        {field.label}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-brown ft-light text-sm sm:text-base md:text-base">
                          {field.value}
                        </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-brown"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Link
                to={"/Workout"}
                className="w-3xs sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Peso Objetivo */}
      {showModalTargetWeight && (
        <ModalWeightTarget
          onSelectTargetWeight={(weight: number) => {
            setTargetWeight(weight);
            setShowModalTargetWeight(false);
          }}
          onClose={() => setShowModalTargetWeight(false)}
        />
      )}

      {/* Modal Velocidad */}
      {showModalSpeed && (
        <ModalSpeed
          onSelectSpeed={(selectedSpeed: string) => {
            setSpeed(selectedSpeed);
            setShowModalSpeed(false);
          }}
          onClose={() => setShowModalSpeed(false)}
        />
      )}

      <ArrowReturn to="/activity" />

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
