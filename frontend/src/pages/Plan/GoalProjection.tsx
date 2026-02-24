import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DaysService, type DayPlan } from "../../services/daysService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import type { TargetDates } from "../../types";

export default function GoalProjection() {
  const navigate = useNavigate();
  const [dates, setDates] = useState<TargetDates | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("fechasObjetivo");
    if (stored) {
      setDates(JSON.parse(stored));
    }
  }, []);

  const handleContinue = async () => {
    try {
      const day = "lunes";
      const dayPlan: DayPlan = await DaysService.getDay(day);
      localStorage.setItem("diaPlanActual", JSON.stringify(dayPlan));
      navigate("/weeklyMealPlan");
    } catch (error) {
      console.error("Error al obtener el día del plan:", error);
      alert("No se pudo cargar el plan del día");
    }
  };

  const formatDate = (date: string) =>
    new Date(date)
      .toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
      })
      .toUpperCase();

  if (!dates) {
    return (
      <div className="flex items-center justify-center min-h-screen font_brown">
        Cargando proyección...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center px-4 sm:px-6">
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-3xl shadow-md text-center">
          {/* Título */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 mb-6">
            <div className="w-12 sm:w-16 mb-2 sm:mb-0">
              <img
                src="/SVG/IconsGeneral/Check.svg"
                alt="Checking"
                className="w-full h-auto"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown">
              Proyección de objetivo
            </h1>
          </div>

          <p className="text-gray mb-6 sm:mb-8 text-sm sm:text-base md:text-lg px-2 sm:px-6 text-center">
            Si sigues este plan, podrás alcanzar tu objetivo aproximadamente en
            estas fechas.
          </p>

          {/* LÍNEA DE PROGRESO */}
          <div className="w-full flex justify-center">
            <div className="relative flex flex-col items-center justify-center w-full max-w-xl h-32 sm:h-36">
              <svg width="100%" height="60">
                <line
                  x1="10%"
                  y1="30"
                  x2="85%"
                  y2="30"
                  stroke="#FFD600"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
                <circle cx="10%" cy="30" r="8" fill="#FFD600" />
                <circle cx="83%" cy="30" r="8" fill="#FFD600" />
              </svg>

              {/* Iconos */}
              <img
                src="/SVG/IconsGeneral/Location.svg"
                className="absolute top-[25px] left-[10%] -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8"
              />
              <img
                src="/SVG/IconsGeneral/Flag2.svg"
                className="absolute top-[25px] left-[85%] -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8"
              />

              {/* Fechas */}
              <div className="absolute top-[85px] left-[10%] -translate-x-1/2 flex flex-col items-center">
                <span className="font-medium text-xs sm:text-sm text-brown">
                  {formatDate(dates.fecha_inicio)}
                </span>
              </div>

              <div className="absolute top-[85px] left-[80%] -translate-x-1/2 flex flex-col items-center">
                <span className="font-medium text-xs sm:text-sm text-brown">
                  {formatDate(dates.fecha_estimada)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto mx-auto bg-yellow text-brown font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-3xl cursor-pointer mt-6"
          >
            Continuar
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
