import { useState } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import Toast from "../Toast/Toast";

type Props = {
  onSelectWeight: (weight: number) => void;
  onClose: () => void;
};

export default function ModalWeight({ onSelectWeight, onClose }: Props) {
  const weights = Array.from({ length: 181 }, (_, i) => i + 20); // 20kg a 200kg
  const weightRoulette = useRoulette(weights.length, 40); // valor inicial en 60kg aprox
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const confirmWeight = () => {
    const weight = weights[weightRoulette.selectedIndex];

    if (weight < 20 || weight > 200) {
      setToast({
        open: true,
        message: "Peso inválido.",
        type: "error",
      });
      return;
    }

    onSelectWeight(weight);
    onClose();
  };

  const renderRoulette = (
    values: (string | number)[],
    roulette: ReturnType<typeof useRoulette>,
  ) => {
    const total = values.length;
    const offsets = [-2, -1, 0, 1, 2];

    const getOpacity = (offset: number) => {
      switch (offset) {
        case 0:
          return "bg-input w-25 rounded-full scale-110 ft-bold";
        case -1:
        case 1:
          return "text-gray-500";
        default:
          return "text-gray-400 text-sm";
      }
    };

    return (
      <div
        className="flex flex-col items-center w-24 select-none"
        onWheel={roulette.onWheel}
        onTouchStart={roulette.onTouchStart}
        onTouchMove={roulette.onTouchMove}
        onTouchEnd={roulette.onTouchEnd}
      >
        {offsets.map((offset) => {
          const index = (roulette.selectedIndex + offset + total) % total;
          const value = values[index];
          return (
            <div
              key={offset}
              onClick={() => roulette.selectIndex(index)}
              className={`cursor-pointer py-1 transition-all duration-200 ${getOpacity(
                offset,
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
      {/* Fondo oscuro con blur */}
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl text-brown ft-bold mb-4 text-center w-60 mx-auto">
          Selecciona tu peso actual
        </h2>

        <div className="flex justify-center mb-4">
          {renderRoulette(weights, weightRoulette)}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={confirmWeight}
            className="w-60 mx-auto bg-yellow text-brown ft-medium py-2 rounded-full transition cursor-pointer"
          >
            Aceptar
          </button>
        </div>
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
