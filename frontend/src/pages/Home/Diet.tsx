import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories as ingredientsAvailable } from "../../data/ingredients";
import type { Days, TypeFood, HomeResponse } from "../../types";
import NavBar from "../../components/Home/NavBar";
import ModalEditIngredients from "../../components/Modals/ModalEditIngredients";
import { useDayPlan } from "../../hooks/useDayPlan";
import { useOpinionTimer } from "../../hooks/useOpinionTimer";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";
import { HomeService } from "../../services/homeService";
import MealDropdown from "../../components/Home/MealDropdown";
import DaySelector from "../../components/Home/DaySelector";
import DishCard from "../../components/Home/DishCard";

export default function Diet() {
  const navigate = useNavigate();

  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [dayActive, setDayActive] = useState<Days>("Lunes");
  const [foodActive, setFoodActive] = useState<TypeFood>("Desayuno");
  const [showModal, setShowModal] = useState(false);

  const days: Days[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeService.getHome();
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      }
    };
    fetchHomeData();
  }, []);

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
  if (!dish || !dayPlan || loadingAction || !homeData) {
    return (
      <LoadingScreen
        title="CARGANDO DIETA"
        subtitle="Estamos recargando la información."
        Icon={LoadingIcon}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        {/* NavBar */}
        <div className="block md:hidden">
          <NavBar user={homeData.usuario} subtitle="Estás en la despensa" />
        </div>
        <div className="hidden md:block">
          <NavBar
            title="Dieta semanal"
            subtitle={`Esta es tu dieta del ${homeData.mensaje}`}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col bg-white rounded-xl md:rounded-3xl p-4 md:p-6 shadow gap-4 ml-10 w-2xs md:ml-0 h-1250 md:w-full md:h-[500px] xl:h-[760px] max-h-[1250px] overflow-y-auto mt-0 md:mt-5">
            <DaySelector
              days={days}
              dayActive={dayActive}
              setDayActive={setDayActive}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-4">
                <MealDropdown
                  dayPlan={dayPlan}
                  foodActive={foodActive}
                  setFoodActive={setFoodActive}
                />

                {showOpinion && dayPlan.opinion_ia && (
                  <div className="bg-yellow px-4 py-3 rounded-2xl text-brown text-left text-sm flex flex-col gap-2 max-h-40 overflow-y-auto">
                    <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
                      <div
                        className="bg-brown h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="ft-medium">Opinión de la IA:</span>
                    <span className="text-sm whitespace-pre-line">
                      {dayPlan.opinion_ia}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <DishCard
                  dish={dish}
                  loading={loadingAction}
                  onRegenerate={handleRegenerateDish}
                  onEdit={() => setShowModal(true)}
                />
              </div>
            </div>

            <button
              onClick={handleStartDiet}
              className="relative bg-yellow text-brown ft-medium py-2 rounded-full shadow hover:scale-105 transition text-xs md:text-md w-full md:w-2xs ml-0 md:ml-[65%] xl:ml-[80%] cursor-pointer"
            >
              Preparar próxima dieta
              <div className="absolute top-3 right-3 w-4">
                <img
                  src="/SVG/IconsGeneral/EditIcon.svg"
                  alt="Editar ingredientes"
                />
              </div>
            </button>

            <ModalEditIngredients
              isOpen={showModal}
              currentIngredients={dish.ingredientes}
              ingredientsAvailable={ingredientsAvailable}
              onClose={() => setShowModal(false)}
              onConfirm={handleConfirmIngredients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
