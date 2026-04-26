import { useState } from "react";
import { perderRacha, salvarRacha } from "../../../services/comidaService";
import SpinnerOverlay from "../../Loading/SpinnerOverlay";
import Toast from "../../Toast/Toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRefetch: () => void;
};

export default function RachaWarning({ isOpen, onClose, onRefetch }: Props) {
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  if (!isOpen) return null;

  const handleClick = async (action: "salvar" | "perder") => {
    try {
      setLoading(true);

      if (action === "salvar") {
        await salvarRacha();
      } else {
        await perderRacha();
      }

      onRefetch();
      onClose();
    } catch (err) {
      setToast({
        isOpen: true,
        message: "No tienes suficientes gemas para mantener la racha",
        type: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SpinnerOverlay isOpen={loading} />

      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-4xl p-10 flex flex-col w-full md:w-2xl max-h-150 overflow-y-auto items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src="SVG/Menu/Racha/WarningIcon.svg"
            alt="Advertencia"
            className="w-20 h-20 object-contain"
          />

          <h2 className="text-center text-xl ft-bold text-brown mb-4 md:mb-8">
            ¡Tu racha está en peligro!
          </h2>

          <p className="text-justify text-sm text-gray ft-light md:px-10">
            No lograste completar tu ingesta diaria de macronutrientes, por lo
            que tu racha se perderá. No te preocupes, aún puedes gastar gemas
            para conservarla.
          </p>

          <div className="flex flex-col md:flex-row md:w-lg justify-center md:gap-8 md:py-6">
            <div
              className="relative bg-input rounded-4xl p-6 flex flex-col items-center gap-6 cursor-pointer transition md:w-[150px] h-[170px] md:h-[180px] hover:scale-105 m-4 md:m-0 justify-center"
              onClick={() => !loading && handleClick("salvar")}
            >
              <div className="flex gap-2 ft-bold justify-center items-center">
                <img src="/SVG/IconsGeneral/GemsIcon.svg" className="w-10" />
                <p className="text-4xl italic text-brown">100</p>
              </div>

              <span className="text-sm ft-bold text-center text-brown">
                Mantener la racha
              </span>
            </div>

            <div
              className="relative bg-input rounded-4xl p-6 flex flex-col items-center gap-6 cursor-pointer transition md:w-[150px] h-[170px] md:h-[180px] hover:scale-105 m-4 md:m-0 justify-center"
              onClick={() => !loading && handleClick("perder")}
            >
              <img src="/SVG/Menu/Racha/NoCompleto.svg" className="w-20" />

              <span className="text-sm ft-bold text-center text-brown">
                Perder la racha
              </span>
            </div>
          </div>
        </div>
      </div>

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
