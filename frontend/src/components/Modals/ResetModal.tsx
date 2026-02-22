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
      <div className="fixed inset-0 bg-black opacity-80 z-50"></div>

      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl px-10 py-4 w-100 shadow-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <h3 className="text-lg ft-bold mb-4 text-center text-brown">
            Restablecer contraseña
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-12">
              <p className="text-xs text-brown text-justify ft-light mb-8">
                Ingresa tu correo electrónico registrado. Te enviaremos un email
                con las instrucciones para restablecer la contraseña.
              </p>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-2 rounded-full bg-input"
              />
            </div>
            <div className="flex w-60 mx-auto">
              <button
                type="submit"
                className="flex-1 bg-yellow text-brown py-2 rounded-full ft-medium cursor-pointer"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>

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
