import { useNavigate } from "react-router-dom";
import { PlanService } from "../../services/planService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import { useState } from "react";

export default function DietPlanReady() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    try {
      setLoading(true);
      const macros = await PlanService.getDailyMacros();
      localStorage.setItem("macrosDiarios", JSON.stringify(macros));
      navigate("/dailyNutritionPlan");
    } catch (error) {
      console.error("Error obteniendo macros:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-3xl text-center bg-white p-6 sm:p-10 rounded-3xl shadow-md flex flex-col gap-6 z-50">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown">
            ¡Tu dieta ha sido creada!
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray px-2 sm:px-8 text-justify">
            NutrIA ha analizado tu información y creó un plan alimenticio
            diseñado para ayudarte a alcanzar tus objetivos de forma sostenible
            y adaptada a ti. A continuación podrás ver.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {[
              {
                icon: "/SVG/IconsGeneral/FireStreak.svg",
                text: "Los macronutrientes diarios recomendados.",
                alt: "Macronutrientes",
              },
              {
                icon: "/SVG/IconsGeneral/Calendar.svg",
                text: "El día estimado en que alcanzarás tu objetivo.",
                alt: "Calendario",
              },
              {
                icon: "/SVG/IconsGeneral/CupFruits.svg",
                text: "Tu dieta semanal personalizada.",
                alt: "Copa de frutas",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 bg-input p-3 sm:p-4 rounded-3xl justify-center mx-auto w-full sm:w-80 md:w-96"
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="text-brown font-medium text-sm sm:text-base md:text-lg">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-2xs md:w-xs mx-auto bg-yellow text-brown font-medium px-4 sm:px-6 py-3 sm:py-3 rounded-3xl cursor-pointer hover:scale-105 transition"
          >
            {loading ? "Calculando..." : "Continuar"}
          </button>
        </div>
      </div>

      {/* Decoraciones */}
      <div className="absolute left-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitRight />
      </div>
    </>
  );
}
