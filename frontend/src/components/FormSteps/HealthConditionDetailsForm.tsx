import { useEffect, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../../types";
import Toast from "../Toast/Toast";

type Props = {
  register: UseFormRegister<FormData>;
  onSelectDisease: (disease: string) => void;
  showError: number;
};

export default function HealthConditionDetailsForm({
  register,
  onSelectDisease,
  showError,
}: Props) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  useEffect(() => {
    onSelectDisease("");
  }, []);

  useEffect(() => {
    if (showError > 0) {
      setToast({
        open: true,
        message: "Debes rellenar todos los campos antes de continuar",
        type: "error",
      });
    }
  }, [showError]);

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="w-16 sm:w-20">
          <img
            src="/SVG/IconsGeneral/Shield.svg"
            alt="Condición médica"
            className="w-full h-auto"
          />
        </div>
        <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
          <h2>Explica un poco tu condición médica</h2>
        </div>
      </div>

      {/* Descripción */}
      <div className="ft-light text-justify text-gray my-6 md:my-10 text-sm sm:text-base md:text-md px-2 sm:px-6">
        Tranquilo, esta información solo se usará para personalizar tu dieta de
        forma segura y efectiva.
      </div>

      {/* Textarea */}
      <div className="mt-6 relative">
        <textarea
          {...register("enfermedad", {
            required: "Este campo es obligatorio",
            onChange: (event) => onSelectDisease(event.target.value),
          })}
          rows={6}
          placeholder="Ingresa tu condición médica."
          className="w-full px-4 py-3 pr-14 rounded-2xl sm:rounded-3xl resize-none bg-input text-gray ft-light text-sm sm:text-base"
        />

        {/* <img
          src="/SVG/IconsGeneral/MicrophoneIcon.svg"
          alt="Micrófono"
          className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 w-5 sm:w-6 h-5 sm:h-6 cursor-pointer"
        /> */}
      </div>

      {/* Toast */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
