import { useState } from "react";
import type { Gender } from "../../types";

type Props = {
  onSelectGender: (gender: Gender) => void;
  onClose: () => void;
};

export default function GenderModal({ onSelectGender, onClose }: Props) {
  const [selected, setSelected] = useState<Gender>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl ft-bold text-brown mb-8 text-center">
          Selecciona tu género
        </h2>

        <div className="flex flex-col gap-4">
          {/* Masculino */}
          <button
            type="button"
            onClick={() => setSelected("Masculino")}
            className={`w-full py-3 rounded-full text-base sm:text-lg hover:scale-105 transition cursor-pointer ${
              selected === "Masculino"
                ? "bg-brown text-white"
                : "bg-input text-brown hover:bg-brown/10"
            }`}
          >
            Masculino
          </button>

          {/* Femenino */}
          <button
            type="button"
            onClick={() => setSelected("Femenino")}
            className={`w-full py-3 rounded-full text-base sm:text-lg hover:scale-105 transition cursor-pointer  ${
              selected === "Femenino"
                ? "bg-brown text-white"
                : "bg-input text-brown hover:bg-brown/10"
            }`}
          >
            Femenino
          </button>

          {/* Aceptar */}
          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onSelectGender(selected);
                onClose();
              }
            }}
            className={`w-full sm:w-60 mx-auto py-2.5 rounded-full ft-medium mt-4 transition ${
              selected
                ? "bg-yellow text-brown hover:scale-105 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed "
            }`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
