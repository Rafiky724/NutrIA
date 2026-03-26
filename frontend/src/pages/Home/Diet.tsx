import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { categories as ingredientsAvailable } from "../../data/ingredients";
import type { Days, TypeFood, HomeResponse } from "../../types";
import NavBar from "../../components/Home/NavBar";
import ModalEditIngredients from "../../components/Modals/ModalEditIngredients";
import { useDayPlan } from "../../hooks/useDayPlan";
import { useOpinionTimer } from "../../hooks/useOpinionTimer";
import { HomeService } from "../../services/homeService";
import MealDropdown from "../../components/Home/MealDropdown";
import DaySelector from "../../components/Home/DaySelector";
import DishCard from "../../components/Home/DishCard";
import { getUserActualizarDia } from "../../services/planService";

export default function Diet() {
  const navigate = useNavigate();
  const [canUpdateDiet, setCanUpdateDiet] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);

  const daysIndex: Record<Days, number> = {
    Lunes: 0,
    Martes: 1,
    Miercoles: 2,
    Jueves: 3,
    Viernes: 4,
    Sabado: 5,
    Domingo: 6,
  };

  const today = new Date();
  const jsDay = today.getDay();
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

  const todayDay: Days = Object.keys(daysIndex).find(
    (d) => daysIndex[d as Days] === todayIndex,
  ) as Days;

  const [dayActive, setDayActive] = useState<Days>(todayDay);
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

  useEffect(() => {
    const fetchActualizarDia = async () => {
      try {
        const data = await getUserActualizarDia();
        setCanUpdateDiet(data.es_dia_actualizar_dieta);
        setUpdateMessage(data.mensaje_actualizacion);
      } catch (error) {
        console.error(
          "Error obteniendo info de actualización de dieta:",
          error,
        );
        setCanUpdateDiet(false);
        setUpdateMessage("No se pudo verificar si puedes actualizar la dieta");
      }
    };

    fetchActualizarDia();
  }, []);

  const {
    dayPlan,
    dish,
    loadingAction,
    handleRegenerateDish,
    handleConfirmIngredients,
  } = useDayPlan(dayActive, foodActive, setFoodActive);

  const { showOpinion, progress } = useOpinionTimer(dayPlan?.opinion_ia);

  const handleStartDiet = () => navigate("/nextDiet");

  const loadingPage = !dish || !dayPlan || loadingAction || !homeData;

  return (
    <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
      <div className="flex-1 py-6 flex flex-col gap-6">
        <div className="block md:hidden">
          <NavBar user={homeData?.usuario} subtitle="Estás en la despensa" />
        </div>
        <div className="hidden md:block">
          <NavBar
            user={homeData?.usuario}
            title="Dieta semanal"
            subtitle={`Esta es tu dieta ${homeData?.usuario.nombre}`}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-5xl flex flex-col bg-white rounded-4xl p-4 md:p-6 shadow gap-2 ml-10 w-2xs md:ml-0 h-1250 md:w-full md:h-[500px] xl:h-[580px] max-h-[1250px] overflow-y-auto">
            {loadingPage ? (
              <>
                <Skeleton height={40} width="100%" className="mb-4" />

                <Skeleton height={40} width="100%" className="mb-4" />

                <Skeleton height={60} width="100%" className="mb-4" />

                <Skeleton height={200} width="100%" className="mb-4" />

                <Skeleton height={40} width="60%" className="ml-auto mt-2" />
              </>
            ) : (
              <>
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
                      <div className="w-full md:w-50 xl:w-70 mx-auto h-auto bg-yellow px-4 py-3 rounded-2xl text-brown text-left text-sm flex flex-col gap-2 overflow-y-auto">
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
                  onClick={canUpdateDiet ? handleStartDiet : undefined}
                  title={!canUpdateDiet ? updateMessage || "" : ""}
                  className={`relative ft-medium py-2 rounded-full shadow text-xs md:text-md w-full md:w-2xs ml-0 md:ml-[55%] xl:ml-[70%] cursor-pointer ${
                    canUpdateDiet
                      ? "bg-yellow text-brown hover:scale-105 transition"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Preparar próxima dieta
                  <div className="absolute top-2 right-3 w-4">
                    <img
                      src="/SVG/IconsGeneral/EditIcon.svg"
                      alt="Editar ingredientes"
                    />
                  </div>
                </button>

                <ModalEditIngredients
                  isOpen={showModal}
                  currentIngredients={dish.ingredientes}
                  tipoComida={dish.tipo_comida}
                  ingredientsAvailable={ingredientsAvailable}
                  onClose={() => setShowModal(false)}
                  onConfirm={handleConfirmIngredients}
                  homeData={homeData}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
