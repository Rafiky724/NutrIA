import { useEffect, useState } from "react";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { FormData } from "../../types";
import ModalWeightTarget from "../Modals/ModalWeightTarget";
import ModalSpeed from "../Modals/ModalSpeed";
import Toast from "../Toast/Toast";

type Props = {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  showError: number;
};

export default function GoalDetailsForm({
  register,
  setValue,
  getValues,
  showError,
}: Props) {
  const [showModalTargetWeight, setShowModalTargetWeight] = useState(false);
  const [showModalSpeed, setShowModalSpeed] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  useEffect(() => {
    if (showError > 0) {
      setToast({
        open: true,
        message: "Debes rellenar todos los campos antes de continuar",
        type: "error",
      });
    }
  }, [showError]);

  useEffect(() => {
    register("peso_objetivo", { required: "El peso objetivo es obligatorio" });
    register("velocidad_dieta", { required: "La velocidad es obligatoria" });
  }, [register]);

  const fields = [
    {
      label: "Peso Objetivo",
      value: getValues("peso_objetivo")
        ? `${getValues("peso_objetivo")} kg`
        : "",
      onClick: () => setShowModalTargetWeight(true),
    },
    {
      label: "Velocidad",
      value: getValues("velocidad_dieta"),
      onClick: () => setShowModalSpeed(true),
    },
  ];

  return (
    <>
      {/* Encabezado */}
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

      {/* Texto explicativo */}
      <div className="ft-light text-gray my-6 md:my-10 text-left text-sm sm:text-base md:text-md px-4 sm:px-6 md:px-0">
        <p>
          Indica el peso al que te gustaría llegar para que podamos calcular un
          plan adaptado para ti.
        </p>
      </div>

      {/* Campos interactivos */}
      <div className="flex flex-col gap-4 mb-8 px-4 sm:px-6 md:px-0 ">
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

      {/* Modales */}
      {showModalTargetWeight && (
        <ModalWeightTarget
          onSelectTargetWeight={(weight) =>
            setValue("peso_objetivo", weight, { shouldValidate: true })
          }
          onClose={() => setShowModalTargetWeight(false)}
        />
      )}

      {showModalSpeed && (
        <ModalSpeed
          onSelectSpeed={(speed) =>
            setValue("velocidad_dieta", speed, { shouldValidate: true })
          }
          onClose={() => setShowModalSpeed(false)}
        />
      )}

      {/* Toast */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}
