import { useState, type FormEvent } from "react";
import Toast from "../Toast/Toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email) {
      setToast({
        open: true,
        message: "Oops! Parece que olvidaste ingresar tu correo electrónico.",
        type: "warning",
      });
      return;
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20 px-4 sm:px-6"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Título */}
          <h3 className="text-lg sm:text-xl ft-bold mb-4 text-center text-brown">
            Restablecer contraseña
          </h3>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-xs sm:text-sm text-brown text-justify ft-light mb-2">
              Ingresa tu correo electrónico registrado. Te enviaremos un email
              con las instrucciones para restablecer la contraseña.
            </p>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 rounded-full bg-input text-sm sm:text-base"
            />

            <button
              type="submit"
              className="w-full bg-yellow text-brown ft-medium py-2.5 rounded-full mt-4 hover:scale-105 transition cursor-pointer"
            >
              Aceptar
            </button>
          </form>
        </div>

        {/* Toast */}
        <Toast
          isOpen={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </div>
    </>
  );
}
