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
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-2xl bg-white p-8 rounded-3xl shadow-md text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-15">
              <img
                src="/SVG/IconsGeneral/Check.svg"
                alt="Checking"
                className="w-auto h-auto"
              />
            </div>
            <h1 className="text-2xl ft-bold text-brown">
              Proyección de objetivo
            </h1>
          </div>

          <p className="ft-light text-gray mb-6 px-4 text-center">
            Si sigues este plan, podrás alcanzar tu objetivo aproximadamente en
            estas fechas.
          </p>

          <div className="w-full flex justify-center">
            <div className="relative h-36 flex flex-col items-center justify-center">
              {/* SVG LINEAS Y PUNTOS */}
              <svg width="100%" height="60">
                <line
                  x1="40"
                  y1="30"
                  x2="120"
                  y2="30"
                  stroke="#FFD600"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
                <line
                  x1="110"
                  y1="30"
                  x2="220"
                  y2="30"
                  stroke="#FFD600"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
                <line
                  x1="220"
                  y1="30"
                  x2="240"
                  y2="30"
                  stroke="#FFD600"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
                <circle cx="40" cy="30" r="8" fill="#FFD600" />
                <circle cx="240" cy="30" r="8" fill="#FFD600" />
              </svg>

              <img
                src="/SVG/IconsGeneral/Location.svg"
                className="absolute top-[25px] left-[40px] -translate-x-1/2 w-8 h-8"
              />

              <img
                src="/SVG/IconsGeneral/Flag2.svg"
                className="absolute top-[25px] left-[250px] -translate-x-1/2 w-8 h-8"
              />

              {/* FECHAS */}
              <div className="absolute top-[85px] left-[40px] -translate-x-1/2 flex flex-col items-center">
                <span className="ft-medium text-sm text-brown">
                  {formatDate(dates.fecha_inicio)}
                </span>
              </div>

              <div className="w-20 absolute top-[85px] left-[240px] -translate-x-1/2 flex flex-col items-center">
                <span className="ft-medium text-sm text-brown">
                  {formatDate(dates.fecha_estimada)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-xs mx-auto bg-yellow text-brown ft-medium px-4 py-2 rounded-3xl cursor-pointer mt-6"
          >
            Continuar
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
