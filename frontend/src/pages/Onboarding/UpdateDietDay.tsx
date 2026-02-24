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
      <div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-3xl shadow p-6 sm:p-8 flex flex-col gap-6 text-center z-50">
        <h1 className="text-2xl sm:text-3xl md:text-4xl ft-bold text-brown">
          Por último, tu dieta, a tu ritmo
        </h1>
        <p className="text-gray ft-light px-4 sm:px-10 text-justify sm:text-base md:text-lg">
          Elige el día de la semana en el que prefieres que se actualice tu
          dieta cada semana.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {daysWeek.map((day) => (
            <button
              key={day}
              onClick={() => setDaySelected(day)}
              className={`px-6 py-3 rounded-xl font-semibold transition cursor-pointer text-sm sm:text-base md:text-lg ${
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
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-yellow text-brown font-semibold py-3 sm:py-4 rounded-full shadow text-lg cursor-pointer mx-auto mt-6"
        >
          Siguiente
        </button>
      </div>

      <div className="absolute left-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitLeft />
      </div>
      <div className="absolute right-0 bottom-0 z-10 w-24 sm:w-36 md:w-48">
        <FruitRight />
      </div>
    </div>
  );
}
