import { useState, useEffect } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import Toast from "../Toast/Toast";

type Props = {
  onSelectTargetWeight: (weight: number) => void;
  onClose: () => void;
};

export default function ModalWeightTarget({
  onSelectTargetWeight,
  onClose,
}: Props) {
  const weights = Array.from({ length: 171 }, (_, i) => i + 30); // 30 - 200 kg
  const weightRoulette = useRoulette(weights.length, 40);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const selectWeight = () => {
    const weight = weights[weightRoulette.selectedIndex];

    if (weight < 30 || weight > 200) {
      setToast({
        open: true,
        message: "Peso inválido.",
        type: "error",
      });
      return;
    }

    onSelectTargetWeight(weight);
    onClose();
  };

  const renderRoulette = (
    values: (string | number)[],
    roulette: ReturnType<typeof useRoulette>,
  ) => {
    const total = values.length;
    const offsets = [-2, -1, 0, 1, 2];

    const getStyle = (offset: number) => {
      switch (offset) {
        case 0:
          return "bg-input w-20 sm:w-24 rounded-full scale-110 ft-medium text-lg sm:text-xl py-1";
        case -1:
        case 1:
          return "text-gray-800 text-sm sm:text-base";
        default:
          return "text-gray-400 text-xs sm:text-sm";
      }
    };

    return (
      <div
        className="flex flex-col items-center w-20 sm:w-24 select-none"
        onWheel={(e) => {
          e.preventDefault(); // evita que el body se desplace
          roulette.onWheel(e);
        }}
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
              className={`cursor-pointer transition-all duration-200 ${getStyle(
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl text-brown ft-bold mb-6 text-center">
          Selecciona tu peso objetivo
        </h2>

        <div className="flex justify-center mb-6 ">
          {renderRoulette(weights, weightRoulette)}
        </div>

        <div className="flex justify-center">
          <button
            onClick={selectWeight}
            className="w-full sm:w-60 bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer"
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
