import { useEffect, useState } from "react";
import { useRoulette } from "../../hooks/useRoulette";
import Toast from "../../components/Toast/Toast";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ArrowReturn from "../../components/Decoration/ArrowReturn";
import { useNavigate } from "react-router-dom";
import { getUserPeso, updateUserPeso } from "../../services/userService";
import SpinnerOverlay from "../../components/Loading/SpinnerOverlay";

export default function WeightUpdate() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const weights = Array.from({ length: 171 }, (_, i) => i + 30);
  const weightRoulette = useRoulette(weights.length, 20);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAccept = async () => {
    const weight = weights[weightRoulette.selectedIndex];

    setLoading(true);

    try {
      await updateUserPeso({ peso_actual: weight });

      setSelectedWeight(weight);
      setCurrentWeight(weight);

      handleCloseModal();

      setToast({
        open: true,
        message: `Peso actualizado a ${weight} kg`,
        type: "success",
      });
    } catch (error) {
      console.error("Error actualizando peso:", error);

      setToast({
        open: true,
        message: "Error al actualizar el peso",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    if (!selectedWeight) {
      setToast({
        open: true,
        message: "Debes seleccionar un peso primero",
        type: "error",
      });
      return;
    }
    setToast({
      open: true,
      message: `Peso confirmado: ${selectedWeight} kg`,
      type: "success",
    });
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const renderRoulette = (
    values: number[],
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
              className={`cursor-pointer transition-all duration-200 ${getStyle(offset)}`}
            >
              {value} kg
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const fetchPeso = async () => {
      try {
        const data = await getUserPeso();
        console.log("peso backend:", data);
        setCurrentWeight(data.peso_actual);
      } catch (error) {
        console.error("Error obteniendo peso del usuario:", error);
      }
    };

    fetchPeso();
  }, []);

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
      <SpinnerOverlay isOpen={loading} />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 py-10 xl:py-24">
        <div className="w-xl max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50 flex flex-col gap-6">
          <div className="flex flex-row justify-center items-center gap-8">
            <img
              src="/SVG/IconsGeneral/DumbbellIcon.svg"
              alt="Peso"
              className="w-14 h-14 md:w-16 md:h-16"
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl text-brown ft-bold mt-4">
              Actualizar peso
            </h2>
          </div>

          <p className="ft-light text-sm sm:text-base mb-4 text-left my-0 md:my-8">
            Mantener tu peso al día nos ayuda a ajustar tu plan y seguir
            diseñando una dieta adaptada a tus objetivos.
          </p>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto my-0 md:my-15">
            <div onClick={handleOpenModal} className="cursor-pointer">
              <div className="bg-input px-4 py-3 rounded-full flex items-center justify-between hover:scale-[1.02] transition">
                <span className="text-brown ft-bold text-sm sm:text-base">
                  Peso
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-brown ft-light text-sm sm:text-base">
                    {selectedWeight ?? currentWeight} kg
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-brown"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer mt-15"
          >
            Continuar
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Fondo oscuro con blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center gap-6">
            <h2 className="text-lg sm:text-xl md:text-2xl text-brown ft-bold mb-4 text-center">
              Selecciona tu peso
            </h2>

            <div className="flex justify-center mb-6">
              {renderRoulette(weights, weightRoulette)}
            </div>

            <button
              type="button"
              onClick={handleAccept}
              className="w-full sm:w-60 mx-auto block bg-yellow text-brown ft-medium py-2.5 rounded-full hover:scale-105 transition cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <ArrowReturn to="/config" />

      {/* Decorations */}
      <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitLeft />
      </div>
      <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
        <FruitRight />
      </div>
    </div>
  );
}
