import { useState } from "react";
import { useRuleta } from "../../../hooks/useRuleta";

type Props = {
  onSelectPesoObjetivo: (peso: number) => void;
  onClose: () => void;
};

export default function ModalPesoObjetivo({
  onSelectPesoObjetivo,
  onClose,
}: Props) {
  const pesos = Array.from({ length: 171 }, (_, i) => i + 30); // 30 - 200 kg

  const pesoRuleta = useRuleta(pesos.length, 40);

  const [error, setError] = useState("");

  const seleccionarPeso = () => {
    const peso = pesos[pesoRuleta.selectedIndex];

    if (peso < 30 || peso > 200) {
      setError("Peso inválido");
      return;
    }

    onSelectPesoObjetivo(peso);
    onClose();
  };

  const renderRuleta = (
    values: (string | number)[],
    ruleta: ReturnType<typeof useRuleta>
  ) => {
    const total = values.length;
    const offsets = [-2, -1, 0, 1, 2];

    const getOpacity = (offset: number) => {
      switch (offset) {
        case 0:
          return "bg_inputs w-25 rounded-full scale-110 poppins-bold text-xl";
        case -1:
        case 1:
          return "text-gray-800 text-md";
        default:
          return "text-gray-400 text-sm";
      }
    };

    return (
      <div
        className="flex flex-col items-center w-30 select-none"
        onWheel={ruleta.onWheel}
        onTouchStart={ruleta.onTouchStart}
        onTouchMove={ruleta.onTouchMove}
        onTouchEnd={ruleta.onTouchEnd}
      >
        {offsets.map((offset) => {
          const index = (ruleta.selectedIndex + offset + total) % total;
          const value = values[index];

          return (
            <div
              key={offset}
              onClick={() => ruleta.selectIndex(index)}
              className={`cursor-pointer py-1 transition-all duration-200 ${getOpacity(
                offset
              )}`}
            >
              {value} kg
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg mx-4 w-95 md:w-full max-w-md">
        <h2 className="text-2xl font_brown poppins-bold mb-4 text-center">
          Selecciona tu peso objetivo
        </h2>

        <div className="flex justify-center mb-4">
          {renderRuleta(pesos, pesoRuleta)}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <div className="flex justify-center">
          <button
            onClick={seleccionarPeso}
            className="w-60 mx-auto bg_yellow font_brown poppins-bold py-2 rounded-full transition cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
