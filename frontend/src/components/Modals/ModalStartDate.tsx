import { useState } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import { months } from "../../data/months";
import Toast from "../Toast/Toast";

type Props = {
  onSelectDate: (date: string) => void;
  onClose: () => void;
};

export default function ModalStartDate({ onSelectDate, onClose }: Props) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() + i,
  );

  const dayRoulette = useRoulette(days.length);
  const monthRoulette = useRoulette(months.length);
  const yearRoulette = useRoulette(years.length);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const confirmDate = () => {
    const day = days[dayRoulette.selectedIndex];
    const month = monthRoulette.selectedIndex;
    const year = years[yearRoulette.selectedIndex];

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      setToast({
        open: true,
        message: "Fecha inválida.",
        type: "error",
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      setToast({
        open: true,
        message: "No puedes seleccionar una fecha pasada.",
        type: "error",
      });
      return;
    }

    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    onSelectDate(formattedDate);
    onClose();
  };

  const renderRoulette = (
    values: (string | number)[],
    roulette: ReturnType<typeof useRoulette>,
  ) => {
    const total = values.length;
    const offsets = [-2, -1, 0, 1, 2];

    const getStyle = (offset: number) => {
      if (offset === 0) return "bg-input rounded-full scale-110 ft-medium p-5";
      if (offset === -1 || offset === 1) return "text-gray text-md";
      return "text-gray-400 text-sm";
    };

    return (
      <div
        className="flex flex-col items-center w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 select-none"
        onWheel={roulette.onWheel}
        onTouchStart={roulette.onTouchStart}
        onTouchMove={roulette.onTouchMove}
        onTouchEnd={roulette.onTouchEnd}
      >
        {offsets.map((offset) => {
          const index = (roulette.selectedIndex + offset + total) % total;
          return (
            <div
              key={offset}
              onClick={() => roulette.selectIndex(index)}
              className={`cursor-pointer py-1 transition-all duration-200 ${getStyle(
                offset,
              )}`}
            >
              {values[index]}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white p-6 rounded-3xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl ft-bold text-brown mb-4 text-center">
          ¿Cuándo quieres empezar?
        </h2>

        <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4">
          {renderRoulette(days, dayRoulette)}
          {renderRoulette(months, monthRoulette)}
          {renderRoulette(years, yearRoulette)}
        </div>

        <button
          type="button"
          onClick={confirmDate}
          className="w-3xs md:w-xs bg-yellow text-brown ft-medium py-2 rounded-full shadow cursor-pointer mx-auto block hover:scale-105 transition"
        >
          Confirmar fecha
        </button>
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
