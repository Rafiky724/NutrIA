import { useState } from "react";
import { useRuleta } from "../../hooks/useRuleta";

type Props = {
  onSelectEdad: (edad: number) => void;
  onClose: () => void;
};

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function ModalEdad({ onSelectEdad, onClose }: Props) {
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const anos = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const diaRuleta = useRuleta(dias.length);
  const mesRuleta = useRuleta(meses.length);
  const anoRuleta = useRuleta(anos.length, 20);

  const [error, setError] = useState("");

  const calcularEdad = () => {
    const dia = dias[diaRuleta.selectedIndex];
    const mes = mesRuleta.selectedIndex;
    const ano = anos[anoRuleta.selectedIndex];
    const birthDate = new Date(ano, mes, dia);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      setError("Fecha inválida");
      return;
    }

    let edad = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      edad--;
    }

    if (edad < 0 || edad > 120) {
      setError("Edad inválida");
      return;
    }

    onSelectEdad(edad);
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
          return "bg_inputs w-25 rounded-full scale-110 poppins-bold";
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
              className={`cursor-pointer py-1 transition-all duration-200 ${getOpacity(offset)}`}
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
        <h2 className="text-2xl font_brown poppins-bold mb-4 text-center">
          Selecciona tu fecha de nacimiento
        </h2>

        <div className="flex justify-center gap-4 mb-4">
          {renderRuleta(dias, diaRuleta)}
          {renderRuleta(meses, mesRuleta)}
          {renderRuleta(anos, anoRuleta)}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <div className="flex justify-between gap-4">
          <button
            onClick={calcularEdad}
            className="w-60 mx-auto bg_yellow font_brown poppins-bold py-2 rounded-full transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
