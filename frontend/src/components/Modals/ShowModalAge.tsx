import { useState } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import Toast from "../Toast/Toast";

type Props = {
  onSelectAge: (age: string) => void;
  onClose: () => void;
};

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function ModalAge({ onSelectAge, onClose }: Props) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );
  const dayRoulette = useRoulette(days.length);
  const monthRoulette = useRoulette(months.length);
  const yearRoulette = useRoulette(years.length, 20);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const calculateAge = () => {
    const day = days[dayRoulette.selectedIndex];
    const month = monthRoulette.selectedIndex;
    const year = years[yearRoulette.selectedIndex];
    const birthDate = new Date(year, month, day);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      setToast({
        open: true,
        message: "Fecha inválida.",
        type: "error",
      });
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 60) {
      setToast({
        open: true,
        message: "Edad inválida.",
        type: "error",
      });
      return;
    }

    // Formatear fecha como YYYY-MM-DD
    const monthStr = String(month + 1).padStart(2, "0"); // Mes en 2 dígitos
    const dayStr = String(day).padStart(2, "0"); // Día en 2 dígitos
    const formatteddate = `${year}-${monthStr}-${dayStr}`;

    onSelectAge(formatteddate);
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
          return "bg-input w-25 rounded-full text-md ft-medium";
        case -1:
        case 1:
          return "text-gray-800 text-sm";
        default:
          return "text-gray-400 text-xs";
      }
    };

    return (
      <div
        className="flex flex-col items-center w-30 select-none"
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
              {value}
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
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg mx-4 w-95 md:w-full max-w-md">
        <h2 className="text-2xl text-brown ft-bold mb-4 text-center">
          Selecciona tu fecha de nacimiento
        </h2>

        <div className="flex justify-center gap-4 mb-4 text-center">
          {renderRoulette(days, dayRoulette)}
          {renderRoulette(months, monthRoulette)}
          {renderRoulette(years, yearRoulette)}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={calculateAge}
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
