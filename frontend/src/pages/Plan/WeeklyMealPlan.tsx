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
import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";

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

  // Loading
  if (!dish || !dayPlan || loadingAction) {
    return (
      <LoadingScreen
        title="CARGANDO DIETA"
        subtitle="Estamos preparando tu dieta."
        Icon={LoadingIcon}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[url('/Background/Back.png')] bg-cover bg-center px-4 sm:px-6">
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <div className="w-full md:w-4xl xl:w-6xl max-w-6xl bg-white p-6 sm:p-10 rounded-3xl shadow-md text-center relative z-20">
          <h1 className="ft-bold text-lg sm:text-xl md:text-2xl text-brown text-center md:text-left mb-4">
            Dieta semanal
          </h1>

          <DaySelector
            days={days}
            dayActive={dayActive}
            setDayActive={setDayActive}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Columna izquierda: Dropdown + Opinión IA */}
            <div className="flex flex-col w-full lg:w-64 gap-4">
              <MealDropdown
                dayPlan={dayPlan}
                foodActive={foodActive}
                setFoodActive={setFoodActive}
              />

              {showOpinion && dayPlan?.opinion_ia && (
                <div className="mt-3 bg-yellow px-4 py-3 rounded-2xl text-sm sm:text-base text-brown ft-light flex flex-col gap-2">
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

            {/* Columna derecha: DishCard */}
            <div className="flex-1">
              <DishCard
                dish={dish}
                loading={loadingAction}
                onRegenerate={handleRegenerateDish}
                onEdit={() => setShowModal(true)}
              />
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={handleStartDiet}
            className="w-full sm:w-auto bg-yellow mt-6 text-brown font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow text-lg self-center cursor-pointer"
          >
            ¡Listo!
          </button>
        </div>

        {/* Decorations */}
        <div className="absolute bottom-0 left-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitLeft />
        </div>

        <div className="absolute bottom-0 right-0 z-10 w-24 sm:w-40 md:w-52 2xl:w-80">
          <FruitRight />
        </div>

        {/* MODAL */}
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
