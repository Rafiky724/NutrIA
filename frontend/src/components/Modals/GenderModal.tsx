import { useState } from "react";
import type { Gender } from "../../types";

type Props = {
  onSelectGender: (gender: Gender) => void;
  onClose: () => void;
};

export default function GenderModal({ onSelectGender, onClose }: Props) {
  const [selected, setSelected] = useState<Gender>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro con blur */}
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl ft-bold text-brown mb-10 text-center">
          Selecciona tu género
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setSelected("Masculino")}
            className={`w-50 mx-auto py-2 rounded-full cursor-pointer text-lg ${
              selected === "Masculino"
                ? "bg-brown text-white"
                : "bg-input text-brown"
            }`}
          >
            Masculino
          </button>

          <button
            onClick={() => setSelected("Femenino")}
            className={`w-50 mx-auto py-2 rounded-full cursor-pointer text-lg ${
              selected === "Femenino"
                ? "bg-brown text-white"
                : "bg-input text-brown"
            }`}
          >
            Femenino
          </button>

          {/* Aceptar y Cancelar */}
          <div className="flex justify-between gap-4 mt-4">
            <button
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  onSelectGender(selected);
                  onClose();
                }
              }}
              className={`w-60 mx-auto py-2 rounded-full text-white bg-yellow text-brown ft-medium cursor-pointer mt-3`}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
