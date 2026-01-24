import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObjectiveService } from "../../services/fechaObjetivoService";
import type { Macros } from "../../types";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

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

      const dates = await ObjectiveService.getTargetDates();

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

  // Rango recomendado (±10%)
  const rangeMin = Math.round(idealKcal * 0.9);
  const rangeMax = Math.round(idealKcal * 1.1);

  // Rango total visual de la barra (±25%)
  const barraMin = Math.round(idealKcal * 0.75);
  const barraMax = Math.round(idealKcal * 1.25);

  // Porcentajes para la barra
  const totalBar = barraMax - barraMin;
  const yellowStart = ((rangeMin - barraMin) / totalBar) * 100;
  const yellowWidth = ((rangeMax - rangeMin) / totalBar) * 100;
  const idealPos = ((idealKcal - barraMin) / totalBar) * 100;

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* CARD PRINCIPAL */}
        <div className="w-2xl bg-white p-10 rounded-3xl shadow-md text-center relative z-20">
          {/* Título */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-15">
              <img
                src="/SVG/IconsGeneral/Check.svg"
                alt="Chequeado"
                className="w-auto h-auto"
              />
            </div>
            <div className="ft-bold text-2xl text-brown">
              <h2 className="text-2xl poppins-bold font_brown">
                Este es tu plan diario
              </h2>
            </div>
          </div>

          <p className="text-gray mb-20 text-justify ft-light px-2">
            Basado en tu objetivo, nivel de actividad física y preferencias
            estas son las cantidades recomendadas para cada día.
          </p>

          <div className="relative w-full h-4 mt-10 rounded-full">
            <div className="absolute h-full bg-brown rounded-full w-full" />

            <div
              className="absolute h-full bg-yellow"
              style={{
                left: `${yellowStart}%`,
                width: `${yellowWidth}%`,
              }}
            />

            <div
              className="absolute top-[-20px] h-[50px] w-[6px] bg-yellow rounded"
              style={{ left: `${yellowStart}%` }}
            />
            <div
              className="absolute top-[-20px] h-[50px] w-[6px] bg-yellow rounded"
              style={{ left: `${yellowStart + yellowWidth}%` }}
            />

            <span
              className="absolute -bottom-10 text-gray ft-medium"
              style={{ left: `${yellowStart}%`, transform: "translateX(-50%)" }}
            >
              {rangeMin} kcal
            </span>

            <span
              className="absolute -bottom-10 text-gray ft-medium"
              style={{
                left: `${yellowStart + yellowWidth}%`,
                transform: "translateX(-50%)",
              }}
            >
              {rangeMax} kcal
            </span>

            <span
              className="absolute -top-10 text-lg text-brown ft-medium"
              style={{
                left: `${idealPos}%`,
                transform: "translateX(-50%)",
              }}
            >
              {idealKcal} kcal
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-18 mb-10">
            {[
              {
                label: "Proteína",
                value: macros.proteinas_diarias,
                unit: "gramos",
              },
              {
                label: "Carbohidratos",
                value: macros.carbohidratos_diarios,
                unit: "gramos",
              },
              { label: "Grasas", value: macros.grasas_diarias, unit: "gramos" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-input p-4 w-32 rounded-xl text-center flex flex-col space-y-1"
              >
                <span className="ft-light text-gray text-sm">
                  {item.value} {item.unit}
                </span>
                <span className="text-brown text-sm ft-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-2xs mx-auto bg-yellow text-brown ft-medium px-4 py-3 rounded-3xl cursor-pointer"
          >
            {loading ? "Calculando..." : "Continuar"}
          </button>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
        <FruitRight />
      </div>
    </div>
  );
}
