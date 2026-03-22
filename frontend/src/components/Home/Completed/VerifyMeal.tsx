import { useState } from "react";

type VerifyOption = {
  id: string;
  image: string;
  label: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  option: VerifyOption;
};

export default function VerifyMeal({ isOpen, onClose }: Props) {
  const [, setSelected] = useState<string | null>(null);

  if (!isOpen) return null;

  const options: VerifyOption[] = [
    {
      id: "1",
      image: "/SVG/Menu/Racha/Verificar.svg",
      label: "Tomar foto",
    },
    {
      id: "2",
      image: "/SVG/Menu/Racha/SubirImagen.svg",
      label: "Subir imagen",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-10 flex flex-col gap-8 pb-25"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-lg ft-bold text-brown mb-10">
          Selecciona una opción
        </h2>

        <div className="flex flex-col md:flex-row w-lg justify-center space-x-15">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="bg-input rounded-4xl p-6 flex flex-col items-center gap-8 cursor-pointer transition w-[150px] h-[180px] hover:scale-105"
            >
              <img src={opt.image} className="w-20" />
              <span className="text-sm ft-bold text-center text-brown">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
