import type { NextMeal } from "../../types";
import { getIngredientIcon } from "../../utils/ingredients";

type Props = {
  nextFood: NextMeal | null;
};

export default function NextMealCard({ nextFood }: Props) {
  return (
    <>
      <div className="w-2xs md:w-lg xl:w-4xl h-95 bg-white rounded-3xl p-4 shadow flex flex-col gap-4 ml-10 md:ml-0 items-center">
        <h2 className="text-brown ft-bold text-lg text-center">
          Próxima comida - {nextFood?.hora_sugerida.toLowerCase()}
        </h2>

        <div className="w-full flex gap-4 overflow-hidden flex-col md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/SVG/ejemploPlato.jpeg"
              alt="Próxima comida"
              className="w-60 h-50 object-cover rounded-xl"
            />
            <span className="text-gray ft-medium text-sm md:text-md">
              {nextFood?.tipo_comida} ≈ ${nextFood?.precio_estimado} COP
            </span>
          </div>

          <div className="flex flex-4 flex-col">
            <div className="text-xs md:text-sm text-brown ft-medium mb-2 text-center">
              {nextFood?.calorias} kcal | {nextFood?.proteinas} P |{" "}
              {nextFood?.carbohidratos} C | {nextFood?.grasas} G
            </div>

            <div className="overflow-y-auto max-h-50">
              {nextFood?.ingredientes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mb-2 bg-gray p-2 rounded-xl ft-medium"
                >
                  <img
                    src={getIngredientIcon(item.nombre)}
                    alt={item.nombre}
                    className="w-5 md:w-6 h-5 md:h-6"
                  />
                  <span className="text-gray text-xs md:text-md">
                    {item.cantidad} {item.nombre}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-2 bg-yellow text-brown ft-medium py-2 px-2 rounded-2xl w-40 mx-auto text-sm">
              Editar plato
            </button>
          </div>
        </div>

        <button className="bg-green text-white ft-medium py-2 px-6 rounded-4xl self-center">
          ¡Comida completada!
        </button>
      </div>
    </>
  );
}
