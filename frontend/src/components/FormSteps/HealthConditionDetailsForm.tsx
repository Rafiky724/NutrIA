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
    <div className="relative">
      <div className="flex items-center justify-center space-x-4">
        <div className="w-15">
          <img
            src="/SVG/IconsGeneral/Shield.svg"
            alt="Condición médica"
            className="w-auto h-auto"
          />
        </div>
        <div className="ft-bold text-2xl text-brown">
          <h2>Explica un poco tu condición médica</h2>
        </div>
      </div>

      <div className="mt-8 text-left ft-light text-gray px-6">
        Tranquilo, esta información solo se usará para personalizar tu dieta de
        forma segura y efectiva.
      </div>

      <div className="mt-6 relative">
        <textarea
          {...register("enfermedad", {
            required: "Este campo es obligatorio",
            onChange: (event) => onSelectDisease(event.target.value),
          })}
          rows={6}
          placeholder="Ingresa tu condición médica."
          className="w-full px-4 py-3 pr-14 rounded-3xl resize-none bg-input text-gray ft-light"
        />

        <img
          src="/SVG/IconsGeneral/MicrophoneIcon.svg"
          alt="Micrófono"
          className="absolute bottom-5 right-5 w-6 h-6 cursor-pointer"
        />
      </div>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
