import { useState } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import Toast from "../Toast/Toast";

type Props = {
  onSelectHeight: (height: number) => void;
  onClose: () => void;
};

export default function ModalHeight({ onSelectHeight, onClose }: Props) {
  const heights = Array.from({ length: 101 }, (_, i) => i + 100); // 100 cm a 200 cm
  const heightRoulette = useRoulette(heights.length, 70); // valor inicial ~170 cm
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const confirmHeight = () => {
    const height = heights[heightRoulette.selectedIndex];

    if (height < 100 || height > 200) {
      setToast({
        open: true,
        message: "Altura inválida.",
        type: "warning",
      });
      return;
    }

    onSelectHeight(height);
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
          return "bg-input w-25 rounded-full scale-110 ft-medium text-brown";
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
              {value} cm
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
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4 px-15">
        <h2 className="text-2xl text-brown ft-bold mb-4 text-center">
          Selecciona tu altura actual
        </h2>

        <div className="flex justify-center mb-4">
          {renderRoulette(heights, heightRoulette)}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={confirmHeight}
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
