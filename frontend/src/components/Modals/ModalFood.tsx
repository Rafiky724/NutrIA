import type { TypeFood } from "../../types";

type Props = {
  show: boolean;
  mealsAvailable: TypeFood[];
  selectedFood: TypeFood | null;
  onSelectFood: (food: TypeFood) => void;
  onClose: () => void;
};

export default function ModalFood({
  show,
  mealsAvailable,
  selectedFood,
  onSelectFood,
  onClose,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl p-6 shadow-lg flex flex-col gap-5">
        <p className="text-gray text-md sm:text-base md:text-lg text-justify px-2 sm:px-6">
          Como empiezas hoy, cuéntanos cuál será tu próxima comida y nos
          adaptamos a ti.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {mealsAvailable.map((comida) => (
            <button
              key={comida}
              onClick={() => onSelectFood(comida)}
              className={`w-25 sm:w-24 lg:w-32 p-3 rounded-4xl ft-medium transition cursor-pointer ${
                selectedFood === comida
                  ? "bg-brown text-white shadow-lg"
                  : "bg-input text-gray"
              }`}
            >
              {comida}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="w-3xs sm:w-xs bg-yellow text-brown font-semibold py-2 rounded-full shadow text-md mx-auto cursor-pointer hover:scale-105 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
