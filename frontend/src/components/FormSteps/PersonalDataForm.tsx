import { useEffect, useState } from "react";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { FormData } from "../../types";

import ModalHeight from "../Modals/ModalHeight";
import ModalAge from "../Modals/ModalAge";
import GenderModal from "../Modals/GenderModal";
import ModalWeight from "../Modals/ModalWeight";
import Toast from "../Toast/Toast";

interface Props {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  showError: number;
}

export default function PersonalDataForm({
  register,
  setValue,
  getValues,
  showError,
}: Props) {
  const [showModalAge, setShowModalAge] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showModalWeight, setShowModalWeight] = useState(false);
  const [showModalHeight, setShowModalHeight] = useState(false);
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
    register("fecha_nacimiento", { required: true });
    register("genero", { required: true });
    register("peso_actual", { required: true });
    register("altura_cm", { required: true });
  }, [register]);

  const fields = [
    {
      label: "Edad",
      value: getValues("fecha_nacimiento") || "",
      onClick: () => setShowModalAge(true),
    },
    {
      label: "Género",
      value: getValues("genero") || "",
      onClick: () => setShowGenderModal(true),
    },
    {
      label: "Peso",
      value: getValues("peso_actual") ? `${getValues("peso_actual")} kg` : "",
      onClick: () => setShowModalWeight(true),
    },
    {
      label: "Altura",
      value: getValues("altura_cm") ? `${getValues("altura_cm")} cm` : "",
      onClick: () => setShowModalHeight(true),
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <div className="w-14 sm:w-16 md:w-20">
          <img
            src="/SVG/IconsGeneral/DataIcon.svg"
            alt="Datos Perfil"
            className="w-full h-auto"
          />
        </div>

        <h2 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center">
          Datos Personales
        </h2>
      </div>

      {/* Description */}
      <div className="ft-light text-gray mt-6 mb-10 text-sm sm:text-base md:text-lg text-center sm:text-center px-2 sm:px-6 md:px-12 max-w-xl mx-auto">
        <p>
          Empecemos con lo básico. Esto nos ayudará a calcular tus necesidades
          nutricionales.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        {fields.map((field, index) => (
          <div key={index} onClick={field.onClick} className="cursor-pointer">
            <div className="bg-input px-4 py-3 rounded-full flex items-center justify-between hover:scale-[1.02] transition">
              <span className="text-brown ft-bold text-sm sm:text-base">
                {field.label}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-brown ft-light text-sm sm:text-base">
                  {field.value}
                </span>

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

      {/* Modals */}
      {showModalAge && (
        <ModalAge
          onSelectAge={(age) =>
            setValue("fecha_nacimiento", age, { shouldValidate: true })
          }
          onClose={() => setShowModalAge(false)}
        />
      )}

      {showGenderModal && (
        <GenderModal
          onSelectGender={(gender) =>
            setValue("genero", gender, { shouldValidate: true })
          }
          onClose={() => setShowGenderModal(false)}
        />
      )}

      {showModalWeight && (
        <ModalWeight
          onSelectWeight={(weight) =>
            setValue("peso_actual", weight, { shouldValidate: true })
          }
          onClose={() => setShowModalWeight(false)}
        />
      )}

      {showModalHeight && (
        <ModalHeight
          onSelectHeight={(height) =>
            setValue("altura_cm", height, { shouldValidate: true })
          }
          onClose={() => setShowModalHeight(false)}
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
