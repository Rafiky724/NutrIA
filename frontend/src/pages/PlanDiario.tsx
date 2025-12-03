import { useNavigate } from "react-router-dom";

export default function PlanDiario() {
  const navigate = useNavigate();

  // Valores reales de la barra (científicos)
  const barraMin = 2000;
  const barraMax = 3500;

  // Rango recomendado para la persona
  const rangoMin = 2400;
  const rangoMax = 3100;
  const idealKcal = 2800;

  // Cálculos proporcionales
  const totalBar = barraMax - barraMin;
  const yellowStart = ((rangoMin - barraMin) / totalBar) * 100;
  const yellowWidth = ((rangoMax - rangoMin) / totalBar) * 100;
  const idealPos = ((idealKcal - barraMin) / totalBar) * 100;

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* CARD PRINCIPAL */}
        <div className="w-full max-w-2xl bg_white_card p-10 rounded-3xl shadow-md text-center relative z-20">
          {/* Título */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img src="/SVG/Chulo.svg" className="w-12" alt="" />
            <h1 className="text-2xl poppins-bold font_brown">
              Este es tu plan diario
            </h1>
          </div>

          <p className="font_brown mb-20 text-left">
            Basado en tu objetivo, nivel de actividad física y preferencias,
            estas son las cantidades recomendadas para cada día.
          </p>

          {/* BARRA COMPLETA */}
          <div className="relative w-full h-4 mt-10 rounded-full">
            {/* Barra café detrás (rango real) */}
            <div
              className="absolute h-full bg-amber-950 rounded-full z-0"
              style={{
                left: "0%",
                width: "100%",
              }}
            />

            {/* Zona amarilla (recomendada) */}
            <div
              className="absolute h-full bg-yellow-500 z-10"
              style={{
                left: `${yellowStart}%`,
                width: `${yellowWidth}%`,
              }}
            />

            {/* Líneas verticales */}
            <div
              className="absolute top-[-20px] h-[50px] w-[6px] bg-yellow-500 rounded z-20"
              style={{ left: `${yellowStart}%` }}
            />
            <div
              className="absolute top-[-20px] h-[50px] w-[6px] bg-yellow-500 rounded z-20"
              style={{ left: `${yellowStart + yellowWidth}%` }}
            />

            {/* Textos inferiores */}
            <span
              className="absolute -bottom-10 text-sm font_brown poppins-bold z-20"
              style={{ left: `${yellowStart}%`, transform: "translateX(-50%)" }}
            >
              {rangoMin} kcal
            </span>
            <span
              className="absolute -bottom-10 text-sm font_brown poppins-bold z-20"
              style={{
                left: `${yellowStart + yellowWidth}%`,
                transform: "translateX(-50%)",
              }}
            >
              {rangoMax} kcal
            </span>

            {/* Texto superior del ideal */}
            <span
              className="absolute -top-10 text-sm font_brown poppins-bold z-20"
              style={{
                left: `${idealPos}%`,
                transform: "translateX(-50%)",
              }}
            >
              {idealKcal} kcal
            </span>
          </div>

          {/* Bloques de macros */}
          <div className="flex items-center justify-center gap-4 mt-18 mb-10">
            {[
              { label: "Proteína", cantidad: "000 gramos" },
              { label: "Carbohidratos", cantidad: "000 gramos" },
              { label: "Fibra", cantidad: "000 gramos" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg_inputs p-4 w-32 rounded-xl text-center flex flex-col space-y-1"
              >
                <span className="poppins-medium font_brown text-sm">
                  {item.cantidad}
                </span>
                <span className="font_brown text-xs poppins-bold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Botón */}
          <button
            onClick={() => navigate("/ProyeccionObjetivo")}
            className="w-64 mx-auto bg_yellow font_brown poppins-bold px-4 py-3 rounded-3xl cursor-pointer"
          >
            Ver dieta
          </button>
        </div>
      </div>

      {/* Frutas */}
      <img
        src="/Background/FrutaBack1.png"
        className="absolute bottom-0 left-0 z-10 w-40"
        alt=""
      />
      <img
        src="/Background/FrutaBack2.png"
        className="absolute bottom-0 right-0 z-10 w-40"
        alt=""
      />
    </div>
  );
}
