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
    <div className="bg-input p-4 rounded-2xl flex flex-col lg:flex-row gap-6 w-full max-w-4xl mx-auto">
      {/* IZQUIERDA */}
      <div className="flex flex-col items-center justify-center gap-4 lg:w-4xs">
        <div className="w-full object-cover">
          <img
            src="/SVG/ejemploPlato.jpeg"
            alt="Plato"
            className="w-auto h-auto"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full px-2 text-brown ft-medium text-sm md:text-xs">
          <div className="flex flex-col items-center mb-2">
            <span>
              {dish.proteinas} g ({protein.toFixed(0)}%)
            </span>
            <span className="ft-light mt-1">Proteína</span>
            <div className="w-12 h-1 bg-yellow-500 mt-1"></div>
          </div>
          <div className="flex flex-col items-center mb-2">
            <span>
              {dish.carbohidratos} g ({carbs.toFixed(0)}%)
            </span>
            <span className="ft-light mt-1">Carbohidratos</span>
            <div className="w-12 h-1 bg-yellow-700 mt-1"></div>
          </div>
          <div className="flex flex-col items-center">
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
      <div className="flex flex-col w-full gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm ft-bold text-brown">Ingredientes</h2>
          <span className="text-gray ft-medium text-sm">
            ≈ ${dish.precio_estimado} COP
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 overflow-y-auto h-50 sm:max-h-60">
            {dish.ingredientes.map((ing: Ingredient, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl p-2 "
              >
                <div className="flex items-center gap-2 ft-light text-brown">
                  <span className="w-5">
                    <img
                      src={getIngredientIcon(ing.nombre)}
                      alt={ing.nombre}
                      className="w-5 h-6"
                    />
                  </span>
                  <span className="text-xs text-left">
                    {ing.cantidad} {ing.nombre}
                  </span>
                </div>

                <span className="text-gray ft-medium text-xs mt-1 sm:mt-0">
                  {ing.calorias_ingrediente} KCal | {ing.proteinas_ingrediente}{" "}
                  P | {ing.carbohidratos_ingrediente} C |{" "}
                  {ing.grasas_ingrediente} G
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-6 w-full md:w-xs mx-auto">
            <button
              onClick={onEdit}
              className="relative bg-yellow text-brown rounded-3xl ft-medium text-xs shadow text-center cursor-pointer hover:scale-105 transition p-3 px-8 pl-3"
            >
              Editar ingredientes
              <div className="absolute top-3 right-3 w-4">
                <img
                  src="/SVG/IconsGeneral/EditIcon.svg"
                  alt="Editar ingredientes"
                />
              </div>
            </button>

            <button
              onClick={onRegenerate}
              disabled={loading}
              className="relative bg-brown text-white rounded-3xl ft-medium text-xs shadow text-center cursor-pointer hover:scale-105 transition p-3 px-8 pl-3"
            >
              Regenerar plato
              <div className="absolute top-3 right-3 w-4">
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
