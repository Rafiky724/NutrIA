import { useState } from "react";
import { categories as ingredientsAvailable } from "../../data/ingredients";
import { useNavigate } from "react-router-dom";
import type { Days, TypeFood } from "../../types";
import FruitLeft from "../../components/Decoration/FruitLeft";
import FruitRight from "../../components/Decoration/FruitRight";
import ModalEditIngredients from "../../components/Modals/ModalEditIngredients";
import DaySelector from "../../components/WeeklyMealPlan/DaySelector";
import MealDropdown from "../../components/WeeklyMealPlan/MealDropdown";
import DishCard from "../../components/WeeklyMealPlan/DishCard";
import { useOpinionTimer } from "../../hooks/useOpinionTimer";
import { useDayPlan } from "../../hooks/useDayPlan";

export default function WeeklyMealPlan() {
  const days: Days[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const navigate = useNavigate();
  const [dayActive, setDayActive] = useState<Days>("Lunes");
  const [foodActive, setFoodActive] = useState<TypeFood>("Desayuno");
  const [showModal, setShowModal] = useState(false);
  const {
    dayPlan,
    dish,
    loadingAction,
    handleRegenerateDish,
    handleConfirmIngredients,
  } = useDayPlan(dayActive, foodActive, setFoodActive);
  const { showOpinion, progress } = useOpinionTimer(dayPlan?.opinion_ia);

  const handleStartDiet = () => navigate("/startDiet");

  if (!dish || !dayPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen ft-bold text-brown">
        Cargando...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-4xl bg-white p-5 rounded-3xl shadow-md text-center relative z-20">
          <h1 className="text-2xl ft-bold text-brown text-left p-2">
            Dieta semanal
          </h1>

          <div className="flex flex-wrap justify-center gap-4 ">
            <DaySelector
              days={days}
              dayActive={dayActive}
              setDayActive={setDayActive}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col w-full lg:w-64 gap-4">
              <MealDropdown
                dayPlan={dayPlan}
                foodActive={foodActive}
                setFoodActive={setFoodActive}
              />

              {showOpinion && dayPlan?.opinion_ia && (
                <div className="mt-3 bg-yellow px-4 py-3 rounded-2xl text-sm text-brown ft-light flex flex-col gap-2">
                  <span className="ft-medium">Opinión de la IA:</span>
                  <span>{dayPlan.opinion_ia}</span>
                  <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-brown h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <DishCard
              dish={dish}
              loading={loadingAction}
              onRegenerate={handleRegenerateDish}
              onEdit={() => setShowModal(true)}
            />
          </div>

          <button
            onClick={handleStartDiet}
            className="w-sm bg-yellow mt-4 text-brown font-semibold py-3 rounded-full shadow text-lg self-center cursor-pointer"
          >
            ¡Listo!
          </button>
        </div>

        <div className="absolute left-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
          <FruitLeft />
        </div>
        <div className="absolute right-0 bottom-0 z-10 w-35 sm:w-60 2xl:w-100">
          <FruitRight />
        </div>

        <ModalEditIngredients
          isOpen={showModal}
          currentIngredients={dish.ingredientes}
          ingredientsAvailable={ingredientsAvailable}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmIngredients}
        />
      </div>
    </div>
  );
}
