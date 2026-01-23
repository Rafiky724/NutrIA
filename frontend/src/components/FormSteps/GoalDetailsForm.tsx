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
      <div className="flex items-center justify-center space-x-5">
        <div className="w-20">
          <img
            src="/SVG/IconsGeneral/ArrowTarget.svg"
            alt="Objetivos"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl">
          <h2>¿Cuál es tu peso objetivo?</h2>
        </div>
      </div>

      <div className="ft-light text-gray my-10 text-left text-md px-6">
        <p>
          Indica el peso al que te gustaría llegar para que podamos calcular un
          plan adapatado para ti.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {fields.map((field, index) => (
          <div
            key={index}
            onClick={field.onClick}
            className="cursor-pointer w-sm mx-auto"
          >
            <div className="bg-input px-4 py-3 rounded-full flex items-center justify-between">
              <span className="text-brown ft-medium">{field.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-brown ft-light">{field.value}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-brown"
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

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}
