import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { DietService } from "../../services/dietaService";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";

export default function UpdateDietDay() {
  const daysWeek: string[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

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
      <div className="bg-white w-2xl rounded-3xl shadow p-8 flex flex-col gap-6 text-center">
        <h1 className="text-2xl ft-bold text-brown">
          Por último, tu dieta, a tu ritmo
        </h1>
        <p className="text-gray ft-light px-10 text-justify">
          Elige el día de la semana en el que prefieres que se actualice tu
          dieta cada semana.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {daysWeek.map((day) => (
            <button
              key={day}
              onClick={() => setDaySelected(day)}
              className={`px-6 py-3 rounded-xl font-semibold transition cursor-pointer ${
                daySelected === day
                  ? "bg-yellow text-brown shadow"
                  : "bg-input text-gray"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={handleSiguiente}
          className="w-xs mx-auto mt-6 py-3 rounded-full ft-medium transition bg-yellow text-brown shadow cursor-pointer"
        >
          Siguiente
        </button>
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
