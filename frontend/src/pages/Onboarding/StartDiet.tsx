import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DaysService } from "../../services/daysService";
import ModalStartDate from "../../components/Modals/ModalStartDate";
import type { DayPlan, TypeFood } from "../../types";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ModalFood from "../../components/Modals/ModalFood";

type HomeOption = "hoy" | "mañana" | "otro";

export default function StartDiet() {
  const navigate = useNavigate();
  const [option, setOption] = useState<HomeOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [selectedFood, setSelectedFood] = useState<TypeFood | null>(null);
  const [showModalDate, setShowModalDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const today = new Date()
          .toLocaleDateString("es-ES", { weekday: "long" })
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const data = await DaysService.getDay(today);
        setDayPlan(data);
      } catch (error) {
        console.error("Error cargando día actual:", error);
      }
    };

    fetchToday();
  }, []);

  const mealsAvailable: TypeFood[] = dayPlan
    ? dayPlan.comidas.map((c) => c.tipo_comida as TypeFood)
    : [];

  const handleNext = () => {
    if (!option) return;

    if (option === "hoy" && !selectedFood) {
      alert("Selecciona en qué comida estás ahora");
      return;
    }

    if (option === "otro" && !selectedDate) {
      alert("Selecciona la fecha de inicio");
      return;
    }

    const state: any = {
      tipo_inicio: option === "mañana" ? "manana" : option,
    };

    if (option === "hoy") {
      state.siguiente_comida = selectedFood;
    } else if (option === "otro") {
      state.tipo_inicio = "fecha";
      state.fecha_inicio = selectedDate;
    }

    navigate("/updateDietDay", { state });
  };

  const getTextButton = (type: HomeOption) => {
    if (type === "hoy" && selectedFood) return `Hoy - ${selectedFood}`;
    if (type === "otro" && selectedDate)
      return `Seleccionar día - ${selectedDate}`;
    return type === "hoy"
      ? "Hoy"
      : type === "mañana"
        ? "Mañana"
        : "Seleccionar día";
  };

  return (
    <div className="min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center flex items-center justify-center px-4 sm:px-6 py-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow p-8 flex flex-col gap-6 text-center z-50">
        <h1 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left mb-4">
          ¿Cuándo quieres empezar tu dieta?
        </h1>

        <p className="text-gray mb-8 sm:mb-12 text-sm sm:text-base md:text-lg text-justify px-2 sm:px-6">
          Elige el día en el que te gustaría comenzar tu plan alimenticio
          personalizado.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <button
            onClick={() => {
              setOption("hoy");
              if (mealsAvailable.length > 0) setShowModal(true);
              setSelectedDate(null);
            }}
            className={`py-3 rounded-xl font-medium transition cursor-pointer w-full ${
              option === "hoy"
                ? "bg-yellow text-brown shadow"
                : "bg-input text-gray"
            }`}
          >
            {getTextButton("hoy")}
          </button>

          <button
            onClick={() => {
              setOption("mañana");
              setShowModal(false);
              setSelectedDate(null);
            }}
            className={`py-3 rounded-xl font-medium transition cursor-pointer w-full ${
              option === "mañana"
                ? "bg-yellow text-brown shadow"
                : "bg-input text-gray"
            }`}
          >
            {getTextButton("mañana")}
          </button>

          <button
            onClick={() => {
              setOption("otro");
              setShowModal(false);
              setShowModalDate(true);
              setSelectedFood(null);
            }}
            className={`py-3 rounded-xl font-medium transition cursor-pointer w-full ${
              option === "otro"
                ? "bg-yellow text-brown shadow"
                : "bg-input text-gray"
            }`}
          >
            {getTextButton("otro")}
          </button>
        </div>

        <button
          onClick={handleNext}
          className="w-full sm:w-sm bg-yellow mt-6 text-brown font-semibold py-2 rounded-full shadow text-md mx-auto cursor-pointer hover:scale-105 transition"
        >
          Siguiente
        </button>
      </div>

      {/* Modales */}
      <ModalFood
        show={showModal && !!dayPlan}
        mealsAvailable={mealsAvailable}
        selectedFood={selectedFood}
        onSelectFood={(food) => setSelectedFood(food)}
        onClose={() => setShowModal(false)}
      />

      {showModalDate && (
        <ModalStartDate
          onSelectDate={(date) => {
            setSelectedDate(date);
            setShowModalDate(false);
          }}
          onClose={() => setShowModalDate(false)}
        />
      )}

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
