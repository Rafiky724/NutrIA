import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Macros } from "../../types";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import { objectiveService } from "../../services/ObjectiveService";

export default function DailyNutritionPlan() {
  const navigate = useNavigate();
  const [macros, setMacros] = useState<Macros | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("macrosDiarios");
    if (stored) {
      setMacros(JSON.parse(stored));
    }
  }, []);

  const handleContinue = async () => {
    try {
      setLoading(true);
      const dates = await objectiveService.getTargetDates();
      localStorage.setItem("fechasObjetivo", JSON.stringify(dates));
      navigate("/goalProjection");
    } catch (error) {
      console.error("Error obteniendo fechas del objetivo:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!macros) {
    return (
      <div className="flex items-center justify-center min-h-screen font_brown">
        Cargando tu plan nutricional...
      </div>
    );
  }

  const idealKcal = macros.calorias_diarias;
  const rangeMin = Math.round(idealKcal * 0.9);
  const rangeMax = Math.round(idealKcal * 1.1);
  const barraMin = Math.round(idealKcal * 0.75);
  const barraMax = Math.round(idealKcal * 1.25);
  const totalBar = barraMax - barraMin;
  const yellowStart = ((rangeMin - barraMin) / totalBar) * 100;
  const yellowWidth = ((rangeMax - rangeMin) / totalBar) * 100;
  const idealPos = ((idealKcal - barraMin) / totalBar) * 100;

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center px-4 sm:px-6">
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        {/* CARD PRINCIPAL */}
        <div className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-3xl shadow-md text-center relative z-20">
          {/* Título */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 mb-6">
            <div className="w-12 sm:w-16 mb-2 sm:mb-0">
              <img
                src="/SVG/IconsGeneral/Check.svg"
                alt="Chequeado"
                className="w-full h-auto"
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown">
              Este es tu plan diario
            </h2>
          </div>

          <p className="text-gray mb-8 sm:mb-12 text-sm sm:text-base md:text-lg text-justify px-2 sm:px-6">
            Basado en tu objetivo, nivel de actividad física y preferencias,
            estas son las cantidades recomendadas para cada día.
          </p>

          {/* BARRA DE CALORÍAS */}
          <div className="relative w-full h-4 sm:h-6 rounded-full mb-10">
            <div className="absolute h-full bg-brown rounded-full w-full" />
            <div
              className="absolute h-full bg-yellow"
              style={{ left: `${yellowStart}%`, width: `${yellowWidth}%` }}
            />
            {/* Líneas de inicio y fin del rango recomendado */}
            <div
              className="absolute top-[-5px] h-6 w-1.5 bg-yellow rounded"
              style={{ left: `${yellowStart}%` }}
            />
            <div
              className="absolute top-[-5px] h-6 w-1.5 bg-yellow rounded"
              style={{ left: `${yellowStart + yellowWidth}%` }}
            />
            {/* Etiquetas de calorías */}
            <span
              className="absolute -bottom-8 text-gray text-xs sm:text-sm"
              style={{ left: `${yellowStart}%`, transform: "translateX(-50%)" }}
            >
              {rangeMin} kcal
            </span>
            <span
              className="absolute -bottom-8 text-gray text-xs sm:text-sm"
              style={{
                left: `${yellowStart + yellowWidth}%`,
                transform: "translateX(-50%)",
              }}
            >
              {rangeMax} kcal
            </span>
            <span
              className="absolute -top-6 text-brown text-sm sm:text-base font-medium"
              style={{ left: `${idealPos}%`, transform: "translateX(-50%)" }}
            >
              {idealKcal} kcal
            </span>
          </div>

          {/* MACRONUTRIENTES */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
            {[
              { label: "Proteína", value: macros.proteinas_diarias, unit: "g" },
              {
                label: "Carbohidratos",
                value: macros.carbohidratos_diarios,
                unit: "g",
              },
              { label: "Grasas", value: macros.grasas_diarias, unit: "g" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-input p-4 sm:p-5 w-full sm:w-32 rounded-xl text-center flex flex-col space-y-1"
              >
                <span className="ft-light text-gray text-sm sm:text-base">
                  {item.value} {item.unit}
                </span>
                <span className="text-brown text-sm sm:text-base font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full sm:w-auto mx-auto bg-yellow text-brown font-medium px-4 sm:px-6 py-3 sm:py-3 rounded-3xl cursor-pointer"
          >
            {loading ? "Calculando..." : "Continuar"}
          </button>
        </div>
      </div>

      {/* DECORACIONES */}
      <div className="absolute left-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitRight />
      </div>
    </div>
  );
}
