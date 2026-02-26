import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { DietService } from "../../services/dietaService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import { daysWeek } from "../../data/days";

export default function UpdateDietDay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [daySelected, setDaySelected] = useState<string | null>(null);

  const state = location.state as {
    tipo_inicio: "hoy" | "manana" | "fecha";
    siguiente_comida?: string;
    fecha_inicio?: string;
  };

  const handleSiguiente = async () => {
    if (!daySelected) return;

    const payload: any = {
      tipo_inicio: state.tipo_inicio,
      dia_actualizar_dieta: daySelected
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    };

    if (state.tipo_inicio === "hoy") {
      payload.siguiente_comida = state.siguiente_comida;
    } else if (state.tipo_inicio === "fecha") {
      payload.fecha_inicio = state.fecha_inicio;
    }

    try {
      const respuesta = await DietService.iniciarDieta(payload);
      console.log("Dieta iniciada:", respuesta);
      navigate("/homeLayout");
    } catch (error) {
      console.error("Error iniciando dieta:", error);
      alert("Ocurrió un error al iniciar la dieta");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center p-6">
      <div className="bg-white w-full sm:w-xl rounded-3xl shadow p-6 sm:p-8 flex flex-col gap-6 text-center z-50">
        <h1 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left mx-auto">
          Por último, tu dieta, a tu ritmo
        </h1>
        <p className="text-gray text-sm sm:text-base md:text-lg text-justify px-2 sm:px-6">
          Elige el día de la semana en el que prefieres que se actualice tu
          dieta cada semana.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {daysWeek.map((day) => (
            <button
              key={day}
              onClick={() => setDaySelected(day)}
              className={`px-6 py-3 rounded-xl font-semibold cursor-pointer text-sm sm:text-base md:text-lg hover:scale-105 transition ${
                daySelected === day
                  ? "bg-yellow text-brown shadow"
                  : "bg-input text-brown"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={handleSiguiente}
          className="w-3xs md:w-xs bg-yellow text-brown ft-medium py-2 rounded-full shadow mx-auto block hover:scale-105 transition cursor-pointer"
        >
          Siguiente
        </button>
      </div>

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
