import { useState, type FormEvent } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RestablecerModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Enviar correo para restablecer contraseña:", email);
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
          className="bg-white rounded-2xl p-9 w-100 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg poppins-bold mb-4 text-center font_brown">
            Restablecer contraseña
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-12">
              <label className="block text-sm font_brown mb-8 text-justify">
                Ingresa tu correo electrónico registrado. Te enviaremos un email
                con las instrucciones para restablecer la contraseña.
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg_inputs focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex w-30 mx-auto">
              <button
                type="submit"
                className="flex-1 bg_yellow text-black py-2 rounded-full font_brown hover:opacity-90 transition cursor-pointer poppins-medium"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
