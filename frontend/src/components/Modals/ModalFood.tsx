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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-md bg-white rounded-3xl p-6 shadow-lg flex flex-col gap-5">
        <p className="text-md ft-light text-justify text-gray px-5">
          Como empiezas hoy, cuéntanos cuál será tu próxima comida y nos
          adaptamos a ti.
        </p>

        <div className=" flex flex-wrap gap-3 justify-center">
          {mealsAvailable.map((comida) => (
            <button
              key={comida}
              onClick={() => onSelectFood(comida)}
              className={`w-4xs p-3 px-5 rounded-4xl ft-medium transition cursor-pointer ${
                selectedFood === comida
                  ? "bg-brown text-white shadow"
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
            className="px-5 py-2 rounded-full bg-yellow ft-medium mx-auto w-3xs cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
