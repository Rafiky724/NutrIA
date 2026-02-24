import type { NextMeal } from "../../types";
import { getIngredientIcon } from "../../utils/ingredients";

type Props = {
  nextFood: NextMeal | null;
};

export default function NextMealCard({ nextFood }: Props) {
  return (
    <>
      <div className="flex-1 bg-white rounded-3xl p-6 shadow flex flex-col gap-4 ml-10 w-2xs md:w-sm h-95">
        <h2 className="text-brown ft-bold text-lg text-center">
          Próxima comida - {nextFood?.hora_sugerida.toLowerCase()}
        </h2>

        <div className="flex gap-4 overflow-hidden flex-col md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/SVG/ejemploPlato.jpeg"
              alt="Próxima comida"
              className="w-60 h-50 object-cover rounded-xl"
            />
            <span className="text-gray ft-medium">
              {nextFood?.tipo_comida} ≈ ${nextFood?.precio_estimado} COP
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <div className="text-sm text-brown ft-medium mb-2 text-center">
              {nextFood?.calorias} kcal | {nextFood?.proteinas} P |{" "}
              {nextFood?.carbohidratos} C | {nextFood?.grasas} G
            </div>

            <div className="flex-1 overflow-y-auto pr-2 max-h-50">
              {nextFood?.ingredientes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mb-2 bg-gray p-2 rounded-xl ft-medium"
                >
                  <img
                    src={getIngredientIcon(item.nombre)}
                    alt={item.nombre}
                    className="w-6 h-6"
                  />
                  <span className="text-gray text-sm">
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
