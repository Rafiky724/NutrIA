import { useState } from "react";
import { MainMeals, OptionsMeals } from "../../../../data/optionsMeals";
import Toast from "../../../Toast/Toast";
import ArrowReturn from "../../../Decoration/ArrowReturn";
import FruitLeft from "../../../Decoration/FruitLeft";
import FruitRight from "../../../Decoration/FruitRight";
import { useNavigate } from "react-router-dom";
import { useObjetiveFlow } from "../../../../hooks/useObjetiveFlow";

export default function Meal() {
  const { data, updateData } = useObjetiveFlow();
  const [selected, setSelected] = useState<string[]>(
    data.cantidad_comidas || [],
  );
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success" | "warning" | "info",
  });

  const navigate = useNavigate();

  const toggleSeleccion = (meal: string) => {
    const newSelected = selected.includes(meal)
      ? selected.filter((c) => c !== meal)
      : [...selected, meal];

    setSelected(newSelected);
    updateData({ cantidad_comidas: newSelected });
  };

  const handleFinalizar = async () => {
    const selectedMain = selected.filter((c) => MainMeals.includes(c));

    if (selectedMain.length < 2) {
      setToast({
        open: true,
        message:
          "Selecciona al menos 2 comidas principales (Desayuno, almuerzo o cena).",
        type: "error",
      });
      return;
    }

    try {
      navigate("/config");
    } catch (error) {
      console.error("Error al finalizar:", error);
      setToast({
        open: true,
        message: "Error al actualizar el objetivo. Intenta de nuevo.",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 xl:py-24">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center z-50">
            <div className="px-4 sm:px-6 md:px-10">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                <div className="w-12 sm:w-20">
                  <img
                    src="/SVG/IconsGeneral/PyramidAppleIcon.svg"
                    alt="Cantidad de comidas"
                    className="w-full h-auto"
                  />
                </div>
                <div className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left">
                  <h2>¿Cuántas comidas deseas hacer al día?</h2>
                </div>
              </div>

              <p className="ft-light text-justify text-gray my-6 md:my-8 text-sm sm:text-base md:text-md px-2 sm:px-6">
                Elige al menos dos comidas principales para distribuir tus
                calorías y nutrientes de forma equilibrada a lo largo del día.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
                {OptionsMeals.map(({ label, icon, selectedIcon }) => {
                  const isSelected = selected.includes(label);

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleSeleccion(label)}
                      className={`flex flex-col items-center justify-center w-20 sm:w-25 lg:w-30 h-20 sm:h-25 lg:h-30 mx-auto rounded-2xl border transition cursor-pointer hover:scale-105 ${
                        isSelected
                          ? "bg-brown border-transparent text-white"
                          : "bg-input border-transparent"
                      }`}
                    >
                      <img
                        src={isSelected ? selectedIcon || icon : icon}
                        alt={label}
                        className="w-8 h-8 sm:w-14 sm:h-14 lg:w-18 lg:h-18 mb-2"
                      />
                      <span className="ft-medium text-xs sm:text-sm md:text-base text-center px-1">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="button"
                onClick={handleFinalizar}
                className="w-3xs sm:w-72 bg-yellow text-brown ft-medium py-2.5 rounded-3xl hover:scale-105 transition cursor-pointer"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>

        <Toast
          isOpen={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />

        <ArrowReturn to="/workout" />

        {/* Decorations */}
        <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitLeft />
        </div>

        <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitRight />
        </div>
      </div>
    </>
  );
}
