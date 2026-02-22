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
    register("fecha_nacimiento", { required: "La edad es obligatoria" });
    register("genero", { required: "El género es obligatorio" });
    register("peso_actual", { required: "El peso es obligatorio" });
    register("altura_cm", { required: "La altura es obligatoria" });
  }, [register]);

  const fields = [
    {
      label: "Edad",
      value: getValues("fecha_nacimiento")
        ? `${getValues("fecha_nacimiento")}`
        : "",
      onClick: () => setShowModalAge(true),
    },
    {
      label: "Género",
      value: getValues("genero"),
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
      <div className="flex items-center justify-center space-x-10">
        <div className="w-20">
          <img
            src="/SVG/IconsGeneral/DataIcon.svg"
            alt="Datos Perfil"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-xl text-brown">
          <h2>Datos Personales</h2>
        </div>
      </div>

      <div className="ft-light text-gray my-10 text-justify text-md px-10">
        <p>
          Empecemos con los básico. Esto nos ayudará a calcular tus necesidades
          nutricionales.
        </p>
      </div>

      <div className="space-y-4 w-xs mx-auto mb-4">
        {fields.map((field, index) => (
          <div key={index} onClick={field.onClick} className="cursor-pointer">
            <div className="bg-input px-4 py-3 rounded-full flex items-center justify-between">
              <span className="text-brown ft-bold text-sm">{field.label}</span>
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
