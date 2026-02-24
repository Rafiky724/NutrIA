import type { MealData, Ingredient } from "../../types";
import { getIngredientIcon } from "../../utils/ingredients";
import { calculateMacroPercentages } from "../../utils/macros";
import DonutChart from "../Decoration/DonutChart";

type Props = {
  dish: MealData;
  loading: boolean;
  onRegenerate: () => void;
  onEdit: () => void;
};

export default function DishCard({
  dish,
  loading,
  onRegenerate,
  onEdit,
}: Props) {
  const { protein, carbs, fats } = calculateMacroPercentages(dish);

  return (
    <div className="bg-input p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col lg:flex-row gap-6 w-full max-w-4xl mx-auto">
      {/* IZQUIERDA */}
      <div className="flex flex-col items-center justify-center gap-4 lg:w-1/3">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-full object-cover">
          <img
            src="/SVG/ejemploPlato.jpeg"
            alt="Plato"
            className="rounded-3xl w-full h-auto"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full px-2 text-brown ft-medium text-xs sm:text-sm md:text-base">
          <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
            <span>
              {dish.proteinas} g ({protein.toFixed(0)}%)
            </span>
            <span className="ft-light mt-1">Proteína</span>
            <div className="w-12 h-1 bg-yellow-500 mt-1"></div>
          </div>
          <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
            <span>
              {dish.carbohidratos} g ({carbs.toFixed(0)}%)
            </span>
            <span className="ft-light mt-1">Carbohidratos</span>
            <div className="w-12 h-1 bg-yellow-700 mt-1"></div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span>
              {dish.grasas} g ({fats.toFixed(0)}%)
            </span>
            <span className="ft-light mt-1">Grasas</span>
            <div className="w-12 h-1 bg-yellow-900 mt-1"></div>
          </div>
        </div>

        <DonutChart
          protein={dish.proteinas}
          carbs={dish.carbohidratos}
          fats={dish.grasas}
          calories={dish.calorias}
        />
      </div>

      {/* DERECHA */}
      <div className="flex flex-col lg:w-2/3 gap-3 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-md ft-bold text-brown">Ingredientes</h2>
          <span className="text-gray ft-medium text-sm sm:text-base">
            ≈ ${dish.precio_estimado} COP
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-48 sm:max-h-60">
            {dish.ingredientes.map((ing: Ingredient, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-4xl p-2 sm:p-3"
              >
                <div className="flex items-center gap-2 ft-light text-brown">
                  <span className="w-5">
                    <img
                      src={getIngredientIcon(ing.nombre)}
                      alt={ing.nombre}
                      className="w-5 h-6"
                    />
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-left">
                    {ing.cantidad} {ing.nombre}
                  </span>
                </div>

                <span className="text-gray ft-medium text-xs sm:text-sm md:text-base mt-1 sm:mt-0">
                  {ing.calorias_ingrediente} KCal | {ing.proteinas_ingrediente}{" "}
                  P | {ing.carbohidratos_ingrediente} C |{" "}
                  {ing.grasas_ingrediente} G
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-6 w-full">
            <button
              onClick={onEdit}
              className="relative bg-yellow text-brown py-3 rounded-3xl px-6 ft-medium shadow text-center w-full sm:w-auto cursor-pointer"
            >
              Editar ingredientes
              <div className="absolute top-3 right-5 w-6">
                <img
                  src="/SVG/IconsGeneral/EditIcon.svg"
                  alt="Editar ingredientes"
                />
              </div>
            </button>

            <button
              onClick={onRegenerate}
              disabled={loading}
              className="relative bg-brown text-white ft-medium py-3 rounded-3xl px-6 shadow w-full sm:w-auto cursor-pointer"
            >
              Regenerar plato
              <div className="absolute top-3 right-5 w-6">
                <img
                  src="/SVG/IconsGeneral/RegenerateIcon.svg"
                  alt="Regenerar plato"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
