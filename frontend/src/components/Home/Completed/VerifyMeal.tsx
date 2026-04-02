import { useRef, useState } from "react";
import {
  analizarComida,
  type AnalizarComidaResponse,
} from "../../../services/comidaService";
import Toast from "../../Toast/Toast";
import { useProgress } from "../../../Context/ProgressContext";

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

const resizeImage = (
  file: File,
  maxWidth: number,
  quality: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) return reject("Error leyendo archivo");
      img.src = e.target.result as string;
    };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Error con canvas");

      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Error generando blob");
          resolve(blob);
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export default function VerifyMeal({ isOpen, onClose }: Props) {
  const { refreshProgress } = useProgress();
  const [, setSelectedOption] = useState<string | null>(null);
  const [, setResult] = useState<AnalizarComidaResponse | null>(null);

  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

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
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Archivo seleccionado:", file);

    try {
      let processedFile: File = file;

      if (file.size > 2 * 1024 * 1024) {
        const blob = await resizeImage(file, 1024, 0.7);
        processedFile = new File([blob], file.name, { type: file.type });
        console.log(
          "Archivo redimensionado:",
          processedFile,
          "tamaño aprox:",
          processedFile.size / 1024 / 1024,
          "MB",
        );
      }

      const res = await analizarComida(processedFile);
      console.log("Resultado del servicio:", res);
      setResult(res);
      setToast({
        isOpen: true,
        message: res.match
          ? "¡La comida coincide!"
          : "No coincide con lo esperado",
        type: res.match ? "success" : "error",
      });

      if (res.match) {
        await refreshProgress();
      }
    } catch (err: any) {
      console.error(err);
      setToast({
        isOpen: true,
        message: err.message || "Error procesando imagen",
        type: "error",
      });
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
        capture="environment"
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

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, isOpen: false }))}
      />
    </>
  );
}
