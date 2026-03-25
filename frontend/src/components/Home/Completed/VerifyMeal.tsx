import { useRef, useState } from "react";
import {
  analizarComida,
  type AnalizarComidaResponse,
} from "../../../services/comidaService";

type VerifyOption = {
  id: string;
  image: string;
  label: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  option?: VerifyOption;
};

export default function VerifyMeal({ isOpen, onClose }: Props) {
  const [, setSelectedOption] = useState<string | null>(null);
  const [, setResult] = useState<AnalizarComidaResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const options: VerifyOption[] = [
    { id: "1", image: "/SVG/Menu/Racha/Verificar.svg", label: "Tomar foto" },
    {
      id: "2",
      image: "/SVG/Menu/Racha/SubirImagen.svg",
      label: "Subir imagen",
    },
  ];

  const handleOptionClick = (opt: VerifyOption) => {
    setSelectedOption(opt.id);
    console.log("Opción seleccionada:", opt.label);

    if (opt.label === "Subir imagen" && fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }

    if (opt.label === "Tomar foto" && cameraInputRef.current) {
      cameraInputRef.current.value = "";
      cameraInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange triggered");
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Archivo seleccionado:", file);

    try {
      const res = await analizarComida(file);
      console.log("Resultado del servicio:", res);
      setResult(res);
      alert(res.match ? "¡La comida coincide!" : "No coincide con lo esperado");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        capture="user"
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-4xl p-10 flex flex-col md:gap-8 md:pb-25 w-full md:w-2xl max-h-150 overflow-y-auto items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg ft-bold text-brown md:mb-10">
              Selecciona una opción
            </h2>

            <div className="flex flex-col md:flex-row md:w-lg justify-center space-x-15 md:gap-8">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-input rounded-4xl p-6 flex flex-col items-center gap-8 cursor-pointer transition md:w-[150px] md:h-[180px] hover:scale-105 m-4 md:m-0"
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
      )}
    </>
  );
}
