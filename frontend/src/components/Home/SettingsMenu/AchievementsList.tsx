import { useEffect, useState } from "react";
import {
  getLogrosUsuario,
  reclamarLogro,
  type Logro as LogroService,
} from "../../../services/logrosService";

type Props = {
  onBack: () => void;
};

function lightenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return `rgb(${r}, ${g}, ${b})`;
}

function getColorByLogro(logro: LogroService) {
  if (logro.categoria === "dias_racha") return "#efb920";
  if (logro.categoria === "completar_comidas") return "#a69f3c";
  if (logro.categoria === "validar_comidas") return "#69819f";
  if (logro.categoria === "conseguir_gemas") return "#fe5757";
  if (logro.categoria === "comprar_articulos") return "#b266fe";
  return "#A78BFA";
}

export default function AchievementsList({ onBack }: Props) {
  const [logros, setLogros] = useState<LogroService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogros = async () => {
      try {
        const data = await getLogrosUsuario();
        setLogros(data.logros);
      } catch (error) {
        console.error("Error al obtener logros", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogros();
  }, []);

  const handleClickLogro = async (logro: LogroService) => {
    if (!logro.completado || logro.reclamado) return;

    try {
      await reclamarLogro({ id_logro: logro.id_logro });

      setLogros((prev) =>
        prev.map((l) =>
          l.id_logro === logro.id_logro ? { ...l, reclamado: true } : l,
        ),
      );
    } catch (error) {
      console.error("Error al reclamar logro", error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:px-12 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-130 overflow-y-auto">
          {/* Botón volver skeleton */}
          <div className="w-full">
            <div className="h-10 rounded-2xl bg-gray-200 animate-pulse" />
          </div>

          {/* Lista skeleton */}
          <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-3xl bg-gray-100 animate-pulse"
                style={{ minHeight: "60px" }}
              >
                {/* barra izquierda fake */}
                <div className="w-6 h-full bg-gray-300 rounded-xl" />

                {/* contenido */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>

                {/* gemas */}
                <div className="w-10 h-4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* imagen derecha skeleton */}
        <div className="hidden sm:block w-lg xl:w-xl">
          <div className="w-full h-80 bg-gray-200 rounded-3xl animate-pulse" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20">
      <div className="bg-white rounded-4xl shadow-lg p-6 sm:px-12 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-130 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-full rounded-4xl bg-gray-200 p-2 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
        >
          <img
            src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
            alt="back"
            className="w-4 h-4 rotate-180"
          />
          <h4 className="ft-medium text-xs sm:text-md">Volver</h4>
        </button>

        {/* LISTA DE LOGROS */}
        <div className="flex flex-col gap-4 w-full">
          {logros.map((logro) => {
            const isComplete = logro.completado;

            // 🎨 colores dinámicos
            const baseColor = getColorByLogro(logro);
            const colorLeft = baseColor;
            const colorCard = isComplete
              ? lightenColor(baseColor, 120)
              : "#f2f0eb";

            const progresoActualVisual = Math.min(
              logro.progreso_actual,
              logro.objetivo,
            );

            const progresoPercent =
              (progresoActualVisual / logro.objetivo) * 100;

            return (
              <div
                key={logro.id_logro}
                onClick={() => handleClickLogro(logro)}
                className={`relative flex items-center overflow-hidden rounded-3xl shadow-lg transition hover:scale-105 ${
                  logro.completado && !logro.reclamado
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
                style={{
                  minHeight: "60px",
                  backgroundColor: colorCard,
                }}
              >
                {/* 🔥 BARRA IZQUIERDA CON COLOR DINÁMICO */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-6 rounded-l-2xl"
                  style={{ backgroundColor: colorLeft }}
                ></div>

                {/* CONTENIDO */}
                <div className="flex-1 flex flex-col p-3 pl-8 overflow-hidden">
                  <h4 className="ft-bold text-xs sm:text-md text-left text-brown italic">
                    {logro.descripcion}
                  </h4>

                  {/* PROGRESO */}
                  <div className="flex items-center mt-2 gap-2 md:w-[200px] xl:w-[250px]">
                    <div className="flex-1 h-3 bg-inputs rounded-full overflow-hidden border br-brown">
                      <div
                        className="h-3 bg-brown transition-all duration-500"
                        style={{ width: `${progresoPercent}%` }}
                      ></div>
                    </div>

                    <span className="ft-medium text-xs md:text-sm text-gray">
                      {progresoActualVisual}/{logro.objetivo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center pr-2 md:pr-5 gap-1.5">
                  {!logro.completado && (
                    <>
                      <img
                        src="/SVG/IconsGeneral/GemsIcon.svg"
                        alt="gem"
                        className="w-4 md:w-5 h-4 md:h-5"
                      />
                      <span className="ft-bold text-md md:text-lg">
                        {logro.gemas_recompensa}
                      </span>
                    </>
                  )}

                  {logro.reclamado && (
                    <img
                      className="w-5 h-5"
                      src="/SVG/Pets/Shop/CompradoIcon.svg"
                      alt="complete"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="w-lg xl:w-xl flex flex-col items-center">
          <object
            type="image/svg+xml"
            data="/Background/NutriaGoal.svg"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
