import { useEffect, useState } from "react";
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
  useEffect(() => {
    // Bloquea el scroll del body
    document.body.style.overflow = "hidden";

    return () => {
      // Libera scroll al cerrar
      document.body.style.overflow = "auto";
    };
  }, []);

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
      setToast({ open: true, message: "Fecha inválida.", type: "error" });
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 60) {
      setToast({ open: true, message: "Edad inválida.", type: "error" });
      return;
    }

    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
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

    const getStyle = (offset: number) => {
      if (offset === 0)
        return "bg-input rounded-full text-base sm:text-lg ft-medium py-1 px-3";
      if (offset === -1 || offset === 1)
        return "text-gray-800 text-sm sm:text-base";
      return "text-gray-400 text-xs sm:text-sm";
    };

    return (
      <div
        className="flex flex-col items-center w-20 sm:w-24 md:w-28 select-none"
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
              className={`cursor-pointer transition-all duration-200 ${getStyle(
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl text-brown ft-bold mb-6 text-center">
          Selecciona tu fecha de nacimiento
        </h2>

        <div className="flex justify-center gap-2 sm:gap-4 mb-6 text-center">
          {renderRoulette(days, dayRoulette)}
          {renderRoulette(months, monthRoulette)}
          {renderRoulette(years, yearRoulette)}
        </div>

        <button
          onClick={calculateAge}
          className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer"
        >
          Aceptar
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
