import { useEffect, useState } from "react";
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

  // BLOQUEAR SCROLL DEL BODY
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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

    const getStyle = (offset: number) => {
      if (offset === 0)
        return "bg-input w-24 sm:w-28 md:w-32 rounded-full scale-110 ft-medium text-brown text-base sm:text-lg py-1 px-3";
      if (offset === -1 || offset === 1)
        return "text-gray-500 text-sm sm:text-base";
      return "text-gray-400 text-xs sm:text-sm";
    };

    return (
      <div
        className="flex flex-col items-center select-none"
        style={{ width: "fit-content" }}
        onWheel={(e) => {
          e.preventDefault(); // evita que el body haga scroll
          roulette.onWheel(e);
        }}
        onTouchStart={roulette.onTouchStart}
        onTouchMove={(e) => {
          e.preventDefault(); // evita que el body haga scroll
          roulette.onTouchMove(e);
        }}
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
              {value} cm
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fondo oscuro con blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl text-brown ft-bold mb-6 text-center">
          Selecciona tu altura actual
        </h2>

        <div className="flex justify-center mb-6">
          {renderRoulette(heights, heightRoulette)}
        </div>

        <button
          onClick={confirmHeight}
          className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer"
        >
          Aceptar
        </button>
      </div>

      {/* Toast */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
