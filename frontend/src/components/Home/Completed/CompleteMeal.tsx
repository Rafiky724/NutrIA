import { type Option } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (opt: Option) => void;
};

export default function CompleteMeal({
  isOpen,
  onClose,
  onSelectOption,
}: Props) {
  if (!isOpen) return null;

  const handleClick = (opt: Option) => {
    onSelectOption(opt);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-10 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-xl ft-bold text-brown mb-10">
          Selecciona una opción
        </h2>

        <div className="flex flex-col md:flex-row gap-15 justify-center pb-15 pt-15 px-10">
          <button
            onClick={() =>
              handleClick({
                id: "1",
                image: "/SVG/Menu/Racha/Completar.svg",
                label: "Comida completada",
                gems: 5,
                icon: "/SVG/IconsGeneral/GemsIcon.svg",
              })
            }
            className="relative bg-input rounded-4xl cursor-pointer transition p-4 flex flex-col items-center justify-center w-[150px] h-[200px] gap-5"
          >
            <img
              src="/SVG/Menu/Racha/Completar.svg"
              className="max-w-full max-h-20 object-contain"
            />
            <span className="text-sm ft-bold text-center mt-2">
              Comida completada
            </span>

            <div className="w-12 h-12 absolute -top-5 -right-4 flex items-center gap-1 bg-white p-2 rounded-full shadow border border-gray-300 justify-center">
              <img src="/SVG/IconsGeneral/GemsIcon.svg" className="w-4" />
              <span className="text-md ft-bold italic">5</span>
            </div>
          </button>

          <button
            onClick={() =>
              handleClick({
                id: "2",
                image: "/SVG/Menu/Racha/Verificar.svg",
                label: "Verificar comida",
                gems: 10,
                icon: "/SVG/IconsGeneral/GemsIcon.svg",
              })
            }
            className="relative bg-input rounded-4xl cursor-pointer transition p-4 flex flex-col items-center justify-center w-[150px] h-[200px] gap-5"
          >
            <img
              src="/SVG/Menu/Racha/Verificar.svg"
              className="max-w-full max-h-18 object-contain"
            />
            <span className="text-sm ft-bold text-center mt-2">
              Verificar comida
            </span>

            <div className="w-12 h-12 absolute -top-5 -right-4 flex items-center gap-1 bg-white p-2 rounded-full shadow border border-gray-300 justify-center">
              <img src="/SVG/IconsGeneral/GemsIcon.svg" className="w-4" />
              <span className="text-md ft-bold italic">10</span>
            </div>
          </button>

          <button
            onClick={() =>
              handleClick({
                id: "3",
                image: "/SVG/Menu/Racha/NoCompleto.svg",
                label: "Comida no completada",
                icon: "/SVG/Menu/Racha/RachaPeligro.svg",
              })
            }
            className="relative bg-input rounded-4xl cursor-pointer transition p-4 flex flex-col items-center justify-center w-[150px] h-[200px] gap-5"
          >
            <img
              src="/SVG/Menu/Racha/NoCompleto.svg"
              className="max-w-full max-h-20 object-contain"
            />
            <span className="text-sm ft-bold text-center mt-2">
              Comida no completada
            </span>

            <div className="w-12 h-12 absolute -top-5 -right-4 flex items-center gap-1 bg-white p-2 rounded-full shadow border border-gray-300 justify-center">
              <img
                src="/SVG/Menu/Racha/RachaPeligro.svg"
                className="w-6 ml-1"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
