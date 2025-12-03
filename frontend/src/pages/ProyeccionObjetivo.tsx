import { useNavigate } from "react-router-dom";

export default function ProyeccionObjetivo() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* CARD PRINCIPAL */}
        <div className="w-xs md:w-sm lg:w-2xl 2xl:w-4xl bg_white_card p-8 rounded-3xl shadow-md text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20">
              <img
                src="/SVG/Chulo.svg"
                alt="Cantidad de comidas"
                className="w-auto h-auto"
              />
            </div>
            <h1 className="text-2xl poppins-bold font_brown mb-2">
              Proyección de tu objetivo
            </h1>
          </div>

          <p className="font_brown mb-6">
            Si sigues este plan, podrás alcanzar tu objetivo aproximadamente:
          </p>

          {/* GRÁFICO LINEAL */}
          <div className="relative w-full h-36 flex flex-col items-center justify-center">
            {/* SVG LINEAS Y PUNTOS */}
            <svg width="100%" height="60">
              {/* Líneas segmentadas amarillas */}
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
                x2="260"
                y2="30"
                stroke="#FFD600"
                strokeWidth="4"
                strokeDasharray="8 6"
              />

              {/* Puntos amarillos */}
              <circle cx="40" cy="30" r="8" fill="#FFD600" />
              <circle cx="260" cy="30" r="8" fill="#FFD600" />
            </svg>

            {/* IMAGENES ARRIBA DE LOS PUNTOS */}
            <img
              src="/SVG/Ubicacion.svg"
              alt="Icono inicio"
              className="absolute top-[25px] left-[40px] -translate-x-1/2 w-8 h-8"
            />
            <img
              src="/SVG/Bandera2.svg"
              alt="Icono final"
              className="absolute top-[25px] left-[270px] -translate-x-1/2 w-8 h-8"
            />

            {/* Fechas debajo de los puntos con flecha */}
            <div className="absolute top-[85px] left-[40px] -translate-x-1/2 flex flex-col items-center">
              <span className="poppins-medium text-sm font_brown">16 AGO</span>
            </div>

            <div className="absolute top-[85px] left-[260px] -translate-x-1/2 flex flex-col items-center">
              <span className="poppins-medium text-sm font_brown ">22 NOV</span>
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={() => navigate("/Home")}
            className="w-80 mx-auto bg_yellow font_brown poppins-bold px-4 py-2 rounded-3xl cursor-pointer mt-6"
          >
            Empezar
          </button>
        </div>
      </div>

      {/* DECORACIÓN */}
      <div className="absolute bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack1.png"
          alt="Decoración izquierda"
          className="w-auto h-auto"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-3xs">
        <img
          src="/Background/FrutaBack2.png"
          alt="Decoración derecha"
          className="w-auto h-auto"
        />
      </div>
    </div>
  );
}
