import type { Dispatch, SetStateAction } from "react";
import type { HomeResponse } from "../../types";
import DonutChart from "../Decoration/DonutChart";
import { getIngredientIcon } from "../../utils/ingredients";

type Props = {
  homeData: HomeResponse;
  activeFoodIndex: number;
  setActiveFoodIndex: Dispatch<SetStateAction<number>>;
};

export default function DailyDiet({
  homeData,
  activeFoodIndex,
  setActiveFoodIndex,
}: Props) {
  const food = homeData.dia_actual.comidas?.[activeFoodIndex];

  const macroPercentage = (value: number, total: number) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const proteins = food?.proteinas || 0;
  const carbs = food?.carbohidratos || 0;
  const fats = food?.grasas || 0;

  const totalProteins = homeData.dia_actual.proteinas_totales;
  const totalCarbs = homeData.dia_actual.carbohidratos_totales;
  const totalFats = homeData.dia_actual.grasas_totales;

  const percentageProteins = macroPercentage(proteins, totalProteins);
  const percentageCarbs = macroPercentage(carbs, totalCarbs);
  const percentageFats = macroPercentage(fats, totalFats);

  if (!food) return null;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow flex flex-col gap-4 ml-10 w-2xs md:w-4xl xl:w-7xl">
        <h2 className="text-brown ft-bold text-lg">Dieta de hoy</h2>

        {/* Opciones de horario */}
        <div className="flex flex-wrap md:flex-nowrap gap-3 overflow-x-auto text-xs justify-between">
          {homeData?.dia_actual?.comidas?.map((comida, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFoodIndex(idx)}
              className={`w-25 md:w-35 xl:w-[150px] rounded-2xl p-2 ft-medium ${
                idx === activeFoodIndex
                  ? "bg-yellow text-brown"
                  : "bg-gray text-gray"
              }`}
            >
              {comida.tipo_comida.toUpperCase()} - {comida.hora_sugerida}
            </button>
          ))}
        </div>

        {/* Bloques principales */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* IZQUIERDA: Botón regenerar dieta */}
          <div className="flex flex-col w-[200px] md:w-2xs mx-auto text-xs">
            <button className="relative bg-brown text-white py-2 rounded-3xl ft-medium shadow text-center cursor-pointer">
              Regenerar plato
              <div className="absolute top-2 right-5 w-4">
                <img
                  src="/SVG/IconsGeneral/RegenerateIcon.svg"
                  alt="Regenerar plato"
                />
              </div>
            </button>
          </div>

          {/* DERECHA: Plato quemado */}
          <div className="lg:w-4/5 bg-input p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* IZQUIERDA: Imagen + macros */}
            <div className="flex flex-col items-center w-full lg:w-2/4 gap-4 sm:gap-6">
              <div className="w-full object-cover">
                <img
                  src="/SVG/ejemploPlato.jpeg"
                  alt="Plato"
                  className="rounded-3xl w-auto h-auto"
                />
              </div>

              {/* Macros */}
              <div className="flex justify-between w-full px-2 text-brown ft-medium text-xs">
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
                protein={food?.proteinas || 0}
                carbs={food?.carbohidratos || 0}
                fats={food?.grasas || 0}
                calories={food?.calorias || 0}
              />
            </div>

            {/* Ingredientes */}
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
                {/* Listado de ingredientes */}
                <div className="flex flex-col gap-1 overflow-y-auto min-h-[180px] max-h-[220px]">
                  {food?.ingredientes.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white rounded-4xl p-3"
                    >
                      <div className="flex items-center gap-3 ft-light text-brown">
                        <span className="w-5">
                          <img
                            src={getIngredientIcon(ing.nombre)}
                            alt={ing.nombre}
                            className="w-5 h-5"
                          />
                        </span>
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

                <div className="flex flex-col gap-3 mt-8 w-[200px] md:w-2xs mx-auto">
                  <button className="relative bg-yellow text-brown py-2 rounded-3xl ft-medium shadow text-center cursor-pointer">
                    Editar ingredientes
                    <div className="absolute top-2 md:top-3 right-4 md:right-5 w-4">
                      <img src="/SVG/IconsGeneral/EditIcon.svg" alt="Editar" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
