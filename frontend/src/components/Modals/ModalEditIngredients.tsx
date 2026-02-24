import { useState, useEffect } from "react";
import type { Ingredient, IngredientCategory } from "../../types";

type Props = {
  isOpen: boolean;
  currentIngredients: Ingredient[];
  ingredientsAvailable: IngredientCategory[];
  onClose: () => void;
  onConfirm: (ingredientsFinals: Ingredient[]) => void;
};

export default function ModalEditIngredients({
  isOpen,
  currentIngredients,
  ingredientsAvailable,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<string[]>(
    currentIngredients.map((ing) => ing.nombre),
  );

  useEffect(() => {
    setSelected(currentIngredients.map((ing) => ing.nombre));
  }, [currentIngredients]);

  if (!isOpen) return null;

  const addIngredient = (name: string) => {
    if (!selected.includes(name)) {
      setSelected([...selected, name]);
    }
  };

  const removeIngredient = (name: string) => {
    setSelected(selected.filter((i) => i !== name));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-4xl shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-brown text-center sm:text-left">
          Editar ingredientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IZQUIERDA */}
          <div>
            <h3 className="font-medium mb-2 text-brown text-center md:text-left">
              Ingredientes actuales
            </h3>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {selected.map((name) => (
                <button
                  key={name}
                  onClick={() => removeIngredient(name)}
                  className="flex justify-between items-center bg-input p-2 rounded-xl cursor-pointer hover:bg-red-50 transition"
                >
                  {name}
                  <span className="text-red-500">✖</span>
                </button>
              ))}
            </div>
          </div>

          {/* DERECHA */}
          <div>
            <h3 className="font-medium mb-2 text-brown text-center md:text-left">
              Agregar ingredientes
            </h3>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
              {ingredientsAvailable.map((category) => (
                <div key={category.nombre}>
                  <h4 className="font-medium text-sm mb-2">
                    {category.nombre}
                  </h4>

                  <div className="flex flex-col gap-2">
                    {category.items.map((item) => (
                      <button
                        key={item.nombre}
                        onClick={() => addIngredient(item.nombre)}
                        className="flex items-center justify-between bg-white p-2 rounded-xl cursor-pointer hover:bg-green-50 transition"
                      >
                        <div className="flex items-center gap-2">
                          {item.icono && (
                            <img
                              src={item.icono}
                              alt={item.nombre}
                              className="w-6 h-6"
                            />
                          )}
                          <span>{item.nombre}</span>
                        </div>

                        <span className="text-green-600">＋</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gray text-white w-full sm:w-auto"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onConfirm(
                selected.map((nombre) => ({
                  nombre,
                  tipo: "",
                  cantidad: "",
                  calorias_ingrediente: 0,
                  proteinas_ingrediente: 0,
                  carbohidratos_ingrediente: 0,
                  grasas_ingrediente: 0,
                })),
              )
            }
            className="px-6 py-2 rounded-full bg-yellow font-medium text-brown w-full sm:w-auto"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
