import { useState } from "react";
import { useRoulette } from "../../../hooks/useRoulette";
import { months } from "../../../data/months";

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

  const [error, setError] = useState("");

  const confirmDate = () => {
    const day = days[dayRoulette.selectedIndex];
    const month = monthRoulette.selectedIndex;
    const year = years[yearRoulette.selectedIndex];

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      setError("Fecha inválida");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      setError("No puedes seleccionar una fecha pasada");
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
      if (offset === 0) return "bg-input rounded-full scale-110 ft-bold p-5";
      if (offset === -1 || offset === 1) return "text-gray text-md";
      return "text-gray-400 text-sm";
    };

    return (
      <div
        className="flex flex-col items-center w-28 select-none"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-white p-6 rounded-3xl shadow-lg mx-4 w-full max-w-md">
        <h2 className="text-xl ft-bold text-brown mb-4 text-center">
          ¿Cuándo quieres empezar?
        </h2>

        <div className="flex justify-center gap-4 mb-4">
          {renderRoulette(days, dayRoulette)}
          {renderRoulette(months, monthRoulette)}
          {renderRoulette(years, yearRoulette)}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3 ft-medium">
            {error}
          </p>
        )}

        <button
          onClick={confirmDate}
          className="w-full bg-yellow text-brown ft-medium py-3 rounded-full shadow cursor-pointer"
        >
          Confirmar fecha
        </button>
      </div>
    </div>
  );
}
