import { useState } from "react";
import { completarComida } from "../../../services/comidaService";
import { type Option } from "../../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  option: Option | null;
  onSuccess: () => void;
};

export default function ConfirmMeal({
  isOpen,
  onClose,
  option,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !option) return null;

  const handleConfirm = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await completarComida({
        comida_id: option.id,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al completar comida:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl p-10 px-35 flex flex-col items-center gap-6 w-[90%] max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="text-brown ft-bold py-2 px-6 rounded-full hover:scale-105 transition cursor-pointer text-lg pb-10"
        >
          {loading ? "Guardando..." : "Confirmar"}
        </button>

        <div className="relative bg-input rounded-2xl p-4 flex flex-col items-center gap-4 w-3xs md:w-4xs">
          <img src={option.image} className="w-22 mb-5" />

          <span className="flex flex-col items-center">
            <h2 className="text-sm ft-medium mb-2">He completado la comida</h2>

            <p className="text-left text-xs text-gray ft-light">
              ¡Tu avance depende de lo que registres.
              <b className="ft-bold"> Hazlo con honestidad</b>!
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
