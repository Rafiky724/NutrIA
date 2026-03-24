import { useState, type Dispatch, type SetStateAction } from "react";
import { categories as ingredientsAvailable } from "../../data/ingredients";
import type { HomeResponse } from "../../types";
import DonutChart from "../Decoration/DonutChart";
import { getIngredientIcon } from "../../utils/ingredients";
import ModalEditIngredients from "../Modals/ModalEditIngredients";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DaysService } from "../../services/daysService";

type Props = {
  homeData: HomeResponse | null;
  activeFoodIndex: number;
  setActiveFoodIndex: Dispatch<SetStateAction<number>>;
  onRefetch: () => Promise<void>;
};

export default function DailyDiet({
  homeData,
  activeFoodIndex,
  setActiveFoodIndex,
  onRefetch,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmIngredients = (ingredients: any[]) => {
    console.log("Ingredientes nuevos:", ingredients);
    setShowModal(false);
  };

  if (!homeData) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow flex flex-col gap-4 ml-10 w-2xs md:w-4xl xl:w-7xl">
        <Skeleton width={150} height={22} />

        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width={140} height={40} borderRadius={16} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col w-[200px] md:w-2xs mx-auto">
            <Skeleton height={40} borderRadius={30} />
          </div>

          <div className="lg:w-4/5 bg-input p-6 rounded-2xl flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col items-center w-full lg:w-2/4 gap-6">
              <Skeleton width={300} height={160} borderRadius={20} />

              <div className="flex justify-between w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton width={50} height={12} />
                    <Skeleton width={60} height={10} />
                    <Skeleton width={50} height={4} />
                  </div>
                ))}
              </div>

              <Skeleton circle width={120} height={120} />
            </div>

            <div className="flex flex-col w-full lg:w-2/3 gap-4">
              <div className="flex justify-between">
                <Skeleton width={120} height={20} />
                <Skeleton width={80} height={16} />
              </div>

              <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-4xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton circle width={20} height={20} />
                      <Skeleton width={120} height={12} />
                    </div>
                    <Skeleton width={40} height={12} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Skeleton width={180} height={40} borderRadius={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const food = homeData.dia_actual.comidas?.[activeFoodIndex];
  if (!food) return null;

  const macroPercentage = (value: number, total: number) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const proteins = food.proteinas || 0;
  const carbs = food.carbohidratos || 0;
  const fats = food.grasas || 0;

  const totalProteins = homeData.dia_actual.proteinas_totales;
  const totalCarbs = homeData.dia_actual.carbohidratos_totales;
  const totalFats = homeData.dia_actual.grasas_totales;

  const percentageProteins = macroPercentage(proteins, totalProteins);
  const percentageCarbs = macroPercentage(carbs, totalCarbs);
  const percentageFats = macroPercentage(fats, totalFats);

  const handleRegenerate = async () => {
    try {
      if (
        activeFoodIndex === null ||
        !homeData.dia_actual.comidas[activeFoodIndex]
      ) {
        throw new Error("No hay comida seleccionada");
      }

      const comidaSeleccionada = homeData.dia_actual.comidas[activeFoodIndex];

      const response = await DaysService.regenerateFood(
        homeData.dia_actual.dia_semana,
        comidaSeleccionada.tipo_comida,
      );

      await onRefetch();

      console.log("Plato regenerado:", response);
    } catch (error) {
      console.error("Error regenerando plato:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-4xl p-6 shadow flex flex-col gap-4 ml-10 w-2xs md:w-4xl xl:w-7xl">
        <h2 className="text-brown ft-bold text-lg">Dieta de hoy</h2>

        <div className="flex flex-wrap md:flex-nowrap gap-3 overflow-x-auto text-[10px] justify-between">
          {homeData.dia_actual.comidas?.map((comida, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFoodIndex(idx)}
              className={`w-25 md:w-35 xl:w-[150px] rounded-2xl p-2 ft-medium cursor-pointer ${
                idx === activeFoodIndex
                  ? "bg-yellow text-brown"
                  : "bg-gray text-gray"
              }`}
            >
              {comida.tipo_comida.toUpperCase()} - {comida.hora_sugerida}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col w-[200px] md:w-2xs mx-auto text-xs">
            <button
              type="button"
              onClick={handleRegenerate}
              className="relative bg-brown text-white py-2 rounded-3xl ft-medium shadow text-center cursor-pointer hover:scale-105 transition"
            >
              Regenerar plato
              <div className="absolute top-2 right-5 w-4">
                <img
                  src="/SVG/IconsGeneral/RegenerateIcon.svg"
                  alt="Regenerar plato"
                />
              </div>
            </button>
          </div>

          <div className="lg:w-4/5 bg-input p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/SVG/ejemploPlato.jpeg"
                alt="Plato"
                className="w-60 h-50 object-cover rounded-3xl"
              />

              <div className="flex justify-between w-full text-brown ft-medium text-xs">
                <div className="flex flex-col items-center text-center">
                  <span>
                    {proteins} g ({percentageProteins}%)
                  </span>
                  <span className="ft-light">Proteína</span>
                  <div className="w-12 h-1 bg-yellow-500 mt-1"></div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span>
                    {carbs} g ({percentageCarbs}%)
                  </span>
                  <span className="ft-light">Carbs</span>
                  <div className="w-12 h-1 bg-yellow-700 mt-1"></div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span>
                    {fats} g ({percentageFats}%)
                  </span>
                  <span className="ft-light">Grasas</span>
                  <div className="w-12 h-1 bg-yellow-900 mt-1"></div>
                </div>
              </div>

              <DonutChart
                protein={proteins}
                carbs={carbs}
                fats={fats}
                calories={food.calorias}
              />
            </div>

            <div className="flex flex-col w-full lg:w-2/3 gap-4 text-xs">
              <div className="flex justify-between items-center">
                <h2 className="text-md md:text-lg ft-bold text-brown">
                  Ingredientes
                </h2>
                <span className="text-gray ft-medium">
                  ≈ ${food.precio_estimado} COP
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-1 overflow-y-auto min-h-[180px] h-[220px] max-h-[220px]">
                  {food.ingredientes.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white rounded-4xl p-3"
                    >
                      <div className="flex items-center gap-3 ft-light text-brown">
                        <img
                          src={getIngredientIcon(ing.nombre)}
                          alt={ing.nombre}
                          className="w-5 h-5"
                        />
                        <span>
                          {ing.cantidad} {ing.nombre}
                        </span>
                      </div>
                      <span className="text-gray ft-medium text-xs">
                        {ing.calorias_ingrediente} KCal
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-4 md:mt-8 w-[200px] md:w-2xs mx-auto">
                  <button
                    onClick={() => setShowModal(true)}
                    className="relative bg-yellow text-brown py-2 rounded-4xl ft-medium shadow text-center cursor-pointer hover:scale-105 transition"
                  >
                    Editar ingredientes
                    <div className="absolute top-2 right-4 w-4">
                      <img src="/SVG/IconsGeneral/EditIcon.svg" alt="Editar" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalEditIngredients
          isOpen={showModal}
          currentIngredients={food.ingredientes}
          ingredientsAvailable={ingredientsAvailable}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmIngredients}
          homeData={homeData}
        />
      </div>
    </>
  );
}
