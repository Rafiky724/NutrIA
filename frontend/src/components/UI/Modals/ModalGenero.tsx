import { useState } from "react";

type Genero = 'Hombre' | 'Mujer'

type Props = {
  onSelectGenero: (genero: Genero) => void;
  onClose: () => void;
};

export default function ModalGenero({ onSelectGenero, onClose }: Props) {
  const [selected, setSelected] = useState<Genero>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro con blur */}
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl poppins-bold mb-10 text-center">
          Selecciona tu género
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setSelected("Hombre")}
            className={`w-50 mx-auto py-2 rounded-full cursor-pointer text-lg ${
              selected === "Hombre"
                ? "bg_brown text-white"
                : "bg_inputs font_brown"
            }`}
          >
            Hombre
          </button>

          <button
            onClick={() => setSelected("Mujer")}
            className={`w-50 mx-auto py-2 rounded-full cursor-pointer text-lg ${
              selected === "Mujer"
                ? "bg_brown text-white"
                : "bg_inputs font_brown"
            }`}
          >
            Mujer
          </button>

          {/* Aceptar y Cancelar */}
          <div className="flex justify-between gap-4 mt-4">
            <button
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  onSelectGenero(selected);
                  onClose();
                }
              }}
              className={`w-60 mx-auto py-2 rounded-full text-white text-lg bg_yellow font_brown poppins-bold cursor-pointer mt-3`}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
