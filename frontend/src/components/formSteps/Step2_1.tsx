import { useEffect, useState } from "react";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { FormData } from "../../types";
import ModalPesoObjetivo from "../UI/Modals/ModalPesoObjetivo";
import ModalVelocidad from "../UI/Modals/ModalVelocidad";

type Step2_1Props = {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
};

export default function Step2_1({
  register,
  setValue,
  getValues,
}: Step2_1Props) {
  const [showPesoObjetivoModal, setShowPesoObjetivoModal] = useState(false);
  const [showVelocidadModal, setShowVelocidadModal] = useState(false);

  useEffect(() => {
    register("pesoObjetivo", { required: "El peso objetivo es obligatorio" });
    register("velocidad", { required: "La velocidad es obligatoria" });
  }, [register]);

  const campos = [
    {
      label: "Peso Objetivo",
      value: getValues("pesoObjetivo") ? `${getValues("pesoObjetivo")} kg` : "",
      onClick: () => setShowPesoObjetivoModal(true),
    },
    {
      label: "Velocidad",
      value: getValues("velocidad"),
      onClick: () => setShowVelocidadModal(true),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center space-x-5">
        <div className="w-30">
          <img src="/SVG/Diana.svg" alt="Objetivos" className="w-auto h-auto" />
        </div>
        <div className="poppins-bold text-xl">
          <h2>¿Cuál es tu peso objetivo?</h2>
        </div>
      </div>

      <div className="poppins-medium font_brown my-10 text-left text-md">
        <p>
          Indica el peso al que te gustaría llegar para que podamos calcular un
          plan adapatado para ti.
        </p>
      </div>

      <div className="space-y-4">
        {campos.map((campo, index) => (
          <div key={index} onClick={campo.onClick} className="cursor-pointer">
            <div className="bg_inputs px-4 py-3 rounded-full flex items-center justify-between">
              <span className="font_brown poppins-bold">{campo.label}</span>
              <div className="flex items-center gap-2">
                <span className="font_brown">{campo.value}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 font_brown"
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

      {/* Modales */}
      {showPesoObjetivoModal && (
        <ModalPesoObjetivo
          onSelectPesoObjetivo={(peso) =>
            setValue("pesoObjetivo", peso, { shouldValidate: true })
          }
          onClose={() => setShowPesoObjetivoModal(false)}
        />
      )}

      {showVelocidadModal && (
        <ModalVelocidad
          onSelectVelocidad={(velocidad) =>
            setValue("velocidad", velocidad, { shouldValidate: true })
          }
          onClose={() => setShowVelocidadModal(false)}
        />
      )}
    </>
  );
}
